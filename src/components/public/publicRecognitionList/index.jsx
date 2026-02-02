import React from "react";
import "./index.scss";

export default function PublicRecognitionList({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="ph-recList">
      {items.map((r, idx) => (
        <div key={r.id || `${r.company}-${idx}`} className="ph-recList__item">
          <div className="ph-recList__top">
            <div className="ph-recList__company">{r.company}</div>
          </div>

          {r.description ? (
            <div className="ph-recList__desc">{r.description}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
