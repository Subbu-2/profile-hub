import React, { useEffect, useMemo, useState } from "react";
import Modal from "../modal";
import "./index.scss";

function isValidYear(v) {
  const s = String(v ?? "").trim();
  if (!/^\d{4}$/.test(s)) return false;
  const n = Number(s);
  return n >= 1900 && n <= 2100;
}

function formatInit(v) {
  return String(v ?? "").trim();
}

function validate(form) {
  const errs = {};

  if (!form.school.trim()) errs.school = "School is required";
  if (!form.degree.trim()) errs.degree = "Degree is required";

  if (!form.startYear.trim()) errs.startYear = "Start year is required";
  else if (!isValidYear(form.startYear)) errs.startYear = "Use YYYY (e.g., 2020)";

  if (!form.isCurrent) {
    if (!form.endYear.trim()) errs.endYear = "End year is required";
    else if (!isValidYear(form.endYear)) errs.endYear = "Use YYYY (e.g., 2024)";
    else if (
      isValidYear(form.startYear) &&
      Number(form.endYear) < Number(form.startYear)
    ) {
      errs.endYear = "End year cannot be earlier than start year";
    }
  }

  if (form.gpa && isNaN(Number(form.gpa))) errs.gpa = "GPA must be a number";

  return errs;
}

