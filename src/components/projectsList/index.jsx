import React from "react";
import "./index.scss";
import ItemActions from "../itemActions";

export default function ProjectsList({
  items,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="ph-projList">
      {items.map((it, idx) => (
        <li key={it.projectId} className="ph-projList__item">
          <div className="ph-projList__main">
            <div className="ph-projList__topRow">
              <div className="ph-projList__title">{it.title}</div>

              <ItemActions
                onMoveUp={onMoveUp ? () => onMoveUp(it) : undefined}
                onMoveDown={onMoveDown ? () => onMoveDown(it) : undefined}
                onEdit={onEdit ? () => onEdit(it) : undefined}
                onDelete={onDelete ? () => onDelete(it) : undefined}
                disableUp={idx === 0}
                disableDown={idx === items.length - 1}
              />
            </div>

            {it.summary ? (
              <div className="ph-projList__summary">{it.summary}</div>
            ) : null}

            {it.techStack ? (
              <div className="ph-projList__meta">
                <span className="ph-projList__pill">Tech</span>
                <span className="ph-projList__metaText">{it.techStack}</span>
              </div>
            ) : null}

            {(it.demoUrl || it.repoUrl) ? (
              <div className="ph-projList__links">
                {it.demoUrl ? (
                  <a
                    className="ph-projList__link"
                    href={it.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo
                  </a>
                ) : null}
                {it.repoUrl ? (
                  <a
                    className="ph-projList__link"
                    href={it.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Repo
                  </a>
                ) : null}
              </div>
            ) : null}

            {it.description ? (
              <div className="ph-projList__desc">{it.description}</div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
