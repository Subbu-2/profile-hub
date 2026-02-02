import React from "react";
import "./index.scss";

export default function PublicLinkItem({ label, href }) {
  if (!href) return null;

  return (
    <a className="ph-publicLinkItem" href={href} target="_blank" rel="noreferrer">
      <div className="ph-publicLinkItem__label">{label}</div>
      <div className="ph-publicLinkItem__url">{href}</div>
    </a>
  );
}
