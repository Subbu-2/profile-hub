import React, { useEffect, useState } from "react";
import "./index.scss";
import ProfileSectionCard from "../../components/profileSectionCard";
import ExperienceList from "../../components/experienceList";
import ExperienceModal from "../../components/experienceModal";
import ConfirmModal from "../../components/confirmModal";
import {
  listExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../api/experience";

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

  async function refreshExperiences() {
    setErrMsg("");
    try {
      const data = await listExperiences();
      setItems(data.items || []);
    } catch (e) {
      setErrMsg(e?.message || "Failed to load experiences");
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function init() {
      setLoading(true);
      await refreshExperiences();
      if (isMounted) setLoading(false);
    }

    init();
    return () => {
      isMounted = false;
    };
  }, []);

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
            <ExperienceList items={items} onEdit={openEdit} onDelete={askDelete} />
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
    </div>
  );
}
      