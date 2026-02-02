import React from "react";
import "./index.scss";

export default function PublicSkeleton({ lines = 3 }) {
  return (
    <div className="ph-skeleton">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="ph-skeleton__line" />
      ))}
    </div>
  );
}
