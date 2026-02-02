import React from "react";
import "./index.scss";

function formatDateRange(startDate, endDate, isCurrent) {
  const start = startDate || "";
  const end = isCurrent ? "Present" : endDate || "";
  if (!start && !end) return "";
  if (!start) return end;
  if (!end) return start;
  return `${start} - ${end}`;
}

export default function ExperienceList({ items, onEdit, onDelete,  onMoveUp, onMoveDown }) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="ph-expList">
      {items.map((it, idx) => (
        <li key={it.experienceId} className="ph-expList__item">
          <div className="ph-expList__main">
            <div className="ph-expList__topRow">
              <div className="ph-expList__title">{it.title}</div>
              <div className="ph-expList__actions">
                <button
                  type="button"
                  className="ph-expList__btn"
                  onClick={() => onMoveUp?.(it)}
                  disabled={idx === 0}
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="ph-expList__btn"
                  onClick={() => onMoveDown?.(it)}
                  disabled={idx === items.length - 1}
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="ph-expList__btn"
                  onClick={() => onEdit(it)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="ph-expList__btn ph-expList__btn--danger"
                  onClick={() => onDelete(it)}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="ph-expList__meta">
              <span className="ph-expList__company">{it.company}</span>
              {it.location ? (
                <>
                  <span className="ph-expList__dot">•</span>
                  <span className="ph-expList__location">{it.location}</span>
                </>
              ) : null}
            </div>

            {formatDateRange(it.startDate, it.endDate, it.isCurrent) ? (
              <div className="ph-expList__dates">
                {formatDateRange(it.startDate, it.endDate, it.isCurrent)}
              </div>
            ) : null}

            {it.description ? (
              <p className="ph-expList__desc">{it.description}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