export default function EducationModal({
  isOpen,
  mode, // "add" | "edit"
  initialValue,
  isBusy,
  errorMessage,
  onClose,
  onSave,
  onSaveAndAddAnother,
  resetSignal,
}) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    school: "",
    degree: "",
    specialization: "",
    gpa: "",
    startYear: "",
    endYear: "",
    isCurrent: false,
  });

  const [touched, setTouched] = useState({});

  // hydrate on open
  useEffect(() => {
    if (!isOpen) return;

    setTouched({});

    if (isEdit && initialValue) {
      setForm({
        school: initialValue.school || "",
        degree: initialValue.degree || "",
        specialization: initialValue.specialization || "",
        gpa: initialValue.gpa || "",
        startYear: formatInit(initialValue.startYear),
        endYear: formatInit(initialValue.endYear),
        isCurrent: Boolean(initialValue.isCurrent),
      });
    } else {
      setForm({
        school: "",
        degree: "",
        specialization: "",
        gpa: "",
        startYear: "",
        endYear: "",
        isCurrent: false,
      });
    }
  }, [isOpen, isEdit, initialValue]);

  // reset after Save & Add Another success
  useEffect(() => {
    if (!isOpen) return;
    if (mode !== "add") return;

    setTouched({});
    setForm({
      school: "",
      degree: "",
      specialization: "",
      gpa: "",
      startYear: "",
      endYear: "",
      isCurrent: false,
    });
  }, [resetSignal, isOpen, mode]);

  function setField(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function markTouched(name) {
    setTouched((p) => ({ ...p, [name]: true }));
  }

  function onToggleCurrent(val) {
    if (val) {
      setForm((p) => ({ ...p, isCurrent: true, endYear: "" }));
      setTouched((p) => ({ ...p, endYear: false }));
    } else {
      setForm((p) => ({ ...p, isCurrent: false }));
    }
  }

  const errors = useMemo(() => validate(form), [form]);
  const canSubmit = Object.keys(errors).length === 0 && !isBusy;

  function payload() {
    return {
      school: form.school.trim(),
      degree: form.degree.trim(),
      specialization: form.specialization.trim()
        ? form.specialization.trim()
        : "",
      gpa: form.gpa.trim() ? form.gpa.trim() : "",
      startYear: form.startYear.trim(),
      endYear: form.isCurrent ? "" : form.endYear.trim(),
      isCurrent: Boolean(form.isCurrent),
    };
  }

  function submitSave() {
    if (isBusy) return;

    setTouched({
      school: true,
      degree: true,
      startYear: true,
      endYear: true,
      gpa: true,
    });

    const errs = validate(form);
    if (Object.keys(errs).length > 0) return;

    onSave?.(payload());
  }

  function submitSaveAndAddAnother() {
    if (isBusy) return;

    setTouched({
      school: true,
      degree: true,
      startYear: true,
      endYear: true,
      gpa: true,
    });

    const errs = validate(form);
    if (Object.keys(errs).length > 0) return;

    onSaveAndAddAnother?.(payload());
  }

  return (
    <Modal
      isOpen={isOpen}
      title={isEdit ? "Edit education" : "Add education"}
      onClose={isBusy ? undefined : onClose}
      footer={
        <>
          <button
            type="button"
            className="ph-eduModal__btn"
            onClick={onClose}
            disabled={isBusy}
          >
            Cancel
          </button>

          {mode === "add" ? (
            <button
              type="button"
              className="ph-eduModal__btn ph-eduModal__btn--ghost"
              onClick={submitSaveAndAddAnother}
              disabled={!canSubmit}
            >
              {isBusy ? "Saving…" : "Save & add another"}
            </button>
          ) : null}

          <button
            type="button"
            className="ph-eduModal__btn ph-eduModal__btn--primary"
            onClick={submitSave}
            disabled={!canSubmit}
          >
            {isBusy ? "Saving…" : "Save"}
          </button>
        </>
      }
    >
      {errorMessage ? (
        <div className="ph-eduModal__error">{errorMessage}</div>
      ) : null}

      <div className="ph-eduModal__grid">
        <div className="ph-eduModal__field">
          <label className="ph-eduModal__label">School *</label>
          <input
            className="ph-eduModal__input"
            value={form.school}
            onChange={(e) => setField("school", e.target.value)}
            onBlur={() => markTouched("school")}
            placeholder="University of Illinois"
            disabled={isBusy}
            autoFocus
          />
          {touched.school && errors.school ? (
            <div className="ph-eduModal__errText">{errors.school}</div>
          ) : null}
        </div>

        <div className="ph-eduModal__field">
          <label className="ph-eduModal__label">Degree *</label>
          <input
            className="ph-eduModal__input"
            value={form.degree}
            onChange={(e) => setField("degree", e.target.value)}
            onBlur={() => markTouched("degree")}
            placeholder="B.S. Computer Science"
            disabled={isBusy}
          />
          {touched.degree && errors.degree ? (
            <div className="ph-eduModal__errText">{errors.degree}</div>
          ) : null}
        </div>

        <div className="ph-eduModal__field">
          <label className="ph-eduModal__label">Specialization</label>
          <input
            className="ph-eduModal__input"
            value={form.specialization}
            onChange={(e) => setField("specialization", e.target.value)}
            placeholder="(optional)"
            disabled={isBusy}
          />
        </div>

        <div className="ph-eduModal__field">
          <label className="ph-eduModal__label">GPA</label>
          <input
            className="ph-eduModal__input"
            value={form.gpa}
            onChange={(e) => setField("gpa", e.target.value)}
            onBlur={() => markTouched("gpa")}
            placeholder="(optional)"
            disabled={isBusy}
          />
          {touched.gpa && errors.gpa ? (
            <div className="ph-eduModal__errText">{errors.gpa}</div>
          ) : null}
        </div>

        <div className="ph-eduModal__row">
          <div className="ph-eduModal__field">
            <label className="ph-eduModal__label">Start (YYYY) *</label>
            <input
              className="ph-eduModal__input"
              value={form.startYear}
              onChange={(e) => setField("startYear", e.target.value)}
              onBlur={() => markTouched("startYear")}
              placeholder="2020"
              inputMode="numeric"
              maxLength={4}
              disabled={isBusy}
            />
            {touched.startYear && errors.startYear ? (
              <div className="ph-eduModal__errText">{errors.startYear}</div>
            ) : null}
          </div>

          <div className="ph-eduModal__field">
            <label className="ph-eduModal__label">
              End (YYYY){form.isCurrent ? "" : " *"}
            </label>
            <input
              className="ph-eduModal__input"
              value={form.endYear}
              onChange={(e) => setField("endYear", e.target.value)}
              onBlur={() => markTouched("endYear")}
              placeholder={form.isCurrent ? "Present" : "2024"}
              inputMode="numeric"
              maxLength={4}
              disabled={isBusy || form.isCurrent}
            />
            {!form.isCurrent && touched.endYear && errors.endYear ? (
              <div className="ph-eduModal__errText">{errors.endYear}</div>
            ) : null}
          </div>
        </div>

        <label className="ph-eduModal__checkRow">
          <input
            type="checkbox"
            checked={form.isCurrent}
            onChange={(e) => onToggleCurrent(e.target.checked)}
            disabled={isBusy}
          />
          <span>Currently studying here</span>
        </label>
      </div>
    </Modal>
  );
}