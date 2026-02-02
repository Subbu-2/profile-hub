import React from "react";
import "./index.scss";

function cleanUrl(url) {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "");
}

function LinkRow({ label, href }) {
  if (!href) return null;

  return (
    <a className="ph-proj__link" href={href} target="_blank" rel="noreferrer">
      <span className="ph-proj__linkLabel">{label}</span>
      <span className="ph-proj__linkHint">{cleanUrl(href)}</span>
    </a>
  );
}

function splitTechStack(techStack) {
  if (!techStack || typeof techStack !== "string") return [];
  return techStack
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function PublicProjectList({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="ph-proj">
      {items.map((p, idx) => {
        const tech = splitTechStack(p.techStack);

        return (
          <div key={`${p.title || "project"}-${idx}`} className="ph-proj__item">
            <div className="ph-proj__title">{p.title}</div>

            {p.summary ? (
              <div className="ph-proj__summary">{p.summary}</div>
            ) : null}

            {p.description ? (
              <div className="ph-proj__desc">{p.description}</div>
            ) : null}

            {p.repoUrl || p.demoUrl ? (
              <div className="ph-proj__links">
                <LinkRow label="Repo" href={p.repoUrl} />
                <LinkRow label="Demo" href={p.demoUrl} />
              </div>
            ) : null}

            {tech.length > 0 ? (
              <div className="ph-proj__tech">
                {tech.map((t, i) => (
                  <span key={`${t}-${i}`} className="ph-proj__pill">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}