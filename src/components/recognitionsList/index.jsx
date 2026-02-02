import React from "react";
import "./index.scss";
import ItemActions from "../itemActions";

export default function RecognitionsList({
  items,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="ph-recList">
      {items.map((it, idx) => (
        <li key={it.recognitionId} className="ph-recList__item">
          <div className="ph-recList__main">
            <div className="ph-recList__topRow">
              <div className="ph-recList__title">{it.company}</div>

              <ItemActions
                onMoveUp={onMoveUp ? () => onMoveUp(it) : undefined}
                onMoveDown={onMoveDown ? () => onMoveDown(it) : undefined}
                onEdit={onEdit ? () => onEdit(it) : undefined}
                onDelete={onDelete ? () => onDelete(it) : undefined}
                disableUp={idx === 0}
                disableDown={idx === items.length - 1}
              />
            </div>

            {it.description ? (
              <div className="ph-recList__desc">{it.description}</div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
