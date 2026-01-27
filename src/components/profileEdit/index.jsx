import React, { useEffect, useState } from "react";
import "./index.scss";
import ProfileSectionCard from "../../components/profileSectionCard";
import ExperienceList from "../../components/experienceList";
import ExperienceModal from "../../components/experienceModal";
import EducationList from "../../components/educationList";
import EducationModal from "../../components/educationModal";
import ConfirmModal from "../../components/confirmModal";
import {
  listExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../api/experience";
import {
  listEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../../api/education";

export default function ProfileEditPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  // Experience modal state
  const [expModalOpen, setExpModalOpen] = useState(false);
  const [expModalMode, setExpModalMode] = useState("add"); // "add" | "edit"
  const [expSelected, setExpSelected] = useState(null);
  const [expBusy, setExpBusy] = useState(false);
  const [expError, setExpError] = useState("");

  // Delete confirm state
  const [delOpen, setDelOpen] = useState(false);
  const [delBusy, setDelBusy] = useState(false);
  const [delTarget, setDelTarget] = useState(null);

  const [expResetSignal, setExpResetSignal] = useState(0);

  // Education list state
  const [eduItems, setEduItems] = useState([]);
  const [eduErrMsg, setEduErrMsg] = useState("");

  // Education modal state (Phase 6F-3)
  const [eduModalOpen, setEduModalOpen] = useState(false);
  const [eduModalMode, setEduModalMode] = useState("add"); // "add" | "edit"
  const [eduSelected, setEduSelected] = useState(null);
  const [eduBusy, setEduBusy] = useState(false);
  const [eduError, setEduError] = useState("");

  // Delete confirm state (Education)
  const [eduDelOpen, setEduDelOpen] = useState(false);
  const [eduDelBusy, setEduDelBusy] = useState(false);
  const [eduDelTarget, setEduDelTarget] = useState(null);

  const [eduResetSignal, setEduResetSignal] = useState(0);

  //refersh experience list
  async function refreshExperiences() {
    setErrMsg("");
    try {
      const data = await listExperiences();
      setItems(data.items || []);
    } catch (e) {
      setErrMsg(e?.message || "Failed to load experiences");
    }
  }
  //refresh education list
  async function refreshEducation() {
  setEduErrMsg("");
  try {
    const data = await listEducation();
    setEduItems(data.items || []);
  } catch (e) {
    setEduErrMsg(e?.message || "Failed to load education");
  }
}

  useEffect(() => {
    let isMounted = true;

    async function init() {
      setLoading(true);
      await refreshExperiences();
      await refreshEducation();
      if (isMounted) setLoading(false);
    }

    init();
    return () => {
      isMounted = false;
    };
  }, []);

  // Experience modal handlers
  function openAdd() {
    setExpError("");
    setExpSelected(null);
    setExpModalMode("add");
    setExpModalOpen(true);
  }

  function openEdit(item) {
    setExpError("");
    setExpSelected(item);
    setExpModalMode("edit");
    setExpModalOpen(true);
  }

  function closeExpModal() {
    if (expBusy) return;
    setExpModalOpen(false);
  }

  async function handleSave(payload) {
    setExpBusy(true);
    setExpError("");
    try {
      if (expModalMode === "edit" && expSelected?.experienceId) {
        await updateExperience(expSelected.experienceId, payload);
      } else {
        await createExperience(payload);
      }
      await refreshExperiences();
      setExpModalOpen(false);
    } catch (e) {
      setExpError(e?.message || "Could not save experience");
    } finally {
      setExpBusy(false);
    }
  }

  async function handleSaveAndAddAnother(payload) {
    setExpBusy(true);
    setExpError("");
    try {
      await createExperience(payload);
      await refreshExperiences();
      setExpResetSignal((n) => n + 1);
      // keep modal open; ExperienceModal resets form automatically on open,
      // so we just keep it open and let it clear after success by forcing add mode state
      setExpSelected(null);
      setExpModalMode("add");
      // keep open
    } catch (e) {
      setExpError(e?.message || "Could not save experience");
    } finally {
      setExpBusy(false);
    }
  }

  function askDelete(item) {
    setDelTarget(item);
    setDelOpen(true);
  }

  function cancelDelete() {
    if (delBusy) return;
    setDelOpen(false);
    setDelTarget(null);
  }

  async function confirmDelete() {
    if (!delTarget?.experienceId) return;

    setDelBusy(true);
    try {
      await deleteExperience(delTarget.experienceId);
      await refreshExperiences();
      setDelOpen(false);
      setDelTarget(null);
    } catch (e) {
      // Keep it simple: surface error at page level
      setErrMsg(e?.message || "Delete failed");
    } finally {
      setDelBusy(false);
    }
  }

  // Education modal handlers
  function openEduAdd() {
    setEduError("");
    setEduSelected(null);
    setEduModalMode("add");
    setEduModalOpen(true); 
  }

  function openEduEdit(item) {
    setEduError("");
    setEduSelected(item);
    setEduModalMode("edit");
    setEduModalOpen(true); 
  }

  function askEduDelete(item) {
    setEduDelTarget(item);
    setEduDelOpen(true);
  }

  function cancelEduDelete() {
    if (eduDelBusy) return;
    setEduDelOpen(false);
    setEduDelTarget(null);
  }

  async function confirmEduDelete() {
    if (!eduDelTarget?.educationId) return;

    setEduDelBusy(true);
    try {
      await deleteEducation(eduDelTarget.educationId);
      await refreshEducation();
      setEduDelOpen(false);
      setEduDelTarget(null);
    } catch (e) {
      setEduErrMsg(e?.message || "Delete failed");
    } finally {
      setEduDelBusy(false);
    }
  }

  async function handleEduSave(payload) {
  setEduBusy(true);
  setEduError("");
  try {
    if (eduModalMode === "edit" && eduSelected?.educationId) {
      await updateEducation(eduSelected.educationId, payload);
    } else {
      await createEducation(payload);
    }
    await refreshEducation();
    setEduModalOpen(false);
  } catch (e) {
    setEduError(e?.message || "Could not save education");
  } finally {
    setEduBusy(false);
  }
}

async function handleEduSaveAndAddAnother(payload) {
  setEduBusy(true);
  setEduError("");
  try {
    await createEducation(payload);
    await refreshEducation();

    setEduResetSignal((n) => n + 1);
    setEduSelected(null);
    setEduModalMode("add");
    // keep modal open
  } catch (e) {
    setEduError(e?.message || "Could not save education");
  } finally {
    setEduBusy(false);
  }
}

function closeEduModal() {
  if (eduBusy) return;
  setEduModalOpen(false);
}

  return (
    <div className="ph-profileEdit">
      <div className="ph-profileEdit__header">
        <h1 className="ph-profileEdit__title">Edit Profile</h1>
        <p className="ph-profileEdit__subtitle">
          Manage what shows on your public profile.
        </p>
      </div>

      <div className="ph-profileEdit__content">
        <ProfileSectionCard
          title="Experience"
          action={
            <button
              type="button"
              className="ph-profileEdit__primaryBtn"
              onClick={openAdd}
            >
              Add
            </button>
          }
        >
          {loading ? (
            <div className="ph-profileEdit__muted">Loading…</div>
          ) : errMsg ? (
            <div className="ph-profileEdit__error">{errMsg}</div>
          ) : items.length === 0 ? (
            <div className="ph-profileEdit__empty">
              <div className="ph-profileEdit__emptyTitle">
                No experience added yet.
              </div>
              <div className="ph-profileEdit__emptyText">
                Add your first role to show on your public profile.
              </div>
              <button
                type="button"
                className="ph-profileEdit__primaryBtn"
                onClick={openAdd}
              >
                Add experience
              </button>
            </div>
          ) : (
            <div className="ph-page">
              <ExperienceList items={items} onEdit={openEdit} onDelete={askDelete} />
            </div>
          )}
        </ProfileSectionCard>
        <ProfileSectionCard
          title="Education"
          action={
            <button
              type="button"
              className="ph-profileEdit__primaryBtn"
              onClick={openEduAdd}
            >
              Add
            </button>
          }
        >
          {loading ? (
            <div className="ph-profileEdit__muted">Loading…</div>
          ) : eduErrMsg ? (
            <div className="ph-profileEdit__error">{eduErrMsg}</div>
          ) : eduItems.length === 0 ? (
            <div className="ph-profileEdit__empty">
              <div className="ph-profileEdit__emptyTitle">No education added yet.</div>
              <div className="ph-profileEdit__emptyText">
                Add your first school to show on your public profile.
              </div>
              <button
                type="button"
                className="ph-profileEdit__primaryBtn"
                onClick={openEduAdd}
              >
                Add education
              </button>
            </div>
          ) : (
            <div className="ph-page">
              <EducationList
                items={eduItems}
                onEdit={openEduEdit}
                onDelete={askEduDelete}
              />
            </div>
          )}
        </ProfileSectionCard>

      </div>

      <ExperienceModal
        isOpen={expModalOpen}
        mode={expModalMode}
        initialValue={expSelected}
        isBusy={expBusy}
        errorMessage={expError}
        onClose={closeExpModal}
        onSave={handleSave}
        onSaveAndAddAnother={handleSaveAndAddAnother}
        resetSignal={expResetSignal}
      />

      <ConfirmModal
        isOpen={delOpen}
        title="Delete experience?"
        message={
          delTarget
            ? `This will permanently delete "${delTarget.title}" at "${delTarget.company}".`
            : "This will permanently delete this experience."
        }
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
        isBusy={delBusy}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />

      <EducationModal
        isOpen={eduModalOpen}
        mode={eduModalMode}
        initialValue={eduSelected}
        isBusy={eduBusy}
        errorMessage={eduError}
        onClose={closeEduModal}
        onSave={handleEduSave}
        onSaveAndAddAnother={handleEduSaveAndAddAnother}
        resetSignal={eduResetSignal}
      />

      <ConfirmModal
        isOpen={eduDelOpen}
        title="Delete education?"
        message={
          eduDelTarget
            ? `This will permanently delete "${eduDelTarget.degree}" at "${eduDelTarget.school}".`
            : "This will permanently delete this education entry."
        }
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
        isBusy={eduDelBusy}
        onCancel={cancelEduDelete}
        onConfirm={confirmEduDelete}
      />

    </div>
  );
}
      