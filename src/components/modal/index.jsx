import React, { useEffect } from "react";
import "./index.scss";

export default function Modal({ isOpen, title, onClose, children, footer }) {
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e) {
      if (e.key === "Escape") onClose?.();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function onOverlayClick(e) {
    if (e.target === e.currentTarget) onClose?.();
  }

  return (
    <div className="ph-modal" role="dialog" aria-modal="true" onClick={onOverlayClick}>
      <div className="ph-modal__card">
        <div className="ph-modal__header">
          <div className="ph-modal__title">{title}</div>
          <button type="button" className="ph-modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="ph-modal__body">{children}</div>

        {footer ? <div className="ph-modal__footer">{footer}</div> : null}
      </div>
    </div>
  );
}
