import React, { useEffect, useState } from "react";
import "./index.scss";
import ProfileSectionCard from "../../components/profileSectionCard";
import ExperienceList from "../../components/experienceList";
import ExperienceModal from "../../components/experienceModal";
import EducationList from "../../components/educationList";
import EducationModal from "../../components/educationModal";
import ConfirmModal from "../../components/confirmModal";
import SkillsSection from "../../components/skillsSection";
import PublicPageLinkCard from "../../components/publicPageLinkCard";
import RecognitionsList from "../../components/recognitionsList";
import RecognitionModal from "../../components/recognitionModal";
import CertificationsList from "../../components/certificationsList";
import CertificationModal from "../../components/certificationModal";
import ProjectsList from "../../components/projectsList";
import ProjectModal from "../../components/projectModal";
import Card from "../../components/card";
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
import { getSkills, putSkills } from "../../api/skills";
import {
  listRecognitions,
  createRecognition,
  updateRecognition,
  deleteRecognition,
} from "../../api/recognitions";
import {
  listCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../../api/certifications";
import {
  listProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../api/projects";

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
  const [expLoading, setExpLoading] = useState(true);

  // Delete confirm state
  const [delOpen, setDelOpen] = useState(false);
  const [delBusy, setDelBusy] = useState(false);
  const [delTarget, setDelTarget] = useState(null);

  const [expResetSignal, setExpResetSignal] = useState(0);

  // Education list state
  const [eduItems, setEduItems] = useState([]);
  const [eduErrMsg, setEduErrMsg] = useState("");
  const [eduLoading, setEduLoading] = useState(true);

  // Education modal state
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

  //Skills state
  const [skillsText, setSkillsText] = useState("");
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsSaving, setSkillsSaving] = useState(false);
  const [skillsErrMsg, setSkillsErrMsg] = useState("");
  const [skillsOkMsg, setSkillsOkMsg] = useState("");

  //Recognitions list state
  const [recItems, setRecItems] = useState([]);
  const [recLoading, setRecLoading] = useState(true);
  const [recErrMsg, setRecErrMsg] = useState("");

  //recognitions models state
  const [recModalOpen, setRecModalOpen] = useState(false);
  const [recModalMode, setRecModalMode] = useState("add"); // "add" | "edit"
  const [recSelected, setRecSelected] = useState(null);
  const [recBusy, setRecBusy] = useState(false);
  const [recModalErr, setRecModalErr] = useState("");

  // delete confirm
  const [recDeleteOpen, setRecDeleteOpen] = useState(false);
  const [recDeleteTarget, setRecDeleteTarget] = useState(null);
  const [recDeleteBusy, setRecDeleteBusy] = useState(false);
  const [recDeleteErr, setRecDeleteErr] = useState("");

  // Certifications list state
  const [certItems, setCertItems] = useState([]);
  const [certLoading, setCertLoading] = useState(true);
  const [certErrMsg, setCertErrMsg] = useState("");
  const [certReorderBusy, setCertReorderBusy] = useState(false);

  // Certifications modal state
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certModalMode, setCertModalMode] = useState("add"); // "add" | "edit"
  const [certSelected, setCertSelected] = useState(null);
  const [certBusy, setCertBusy] = useState(false);
  const [certModalErr, setCertModalErr] = useState("");

  // Certifications delete confirm
  const [certDeleteOpen, setCertDeleteOpen] = useState(false);
  const [certDeleteTarget, setCertDeleteTarget] = useState(null);
  const [certDeleteBusy, setCertDeleteBusy] = useState(false);

  // Projects list state
  const [projItems, setProjItems] = useState([]);
  const [projLoading, setProjLoading] = useState(true);
  const [projErrMsg, setProjErrMsg] = useState("");

  // Projects modal state
  const [projModalOpen, setProjModalOpen] = useState(false);
  const [projModalMode, setProjModalMode] = useState("add"); // "add" | "edit"
  const [projSelected, setProjSelected] = useState(null);
  const [projBusy, setProjBusy] = useState(false);
  const [projModalErr, setProjModalErr] = useState("");

  // Projects delete confirm
  const [projDeleteOpen, setProjDeleteOpen] = useState(false);
  const [projDeleteTarget, setProjDeleteTarget] = useState(null);
  const [projDeleteBusy, setProjDeleteBusy] = useState(false);

  // optional: reset signal for Save & Add Another
  const [projResetSignal, setProjResetSignal] = useState(0);

  //normalize list
  function normalizeList(data) {
    const items = Array.isArray(data) ? data : data?.items || [];
    return items
      .slice()
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }

  //refersh experience list
  async function refreshExperiences() {
    setExpLoading(true);
    setErrMsg("");
    try {
      const data = await listExperiences();
      setItems(normalizeList(data));
    } catch (e) {
      setErrMsg(e?.message || "Failed to load experiences");
    } finally {
      setExpLoading(false);
    }
  }
  //refresh education list
  async function refreshEducation() {
    setEduLoading(true);
    setEduErrMsg("");
    try {
      const data = await listEducation();
      setEduItems(normalizeList(data));
    } catch (e) {
      setEduErrMsg(e?.message || "Failed to load education");
    } finally {
      setEduLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function init() {
      setLoading(true);
      await refreshExperiences();
      await refreshEducation();
      await refreshSkills();
      await refreshRecognitions();
      await refreshCertifications();
      await refreshProjects();
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
        await updateExperience(expSelected.experienceId, {
          ...payload,
          sortOrder: expSelected.sortOrder,
        });
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

  async function swapExperienceSort(a, b) {
    const aSort = a.sortOrder ?? 0;
    const bSort = b.sortOrder ?? 0;

    await updateExperience(a.experienceId, {
      title: a.title,
      company: a.company,
      location: a.location,
      startDate: a.startDate,
      endDate: a.endDate,
      isCurrent: !!a.isCurrent,
      description: a.description,
      sortOrder: bSort,
    });

    await updateExperience(b.experienceId, {
      title: b.title,
      company: b.company,
      location: b.location,
      startDate: b.startDate,
      endDate: b.endDate,
      isCurrent: !!b.isCurrent,
      description: b.description,
      sortOrder: aSort,
    });
  }

  async function moveExperienceUp(exp) {
    const idx = items.findIndex((x) => x.experienceId === exp.experienceId);
    if (idx <= 0) return;

    try {
      await swapExperienceSort(items[idx], items[idx - 1]);
      await refreshExperiences();
    } catch (e) {
      setErrMsg(e?.message || "Reorder failed");
    }
  }

  async function moveExperienceDown(exp) {
    const idx = items.findIndex((x) => x.experienceId === exp.experienceId);
    if (idx < 0 || idx >= items.length - 1) return;

    try {
      await swapExperienceSort(items[idx], items[idx + 1]);
      await refreshExperiences();
    } catch (e) {
      setErrMsg(e?.message || "Reorder failed");
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
        await updateEducation(eduSelected.educationId, {
          ...payload,
          sortOrder: eduSelected.sortOrder,
        });
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

  async function swapEducationSort(a, b) {
    const aSort = a.sortOrder ?? 0;
    const bSort = b.sortOrder ?? 0;

    await updateEducation(a.educationId, {
      school: a.school,
      degree: a.degree,
      specialization: a.specialization,
      gpa: a.gpa,
      startYear: a.startYear,
      endYear: a.endYear,
      isCurrent: !!a.isCurrent,
      sortOrder: bSort,
    });

    await updateEducation(b.educationId, {
      school: b.school,
      degree: b.degree,
      specialization: b.specialization,
      gpa: b.gpa,
      startYear: b.startYear,
      endYear: b.endYear,
      isCurrent: !!b.isCurrent,
      sortOrder: aSort,
    });
  }

  async function moveEducationUp(edu) {
    const idx = eduItems.findIndex((x) => x.educationId === edu.educationId);
    if (idx <= 0) return;

    try {
      await swapEducationSort(eduItems[idx], eduItems[idx - 1]);
      await refreshEducation();
    } catch (e) {
      setEduErrMsg(e?.message || "Reorder failed");
    }
  }

  async function moveEducationDown(edu) {
    const idx = eduItems.findIndex((x) => x.educationId === edu.educationId);
    if (idx < 0 || idx >= eduItems.length - 1) return;

    try {
      await swapEducationSort(eduItems[idx], eduItems[idx + 1]);
      await refreshEducation();
    } catch (e) {
      setEduErrMsg(e?.message || "Reorder failed");
    }
  }

  //skills handlers
  function skillsTextToList(text) {
    return text
      .split(/\n|,/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  async function refreshSkills() {
    setSkillsLoading(true);
    setSkillsErrMsg("");
    setSkillsOkMsg("");

    try {
      const data = await getSkills();
      const text =
        typeof data?.skillsText === "string"
          ? data.skillsText
          : Array.isArray(data?.skills)
            ? data.skills.join(", ")
            : "";
      setSkillsText(text);
    } catch (e) {
      setSkillsErrMsg(e?.message || "Failed to load skills");
    } finally {
      setSkillsLoading(false);
    }
  }

  async function saveSkills() {
    setSkillsSaving(true);
    setSkillsErrMsg("");
    setSkillsOkMsg("");

    try {
      const payload = {
        skillsText: skillsText,
        skills: skillsTextToList(skillsText),
      };

      await putSkills(payload);
      setSkillsOkMsg("Saved");
    } catch (e) {
      setSkillsErrMsg(e?.message || "Failed to save skills");
    } finally {
      setSkillsSaving(false);
    }
  }

  //recognitions handlers
  async function refreshRecognitions() {
    setRecLoading(true);
    setRecErrMsg("");

    try {
      const data = await listRecognitions();
      setRecItems(normalizeList(data));
    } catch (e) {
      setRecErrMsg(e?.message || "Failed to load recognitions");
    } finally {
      setRecLoading(false);
    }
  }

  function openRecAdd() {
    setRecModalMode("add");
    setRecSelected(null);
    setRecModalErr("");
    setRecModalOpen(true);
  }

  function openRecEdit(item) {
    setRecModalMode("edit");
    setRecSelected(item);
    setRecModalErr("");
    setRecModalOpen(true);
  }

  function closeRecModal() {
    if (recBusy) return;
    setRecModalOpen(false);
  }

  async function saveRecognition(payload) {
    setRecBusy(true);
    setRecModalErr("");

    try {
      if (recModalMode === "edit" && recSelected?.recognitionId) {
        await updateRecognition(recSelected.recognitionId, {
          ...payload,
          sortOrder: recSelected.sortOrder, // preserve
        });
      } else {
        await createRecognition(payload); // backend assigns sortOrder
      }

      await refreshRecognitions();
      setRecModalOpen(false);
    } catch (e) {
      setRecModalErr(e?.message || "Save failed");
    } finally {
      setRecBusy(false);
    }
  }

  function askRecDelete(item) {
    setRecDeleteTarget(item);
    setRecDeleteErr("");
    setRecDeleteOpen(true);
  }

  function closeRecDelete() {
    if (recDeleteBusy) return;
    setRecDeleteOpen(false);
  }

  async function confirmRecDelete() {
    if (!recDeleteTarget?.recognitionId) return;

    setRecDeleteBusy(true);
    setRecDeleteErr("");

    try {
      await deleteRecognition(recDeleteTarget.recognitionId);
      setRecDeleteOpen(false);
      setRecDeleteTarget(null);
      await refreshRecognitions();
    } catch (e) {
      setRecDeleteErr(e?.message || "Delete failed");
    } finally {
      setRecDeleteBusy(false);
    }
  }

  async function swapRecognitionSort(a, b) {
    const aSort = a.sortOrder ?? 0;
    const bSort = b.sortOrder ?? 0;

    await updateRecognition(a.recognitionId, {
      company: a.company,
      description: a.description,
      sortOrder: bSort,
    });

    await updateRecognition(b.recognitionId, {
      company: b.company,
      description: b.description,
      sortOrder: aSort,
    });
  }

  async function moveRecognitionUp(item) {
    const idx = recItems.findIndex(
      (x) => x.recognitionId === item.recognitionId,
    );
    if (idx <= 0) return;

    try {
      await swapRecognitionSort(recItems[idx], recItems[idx - 1]);
      await refreshRecognitions();
    } catch (e) {
      setRecErrMsg(e?.message || "Reorder failed");
    }
  }

  async function moveRecognitionDown(item) {
    const idx = recItems.findIndex(
      (x) => x.recognitionId === item.recognitionId,
    );
    if (idx < 0 || idx >= recItems.length - 1) return;

    try {
      await swapRecognitionSort(recItems[idx], recItems[idx + 1]);
      await refreshRecognitions();
    } catch (e) {
      setRecErrMsg(e?.message || "Reorder failed");
    }
  }

  function askRecDelete(item) {
    setRecDeleteTarget(item);
    setRecDeleteOpen(true);
  }

  function cancelRecDelete() {
    if (recDeleteBusy) return;
    setRecDeleteOpen(false);
    setRecDeleteTarget(null);
  }

  async function confirmRecDelete() {
    if (!recDeleteTarget?.recognitionId) return;

    setRecDeleteBusy(true);
    try {
      await deleteRecognition(recDeleteTarget.recognitionId);
      setRecDeleteOpen(false);
      setRecDeleteTarget(null);
      await refreshRecognitions();
    } catch (e) {
      // ConfirmModal doesn't display error; use page-level error
      setRecErrMsg(e?.message || "Delete failed");
    } finally {
      setRecDeleteBusy(false);
    }
  }

  //certification handlers
  async function refreshCertifications() {
    setCertLoading(true);
    setCertErrMsg("");

    try {
      const data = await listCertifications();
      setCertItems(normalizeList(data));
    } catch (e) {
      setCertErrMsg(e?.message || "Failed to load certifications");
    } finally {
      setCertLoading(false);
    }
  }

  function openCertAdd() {
    setCertModalMode("add");
    setCertSelected(null);
    setCertModalErr("");
    setCertModalOpen(true);
  }

  function openCertEdit(item) {
    setCertModalMode("edit");
    setCertSelected(item);
    setCertModalErr("");
    setCertModalOpen(true);
  }

  function closeCertModal() {
    if (certBusy) return;
    setCertModalOpen(false);
  }

  async function saveCertification(payload) {
    // IMPORTANT: capture selected before async (prevents the sortOrder null-style bug)
    const selected = certSelected;

    setCertBusy(true);
    setCertModalErr("");

    try {
      if (certModalMode === "edit" && selected?.certificationId) {
        await updateCertification(selected.certificationId, {
          ...payload,
          sortOrder: selected.sortOrder, // preserve sortOrder on edit
        });
      } else {
        await createCertification(payload); // backend assigns sortOrder (or uses provided)
      }

      await refreshCertifications();
      setCertModalOpen(false);
    } catch (e) {
      setCertModalErr(e?.message || "Save failed");
    } finally {
      setCertBusy(false);
    }
  }

  function askCertDelete(item) {
    setCertDeleteTarget(item);
    setCertDeleteOpen(true);
  }

  function cancelCertDelete() {
    if (certDeleteBusy) return;
    setCertDeleteOpen(false);
    setCertDeleteTarget(null);
  }

  async function confirmCertDelete() {
    if (!certDeleteTarget?.certificationId) return;

    setCertDeleteBusy(true);
    try {
      await deleteCertification(certDeleteTarget.certificationId);
      setCertDeleteOpen(false);
      setCertDeleteTarget(null);
      await refreshCertifications();
    } catch (e) {
      setCertErrMsg(e?.message || "Delete failed");
    } finally {
      setCertDeleteBusy(false);
    }
  }

  async function swapCertificationSort(a, b) {
    const aSort = a.sortOrder ?? 0;
    const bSort = b.sortOrder ?? 0;

    await updateCertification(a.certificationId, {
      name: a.name,
      issuer: a.issuer,
      issuedYear: a.issuedYear,
      expiresYear: a.expiresYear,
      credentialId: a.credentialId,
      credentialUrl: a.credentialUrl,
      sortOrder: bSort,
    });

    await updateCertification(b.certificationId, {
      name: b.name,
      issuer: b.issuer,
      issuedYear: b.issuedYear,
      expiresYear: b.expiresYear,
      credentialId: b.credentialId,
      credentialUrl: b.credentialUrl,
      sortOrder: aSort,
    });
  }

  async function moveCertificationUp(item) {
    const idx = certItems.findIndex(
      (x) => x.certificationId === item.certificationId,
    );
    if (idx <= 0) return;

    try {
      await swapCertificationSort(certItems[idx], certItems[idx - 1]);
      await refreshCertifications();
    } catch (e) {
      setCertErrMsg(e?.message || "Reorder failed");
    }
  }

  async function moveCertificationDown(item) {
    const idx = certItems.findIndex(
      (x) => x.certificationId === item.certificationId,
    );
    if (idx < 0 || idx >= certItems.length - 1) return;

    try {
      await swapCertificationSort(certItems[idx], certItems[idx + 1]);
      await refreshCertifications();
    } catch (e) {
      setCertErrMsg(e?.message || "Reorder failed");
    }
  }

  //project handlers
  async function refreshProjects() {
    setProjLoading(true);
    setProjErrMsg("");

    try {
      const data = await listProjects();
      setProjItems(normalizeList(data));
    } catch (e) {
      setProjErrMsg(e?.message || "Failed to load projects");
    } finally {
      setProjLoading(false);
    }
  }

  function openProjAdd() {
    setProjModalMode("add");
    setProjSelected(null);
    setProjModalErr("");
    setProjModalOpen(true);
  }

  function openProjEdit(item) {
    setProjModalMode("edit");
    setProjSelected(item);
    setProjModalErr("");
    setProjModalOpen(true);
  }

  function closeProjModal() {
    if (projBusy) return;
    setProjModalOpen(false);
  }

  async function saveProject(payload) {
    // IMPORTANT: capture selected before async (like your certification fix)
    const selected = projSelected;

    setProjBusy(true);
    setProjModalErr("");

    try {
      if (projModalMode === "edit" && selected?.projectId) {
        await updateProject(selected.projectId, {
          ...payload,
          sortOrder: selected.sortOrder, // preserve sortOrder on edit
        });
      } else {
        await createProject(payload);
      }

      await refreshProjects();
      setProjModalOpen(false);
    } catch (e) {
      setProjModalErr(e?.message || "Save failed");
    } finally {
      setProjBusy(false);
    }
  }

  async function saveProjectAndAddAnother(payload) {
    setProjBusy(true);
    setProjModalErr("");

    try {
      await createProject(payload);
      await refreshProjects();

      setProjResetSignal((n) => n + 1);
      setProjSelected(null);
      setProjModalMode("add");
      // keep modal open
    } catch (e) {
      setProjModalErr(e?.message || "Save failed");
    } finally {
      setProjBusy(false);
    }
  }

  function askProjDelete(item) {
    setProjDeleteTarget(item);
    setProjDeleteOpen(true);
  }

  function cancelProjDelete() {
    if (projDeleteBusy) return;
    setProjDeleteOpen(false);
    setProjDeleteTarget(null);
  }

  async function confirmProjDelete() {
    if (!projDeleteTarget?.projectId) return;

    setProjDeleteBusy(true);
    try {
      await deleteProject(projDeleteTarget.projectId);
      setProjDeleteOpen(false);
      setProjDeleteTarget(null);
      await refreshProjects();
    } catch (e) {
      setProjErrMsg(e?.message || "Delete failed");
    } finally {
      setProjDeleteBusy(false);
    }
  }

  async function swapProjectSort(a, b) {
    const aSort = a.sortOrder ?? 0;
    const bSort = b.sortOrder ?? 0;

    await updateProject(a.projectId, {
      title: a.title,
      summary: a.summary,
      description: a.description,
      techStack: a.techStack,
      demoUrl: a.demoUrl,
      repoUrl: a.repoUrl,
      sortOrder: bSort,
    });

    await updateProject(b.projectId, {
      title: b.title,
      summary: b.summary,
      description: b.description,
      techStack: b.techStack,
      demoUrl: b.demoUrl,
      repoUrl: b.repoUrl,
      sortOrder: aSort,
    });
  }

  async function moveProjectUp(item) {
    const idx = projItems.findIndex((x) => x.projectId === item.projectId);
    if (idx <= 0) return;

    try {
      await swapProjectSort(projItems[idx], projItems[idx - 1]);
      await refreshProjects();
    } catch (e) {
      setProjErrMsg(e?.message || "Reorder failed");
    }
  }

  async function moveProjectDown(item) {
    const idx = projItems.findIndex((x) => x.projectId === item.projectId);
    if (idx < 0 || idx >= projItems.length - 1) return;

    try {
      await swapProjectSort(projItems[idx], projItems[idx + 1]);
      await refreshProjects();
    } catch (e) {
      setProjErrMsg(e?.message || "Reorder failed");
    }
  }

  return (
    <div className="ph-profileEdit">
      <aside className="ph-profileEdit__left_sidebar">
        <PublicPageLinkCard />
      </aside>
      <div className="ph-profileEdit__main">
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
                <ExperienceList
                  items={items}
                  onEdit={openEdit}
                  onDelete={askDelete}
                  onMoveUp={moveExperienceUp}
                  onMoveDown={moveExperienceDown}
                />
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
                <div className="ph-profileEdit__emptyTitle">
                  No education added yet.
                </div>
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
                  onMoveUp={moveEducationUp}
                  onMoveDown={moveEducationDown}
                />
              </div>
            )}
          </ProfileSectionCard>
          <ProfileSectionCard
            title="Skills"
            action={
              <button
                type="button"
                className="ph-profileEdit__primaryBtn"
                onClick={saveSkills}
                disabled={skillsLoading || skillsSaving}
              >
                Save
              </button>
            }
          >
            <SkillsSection
              value={skillsText}
              onChange={setSkillsText}
              loading={skillsLoading}
              saving={skillsSaving}
              errMsg={skillsErrMsg}
              okMsg={skillsOkMsg}
            />
          </ProfileSectionCard>
          <ProfileSectionCard
            title="Recognitions"
            action={
              <button
                type="button"
                className="ph-profileEdit__primaryBtn"
                onClick={openRecAdd}
              >
                Add
              </button>
            }
          >
            {loading ? (
              <div className="ph-profileEdit__muted">Loading...</div>
            ) : recErrMsg ? (
              <div className="ph-profileEdit__error">{recErrMsg}</div>
            ) : recItems.length === 0 ? (
              <div className="ph-profileEdit__empty">
                <div className="ph-profileEdit__emptyTitle">
                  No recognitions added yet.
                </div>
                <div className="ph-profileEdit__emptyText">
                  Add awards, achievements, or shoutouts to show on your public
                  profile.
                </div>
                <button
                  type="button"
                  className="ph-profileEdit__primaryBtn"
                  onClick={openRecAdd}
                >
                  Add recognition
                </button>
              </div>
            ) : (
              <RecognitionsList
                items={recItems}
                onEdit={openRecEdit}
                onDelete={askRecDelete}
                onMoveUp={moveRecognitionUp}
                onMoveDown={moveRecognitionDown}
              />
            )}
          </ProfileSectionCard>
          <ProfileSectionCard
            title="Certifications"
            action={
              <button
                type="button"
                className="ph-profileEdit__primaryBtn"
                onClick={openCertAdd}
              >
                Add
              </button>
            }
          >
            {loading ? (
              <div className="ph-profileEdit__muted">Loading...</div>
            ) : certErrMsg ? (
              <div className="ph-profileEdit__error">{certErrMsg}</div>
            ) : certItems.length === 0 ? (
              <div className="ph-profileEdit__empty">
                <div className="ph-profileEdit__emptyTitle">
                  No certifications added yet.
                </div>
                <div className="ph-profileEdit__emptyText">
                  Add certifications to show on your public profile.
                </div>
                <button
                  type="button"
                  className="ph-profileEdit__primaryBtn"
                  onClick={openCertAdd}
                >
                  Add certification
                </button>
              </div>
            ) : (
              <CertificationsList
                items={certItems}
                onEdit={openCertEdit}
                onDelete={askCertDelete}
                onMoveUp={moveCertificationUp}
                onMoveDown={moveCertificationDown}
              />
            )}
          </ProfileSectionCard>
          <ProfileSectionCard
            title="Projects"
            action={
              <button
                type="button"
                className="ph-profileEdit__primaryBtn"
                onClick={openProjAdd}
              >
                Add
              </button>
            }
          >
            {loading ? (
              <div className="ph-profileEdit__muted">Loading...</div>
            ) : projErrMsg ? (
              <div className="ph-profileEdit__error">{projErrMsg}</div>
            ) : projItems.length === 0 ? (
              <div className="ph-profileEdit__empty">
                <div className="ph-profileEdit__emptyTitle">
                  No projects added yet.
                </div>
                <div className="ph-profileEdit__emptyText">
                  Add your projects to show on your public profile.
                </div>
                <button
                  type="button"
                  className="ph-profileEdit__primaryBtn"
                  onClick={openProjAdd}
                >
                  Add project
                </button>
              </div>
            ) : (
              <ProjectsList
                items={projItems}
                onEdit={openProjEdit}
                onDelete={askProjDelete}
                onMoveUp={moveProjectUp}
                onMoveDown={moveProjectDown}
              />
            )}
          </ProfileSectionCard>
        </div>
      </div>
      <aside className="ph-profileEdit__right_sidebar">
        <Card
          title="Suggestion"
          subtitle="Coming Soon.."
        />
      </aside>
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

      <RecognitionModal
        isOpen={recModalOpen}
        mode={recModalMode}
        initialValue={recSelected}
        isBusy={recBusy}
        errorMessage={recModalErr}
        onClose={closeRecModal}
        onSave={saveRecognition}
      />

      <ConfirmModal
        isOpen={recDeleteOpen}
        title="Delete recognition?"
        message="This cannot be undone."
        confirmText={recDeleteBusy ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        danger={true}
        isBusy={recDeleteBusy}
        onCancel={cancelRecDelete}
        onConfirm={confirmRecDelete}
      />

      <CertificationModal
        isOpen={certModalOpen}
        mode={certModalMode}
        initialValue={certSelected}
        isBusy={certBusy}
        errorMessage={certModalErr}
        onClose={closeCertModal}
        onSave={saveCertification}
      />

      <ConfirmModal
        isOpen={certDeleteOpen}
        title="Delete certification?"
        message="This cannot be undone."
        confirmText={certDeleteBusy ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        danger={true}
        isBusy={certDeleteBusy}
        onCancel={cancelCertDelete}
        onConfirm={confirmCertDelete}
      />

      <ProjectModal
        isOpen={projModalOpen}
        mode={projModalMode}
        initialValue={projSelected}
        isBusy={projBusy}
        errorMessage={projModalErr}
        onClose={closeProjModal}
        onSave={saveProject}
        onSaveAndAddAnother={saveProjectAndAddAnother}
        resetSignal={projResetSignal}
      />

      <ConfirmModal
        isOpen={projDeleteOpen}
        title="Delete project?"
        message="This cannot be undone."
        confirmText={projDeleteBusy ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        danger={true}
        isBusy={projDeleteBusy}
        onCancel={cancelProjDelete}
        onConfirm={confirmProjDelete}
      />
    </div>
  );
}
