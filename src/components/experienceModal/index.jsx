import React, { useEffect, useMemo, useState } from "react";
import Modal from "../modal";
import "./index.scss";

const emptyForm = {
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
};

function validate(form) {
  const errs = {};
  if (!form.title.trim()) errs.title = "Title is required";
  if (!form.company.trim()) errs.company = "Company is required";
  if (!form.startDate.trim()) errs.startDate = "Start date is required";
  return errs;
}

export default function ExperienceModal({
  isOpen,
  mode, // "add" | "edit"
  initialValue,
  isBusy,
  errorMessage,
  onClose,
  onSave,
  onSaveAndAddAnother,
}) {
  const [form, setForm] = useState(emptyForm);
  const [touched, setTouched] = useState({});

  const titleText = mode === "edit" ? "Edit experience" : "Add experience";

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initialValue) {
      setForm({
        title: initialValue.title || "",
        company: initialValue.company || "",
        location: initialValue.location || "",
        startDate: initialValue.startDate || "",
        endDate: initialValue.endDate || "",
        isCurrent: !!initialValue.isCurrent,
        description: initialValue.description || "",
      });
    } else {
      setForm(emptyForm);
    }
    setTouched({});
  }, [isOpen, mode, initialValue]);

  const errors = useMemo(() => validate(form), [form]);
  const canSubmit = Object.keys(errors).length === 0 && !isBusy;

  function setField(name, value) {
    setForm((p) => ({ ...p, [name]: value }));
  }

  function markTouched(name) {
    setTouched((p) => ({ ...p, [name]: true }));
  }

  function onToggleCurrent(val) {
    if (val) {
      setForm((p) => ({ ...p, isCurrent: true, endDate: "" }));
    } else {
      setForm((p) => ({ ...p, isCurrent: false }));
    }
  }

  function submitSave() {
    setTouched({ title: true, company: true, startDate: true });
    const errs = validate(form);
    if (Object.keys(errs).length > 0) return;

    onSave?.({
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      startDate: form.startDate.trim(),
      endDate: form.isCurrent ? "" : form.endDate.trim(),
      isCurrent: !!form.isCurrent,
      description: form.description.trim(),
    });
  }

  function submitSaveAndAddAnother() {
    setTouched({ title: true, company: true, startDate: true });
    const errs = validate(form);
    if (Object.keys(errs).length > 0) return;

    onSaveAndAddAnother?.({
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      startDate: form.startDate.trim(),
      endDate: form.isCurrent ? "" : form.endDate.trim(),
      isCurrent: !!form.isCurrent,
      description: form.description.trim(),
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      title={titleText}
      onClose={isBusy ? undefined : onClose}
      footer={
        <>
          <button
            type="button"
            className="ph-expModal__btn"
            onClick={onClose}
            disabled={isBusy}
          >
            Cancel
          </button>

          {mode === "add" ? (
            <button
              type="button"
              className="ph-expModal__btn ph-expModal__btn--ghost"
              onClick={submitSaveAndAddAnother}
              disabled={!canSubmit}
            >
              {isBusy ? "Saving…" : "Save & add another"}
            </button>
          ) : null}

          <button
            type="button"
            className="ph-expModal__btn ph-expModal__btn--primary"
            onClick={submitSave}
            disabled={!canSubmit}
          >
            {isBusy ? "Saving…" : "Save"}
          </button>
        </>
      }
    >
      {errorMessage ? <div className="ph-expModal__error">{errorMessage}</div> : null}

      <div className="ph-expModal__grid">
        <div className="ph-expModal__field">
          <label className="ph-expModal__label">Title *</label>
          <input
            className="ph-expModal__input"
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            onBlur={() => markTouched("title")}
            placeholder="Software Engineer"
          />
          {touched.title && errors.title ? <div className="ph-expModal__errText">{errors.title}</div> : null}
        </div>

        <div className="ph-expModal__field">
          <label className="ph-expModal__label">Company *</label>
          <input
            className="ph-expModal__input"
            value={form.company}
            onChange={(e) => setField("company", e.target.value)}
            onBlur={() => markTouched("company")}
            placeholder="Discover"
          />
          {touched.company && errors.company ? <div className="ph-expModal__errText">{errors.company}</div> : null}
        </div>

        <div className="ph-expModal__field">
          <label className="ph-expModal__label">Location</label>
          <input
            className="ph-expModal__input"
            value={form.location}
            onChange={(e) => setField("location", e.target.value)}
            placeholder="Peoria, IL"
          />
        </div>

        <div className="ph-expModal__row2">
          <div className="ph-expModal__field">
            <label className="ph-expModal__label">Start (YYYY-MM) *</label>
            <input
              className="ph-expModal__input"
              value={form.startDate}
              onChange={(e) => setField("startDate", e.target.value)}
              onBlur={() => markTouched("startDate")}
              placeholder="2024-08"
            />
            {touched.startDate && errors.startDate ? (
              <div className="ph-expModal__errText">{errors.startDate}</div>
            ) : null}
          </div>

          <div className="ph-expModal__field">
            <label className="ph-expModal__label">End (YYYY-MM)</label>
            <input
              className="ph-expModal__input"
              value={form.endDate}
              onChange={(e) => setField("endDate", e.target.value)}
              placeholder="2026-01"
              disabled={form.isCurrent}
            />
          </div>
        </div>

        <div className="ph-expModal__checkRow">
          <label className="ph-expModal__check">
            <input
              type="checkbox"
              checked={form.isCurrent}
              onChange={(e) => onToggleCurrent(e.target.checked)}
              disabled={isBusy}
            />
            Current role
          </label>
        </div>

        <div className="ph-expModal__field">
          <label className="ph-expModal__label">Description</label>
          <textarea
            className="ph-expModal__textarea"
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="What did you work on? (optional)"
            rows={4}
          />
        </div>
      </div>
    </Modal>
  );
}
