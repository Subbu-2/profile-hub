import React from "react";
import "./index.scss";
import ItemActions from "../itemActions";

export default function CertificationsList({
  items,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="ph-certList">
      {items.map((it, idx) => (
        <li key={it.certificationId} className="ph-certList__item">
          <div className="ph-certList__main">
            <div className="ph-certList__topRow">
              <div className="ph-certList__title">{it.name}</div>

              <ItemActions
                onMoveUp={onMoveUp ? () => onMoveUp(it) : undefined}
                onMoveDown={onMoveDown ? () => onMoveDown(it) : undefined}
                onEdit={onEdit ? () => onEdit(it) : undefined}
                onDelete={onDelete ? () => onDelete(it) : undefined}
                disableUp={idx === 0}
                disableDown={idx === items.length - 1}
              />
            </div>

            <div className="ph-certList__meta">
              {it.issuer ? <span className="ph-certList__issuer">{it.issuer}</span> : null}

              {it.issuedYear || it.expiresYear ? (
                <span className="ph-certList__years">
                  {it.issuedYear || "—"} → {it.expiresYear || "—"}
                </span>
              ) : null}

              {it.credentialId ? (
                <span className="ph-certList__credId">ID: {it.credentialId}</span>
              ) : null}

              {it.credentialUrl ? (
                <span className="ph-certList__url">{it.credentialUrl}</span>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
