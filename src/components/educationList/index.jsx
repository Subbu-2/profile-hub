import React from "react";
import "./index.scss";

function formatYearRange(startYear, endYear, isCurrent) {
  const start = startYear || "";
  const end = isCurrent ? "Present" : endYear || "";

  if (!start && !end) return "";
  if (!start) return end;
  if (!end) return start;

  return `${start} - ${end}`;
}

export default function EducationList({ items, onEdit, onDelete, onMoveUp, onMoveDown }) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="ph-eduList">
      {items.map((it, idx) => (
        <li key={it.educationId} className="ph-eduList__item">
          <div className="ph-eduList__main">
            {/* Top row */}
            <div className="ph-eduList__topRow">
              <div className="ph-eduList__title">{it.school}</div>

              <div className="ph-eduList__actions">
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
                  className="ph-eduList__btn"
                  onClick={() => onEdit(it)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="ph-eduList__btn ph-eduList__btn--danger"
                  onClick={() => onDelete(it)}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Degree / specialization / GPA */}
            <div className="ph-eduList__meta">
              <span className="ph-eduList__degree">{it.degree}</span>

              {it.specialization ? (
                <>
                  <span className="ph-eduList__dot">•</span>
                  <span className="ph-eduList__specialization">
                    {it.specialization}
                  </span>
                </>
              ) : null}

              {it.gpa ? (
                <>
                  <span className="ph-eduList__dot">•</span>
                  <span className="ph-eduList__gpa">GPA {it.gpa}</span>
                </>
              ) : null}
            </div>

            {/* Year range */}
            {formatYearRange(it.startYear, it.endYear, it.isCurrent) ? (
              <div className="ph-eduList__dates">
                {formatYearRange(it.startYear, it.endYear, it.isCurrent)}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}