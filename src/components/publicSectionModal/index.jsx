import React, { useEffect } from "react";
import "./index.scss";

export default function PublicSectionModal({
  isOpen,
  title,
  onClose,
  children,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("ph-modalOpen");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("ph-modalOpen");
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="ph-publicModal__overlay" role="dialog" aria-modal="true">
      <button
        type="button"
        className="ph-publicModal__backdrop"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div className="ph-publicModal__panel">
        <div className="ph-publicModal__header">
          <div className="ph-publicModal__title">{title}</div>

          <button
            type="button"
            className="ph-publicModal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="ph-publicModal__body">{children}</div>
      </div>
    </div>
  );
}
