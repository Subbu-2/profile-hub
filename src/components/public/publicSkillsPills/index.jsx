import React from "react";
import "./index.scss";

export default function PublicSkillsPills({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="ph-skillsPills">
      {items.map((s, idx) => (
        <span key={`${s}-${idx}`} className="ph-skillsPills__pill">
          {s}
        </span>
      ))}
    </div>
  );
}
