import React, { useEffect, useMemo, useState } from "react";
import Modal from "../modal";
import "./index.scss";

const emptyForm = {
  title: "",
  summary: "",
  description: "",
  techStack: "",
  demoUrl: "",
  repoUrl: "",
};

function isHttpUrl(v) {
  if (!v) return true; // optional
  return v.startsWith("http://") || v.startsWith("https://");
}

function validate(form) {
  const errs = {};
  if (!form.title.trim()) errs.title = "Title is required";
  if (!form.summary.trim()) errs.summary = "Summary is required";

  if (!isHttpUrl(form.demoUrl.trim())) {
    errs.demoUrl = "Demo URL must start with http:// or https://";
  }
  if (!isHttpUrl(form.repoUrl.trim())) {
    errs.repoUrl = "Repo URL must start with http:// or https://";
  }
  return errs;
}

export default function ProjectModal({
  isOpen,
  mode, // "add" | "edit"
  initialValue,
  isBusy,
  errorMessage,
  onClose,
  onSave,
  onSaveAndAddAnother, // only for add
  resetSignal = 0, // increments after successful save & add another
}) {
  const isAdd = mode !== "edit";
  const titleText = mode === "edit" ? "Edit project" : "Add project";

  const [form, setForm] = useState(emptyForm);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initialValue) {
      setForm({
        title: initialValue.title || "",
        summary: initialValue.summary || "",
        description: initialValue.description || "",
        techStack: initialValue.techStack || "",
        demoUrl: initialValue.demoUrl || "",
        repoUrl: initialValue.repoUrl || "",
      });
    } else {
      setForm(emptyForm);
    }

    setTouched({});
  }, [isOpen, mode, initialValue]);

  // Clear form after Save & Add Another success (only in add mode)
  useEffect(() => {
    if (!isOpen) return;
    if (!isAdd) return;

    setForm(emptyForm);
    setTouched({});
  }, [resetSignal, isOpen, isAdd]);

  const errors = useMemo(() => validate(form), [form]);
  const canSubmit = Object.keys(errors).length === 0 && !isBusy;

  function setField(name, value) {
    setForm((p) => ({ ...p, [name]: value }));
  }

  function markTouched(name) {
    setTouched((p) => ({ ...p, [name]: true }));
  }

  function buildPayload() {
    return {
      title: form.title.trim(),
      summary: form.summary.trim(),
      description: form.description.trim(),
      techStack: form.techStack.trim(),
      demoUrl: form.demoUrl.trim(),
      repoUrl: form.repoUrl.trim(),
    };
  }

  function submitSave() {
    setTouched({
      title: true,
      summary: true,
      demoUrl: true,
      repoUrl: true,
    });

    const errs = validate(form);
    if (Object.keys(errs).length > 0) return;

    onSave?.(buildPayload());
  }

  function submitSaveAndAddAnother() {
    setTouched({
      title: true,
      summary: true,
      demoUrl: true,
      repoUrl: true,
    });

    const errs = validate(form);
    if (Object.keys(errs).length > 0) return;

    onSaveAndAddAnother?.(buildPayload());
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
            className="ph-projModal__btn"
            onClick={onClose}
            disabled={isBusy}
          >
            Cancel
          </button>

          <div className="ph-projModal__footerRight">
            {isAdd ? (
              <button
                type="button"
                className="ph-projModal__btn"
                onClick={submitSaveAndAddAnother}
                disabled={!canSubmit}
              >
                {isBusy ? "Saving…" : "Save & Add Another"}
              </button>
            ) : null}

            <button
              type="button"
              className="ph-projModal__btn ph-projModal__btn--primary"
              onClick={submitSave}
              disabled={!canSubmit}
            >
              {isBusy ? "Saving…" : "Save"}
            </button>
          </div>
        </>
      }
    >
      {errorMessage ? (
        <div className="ph-projModal__error">{errorMessage}</div>
      ) : null}

      <div className="ph-projModal__grid">
        <div className="ph-projModal__field">
          <label className="ph-projModal__label">Title *</label>
          <input
            className="ph-projModal__input"
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            onBlur={() => markTouched("title")}
            placeholder="Profile Hub"
            disabled={isBusy}
          />
          {touched.title && errors.title ? (
            <div className="ph-projModal__errText">{errors.title}</div>
          ) : null}
        </div>

        <div className="ph-projModal__field">
          <label className="ph-projModal__label">Summary *</label>
          <input
            className="ph-projModal__input"
            value={form.summary}
            onChange={(e) => setField("summary", e.target.value)}
            onBlur={() => markTouched("summary")}
            placeholder="A full-stack portfolio platform with public profiles."
            disabled={isBusy}
          />
          {touched.summary && errors.summary ? (
            <div className="ph-projModal__errText">{errors.summary}</div>
          ) : null}
        </div>

        <div className="ph-projModal__field">
          <label className="ph-projModal__label">Description</label>
          <textarea
            className="ph-projModal__textarea"
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="What it does, your role, key outcomes…"
            rows={4}
            disabled={isBusy}
          />
        </div>

        <div className="ph-projModal__field">
          <label className="ph-projModal__label">Tech Stack</label>
          <textarea
            className="ph-projModal__textarea"
            value={form.techStack}
            onChange={(e) => setField("techStack", e.target.value)}
            placeholder="Go, Gin, DynamoDB, React, AWS"
            rows={2}
            disabled={isBusy}
          />
        </div>

        <div className="ph-projModal__grid2">
          <div className="ph-projModal__field">
            <label className="ph-projModal__label">Demo URL</label>
            <input
              className="ph-projModal__input"
              value={form.demoUrl}
              onChange={(e) => setField("demoUrl", e.target.value)}
              onBlur={() => markTouched("demoUrl")}
              placeholder="https://…"
              disabled={isBusy}
            />
            {touched.demoUrl && errors.demoUrl ? (
              <div className="ph-projModal__errText">{errors.demoUrl}</div>
            ) : null}
          </div>

          <div className="ph-projModal__field">
            <label className="ph-projModal__label">Repo URL</label>
            <input
              className="ph-projModal__input"
              value={form.repoUrl}
              onChange={(e) => setField("repoUrl", e.target.value)}
              onBlur={() => markTouched("repoUrl")}
              placeholder="https://…"
              disabled={isBusy}
            />
            {touched.repoUrl && errors.repoUrl ? (
              <div className="ph-projModal__errText">{errors.repoUrl}</div>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
}
