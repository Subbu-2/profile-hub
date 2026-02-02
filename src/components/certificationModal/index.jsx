import React, { useEffect, useMemo, useState } from "react";
import Modal from "../modal";
import "./index.scss";

const emptyForm = {
  name: "",
  issuer: "",
  issuedYear: "",
  expiresYear: "",
  credentialId: "",
  credentialUrl: "",
};

function isValidYear(v) {
  if (!v) return true;
  return /^\d{4}$/.test(String(v).trim());
}

function validate(form) {
  const errs = {};

  if (!form.name.trim()) errs.name = "Name is required";
  if (!form.issuer.trim()) errs.issuer = "Issuer is required";

  if (!isValidYear(form.issuedYear)) errs.issuedYear = "Use YYYY (e.g., 2024)";
  if (!isValidYear(form.expiresYear)) errs.expiresYear = "Use YYYY (e.g., 2026)";

  // If both years present, expires >= issued
  if (form.issuedYear && form.expiresYear && isValidYear(form.issuedYear) && isValidYear(form.expiresYear)) {
    const a = Number(form.issuedYear);
    const b = Number(form.expiresYear);
    if (!Number.isNaN(a) && !Number.isNaN(b) && b < a) {
      errs.expiresYear = "Expires year must be >= issued year";
    }
  }

  // Light URL check (optional)
  if (form.credentialUrl.trim() && !form.credentialUrl.trim().startsWith("http")) {
    errs.credentialUrl = "Use a full URL starting with http(s)";
  }

  return errs;
}

export default function CertificationModal({
  isOpen,
  mode, // "add" | "edit"
  initialValue,
  isBusy,
  errorMessage,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(emptyForm);
  const [touched, setTouched] = useState({});

  const titleText = mode === "edit" ? "Edit certification" : "Add certification";

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initialValue) {
      setForm({
        name: initialValue.name || "",
        issuer: initialValue.issuer || "",
        issuedYear: initialValue.issuedYear || "",
        expiresYear: initialValue.expiresYear || "",
        credentialId: initialValue.credentialId || "",
        credentialUrl: initialValue.credentialUrl || "",
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

  function submitSave() {
    setTouched({
      name: true,
      issuer: true,
      issuedYear: true,
      expiresYear: true,
      credentialId: true,
      credentialUrl: true,
    });

    const errs = validate(form);
    if (Object.keys(errs).length > 0) return;

    onSave?.({
      name: form.name.trim(),
      issuer: form.issuer.trim(),
      issuedYear: String(form.issuedYear || "").trim(),
      expiresYear: String(form.expiresYear || "").trim(),
      credentialId: form.credentialId.trim(),
      credentialUrl: form.credentialUrl.trim(),
      // sortOrder is handled by the page (same as recognitions pattern)
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
            className="ph-certModal__btn"
            onClick={onClose}
            disabled={isBusy}
          >
            Cancel
          </button>

          <button
            type="button"
            className="ph-certModal__btn ph-certModal__btn--primary"
            onClick={submitSave}
            disabled={!canSubmit}
          >
            {isBusy ? "Saving…" : "Save"}
          </button>
        </>
      }
    >
      {errorMessage ? (
        <div className="ph-certModal__error">{errorMessage}</div>
      ) : null}

      <div className="ph-certModal__grid">
        <div className="ph-certModal__field">
          <label className="ph-certModal__label">Name *</label>
          <input
            className="ph-certModal__input"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            onBlur={() => markTouched("name")}
            placeholder="AWS Certified Developer – Associate"
            disabled={isBusy}
          />
          {touched.name && errors.name ? (
            <div className="ph-certModal__errText">{errors.name}</div>
          ) : null}
        </div>

        <div className="ph-certModal__field">
          <label className="ph-certModal__label">Issuer *</label>
          <input
            className="ph-certModal__input"
            value={form.issuer}
            onChange={(e) => setField("issuer", e.target.value)}
            onBlur={() => markTouched("issuer")}
            placeholder="Amazon Web Services"
            disabled={isBusy}
          />
          {touched.issuer && errors.issuer ? (
            <div className="ph-certModal__errText">{errors.issuer}</div>
          ) : null}
        </div>

        <div className="ph-certModal__twoCol">
          <div className="ph-certModal__field">
            <label className="ph-certModal__label">Issued year</label>
            <input
              className="ph-certModal__input"
              value={form.issuedYear}
              onChange={(e) => setField("issuedYear", e.target.value)}
              onBlur={() => markTouched("issuedYear")}
              placeholder="2024"
              disabled={isBusy}
            />
            {touched.issuedYear && errors.issuedYear ? (
              <div className="ph-certModal__errText">{errors.issuedYear}</div>
            ) : null}
          </div>

          <div className="ph-certModal__field">
            <label className="ph-certModal__label">Expires year</label>
            <input
              className="ph-certModal__input"
              value={form.expiresYear}
              onChange={(e) => setField("expiresYear", e.target.value)}
              onBlur={() => markTouched("expiresYear")}
              placeholder="2027"
              disabled={isBusy}
            />
            {touched.expiresYear && errors.expiresYear ? (
              <div className="ph-certModal__errText">{errors.expiresYear}</div>
            ) : null}
          </div>
        </div>

        <div className="ph-certModal__field">
          <label className="ph-certModal__label">Credential ID</label>
          <input
            className="ph-certModal__input"
            value={form.credentialId}
            onChange={(e) => setField("credentialId", e.target.value)}
            onBlur={() => markTouched("credentialId")}
            placeholder="ABC-123-XYZ"
            disabled={isBusy}
          />
        </div>

        <div className="ph-certModal__field">
          <label className="ph-certModal__label">Credential URL</label>
          <input
            className="ph-certModal__input"
            value={form.credentialUrl}
            onChange={(e) => setField("credentialUrl", e.target.value)}
            onBlur={() => markTouched("credentialUrl")}
            placeholder="https://..."
            disabled={isBusy}
          />
          {touched.credentialUrl && errors.credentialUrl ? (
            <div className="ph-certModal__errText">{errors.credentialUrl}</div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
