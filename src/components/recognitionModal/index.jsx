import React, { useEffect, useMemo, useState } from "react";
import Modal from "../modal";
import "./index.scss";

const emptyForm = {
  company: "",
  description: "",
};

function validate(form) {
  const errs = {};
  if (!form.company.trim()) errs.company = "Company is required";
  if (!form.description.trim()) errs.description = "Description is required";
  return errs;
}

export default function RecognitionModal({
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

  const titleText = mode === "edit" ? "Edit recognition" : "Add recognition";

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initialValue) {
      setForm({
        company: initialValue.company || "",
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

  function submitSave() {
    setTouched({ company: true, description: true });
    const errs = validate(form);
    if (Object.keys(errs).length > 0) return;

    onSave?.({
      company: form.company.trim(),
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
            className="ph-recModal__btn"
            onClick={onClose}
            disabled={isBusy}
          >
            Cancel
          </button>

          <button
            type="button"
            className="ph-recModal__btn ph-recModal__btn--primary"
            onClick={submitSave}
            disabled={!canSubmit}
          >
            {isBusy ? "Saving…" : "Save"}
          </button>
        </>
      }
    >
      {errorMessage ? (
        <div className="ph-recModal__error">{errorMessage}</div>
      ) : null}

      <div className="ph-recModal__grid">
        <div className="ph-recModal__field">
          <label className="ph-recModal__label">Company *</label>
          <input
            className="ph-recModal__input"
            value={form.company}
            onChange={(e) => setField("company", e.target.value)}
            onBlur={() => markTouched("company")}
            placeholder="OSF HealthCare"
            disabled={isBusy}
          />
          {touched.company && errors.company ? (
            <div className="ph-recModal__errText">{errors.company}</div>
          ) : null}
        </div>

        <div className="ph-recModal__field">
          <label className="ph-recModal__label">Description *</label>
          <textarea
            className="ph-recModal__textarea"
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            onBlur={() => markTouched("description")}
            placeholder="Appreciation award for pipeline optimization"
            rows={4}
            disabled={isBusy}
          />
          {touched.description && errors.description ? (
            <div className="ph-recModal__errText">{errors.description}</div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
