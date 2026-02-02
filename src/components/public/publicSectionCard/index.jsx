import React from "react";
import "./index.scss";

export default function PublicSectionCard({ title, right, children }) {
  return (
    <section className="ph-publicCard">
      <div className="ph-publicCard__header">
        <h2 className="ph-publicCard__title">{title}</h2>
        {right ? <div className="ph-publicCard__right">{right}</div> : null}
      </div>

      <div className="ph-publicCard__body">{children}</div>
    </section>
  );
}
