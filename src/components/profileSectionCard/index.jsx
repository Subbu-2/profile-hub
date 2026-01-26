import React from "react";
import "./index.scss";

export default function ProfileSectionCard({ title, action, children }) {
  return (
    <section className="ph-sectionCard">
      <div className="ph-sectionCard__header">
        <h2 className="ph-sectionCard__title">{title}</h2>
        <div className="ph-sectionCard__action">{action}</div>
      </div>

      <div className="ph-sectionCard__body">{children}</div>
    </section>
  );
}
