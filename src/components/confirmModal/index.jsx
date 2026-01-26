import React from "react";
import Modal from "../modal";
import "./index.scss";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  isBusy = false,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={isBusy ? undefined : onCancel}
      footer={
        <>
          <button
            type="button"
            className="ph-confirm__btn"
            onClick={onCancel}
            disabled={isBusy}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`ph-confirm__btn ${danger ? "ph-confirm__btn--danger" : "ph-confirm__btn--primary"}`}
            onClick={onConfirm}
            disabled={isBusy}
          >
            {isBusy ? "Working…" : confirmText}
          </button>
        </>
      }
    >
      <div className="ph-confirm__message">{message}</div>
    </Modal>
  );
}
