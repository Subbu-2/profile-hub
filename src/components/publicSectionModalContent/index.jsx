import React, { useMemo } from "react";
import "./index.scss";

export default function PublicSectionModalContent({
  openSection,
  basics,
  lists,
  skills,
}) {
  const skillsArr = useMemo(() => normalizeArray(skills), [skills]);

  const recognitions = useMemo(() => normalizeList(lists, "recognitions"), [lists]);
  const projects = useMemo(() => normalizeList(lists, "projects"), [lists]);
  const experience = useMemo(() => normalizeList(lists, "experience"), [lists]);
  const education = useMemo(() => normalizeList(lists, "education"), [lists]);
  const certifications = useMemo(() => normalizeList(lists, "certifications"), [lists]);

  if (!openSection) return null;

  switch (openSection) {
    case "about":
      return (
        <Wrap>
          {basics?.bio ? (
            <div className="ph-publicTextBlock">{basics.bio}</div>
          ) : (
            <Empty text="No bio provided." />
          )}
        </Wrap>
      );

    case "skills":
      return (
        <Wrap>
          {skillsArr.length ? (
            <div className="ph-publicChips">
              {skillsArr.map((s, idx) => (
                <span key={`${s}-${idx}`} className="ph-publicChip">
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <Empty text="No skills added." />
          )}
        </Wrap>
      );

    case "recognitions":
      return renderList(recognitions, (r, i) => (
        <div className="ph-publicRow" key={safeKey(r, i, ["company", "description"])}>
          <div className="ph-publicRow__title">{r.company}</div>
          <div className="ph-publicRow__sub">{r.description}</div>
        </div>
      ));

    case "projects":
      return renderList(projects, (p, i) => (
        <div className="ph-publicRow" key={safeKey(p, i, ["title", "projectUrl"])}>
          <div className="ph-publicRow__title">{p.title}</div>

          {p.description ? (
            <div className="ph-publicRow__sub">{p.description}</div>
          ) : null}

          {p.projectUrl ? (
            <a
              className="ph-publicLink"
              href={p.projectUrl}
              target="_blank"
              rel="noreferrer"
            >
              {p.projectUrl}
            </a>
          ) : null}
        </div>
      ));

    case "experience":
      return renderList(experience, (e, i) => (
        <div className="ph-publicRow" key={safeKey(e, i, ["company", "title", "startDate"])}>
          <div className="ph-publicRow__title">
            {e.title} — {e.company}
          </div>

          {(e.startDate || e.endDate || e.isCurrent || e.location) ? (
            <div className="ph-publicRow__meta">
              {formatRange(e.startDate, e.endDate, e.isCurrent)}
              {e.location ? ` • ${e.location}` : ""}
            </div>
          ) : null}

          {e.description ? (
            <div className="ph-publicRow__sub">{e.description}</div>
          ) : null}
        </div>
      ));

    case "education":
      return renderList(education, (ed, i) => (
        <div className="ph-publicRow" key={safeKey(ed, i, ["school", "degree", "startYear"])}>
          <div className="ph-publicRow__title">
            {ed.school} — {ed.degree}
          </div>

          {(ed.startYear || ed.endYear || ed.isCurrent || ed.specialization || ed.gpa) ? (
            <div className="ph-publicRow__meta">
              {formatRange(ed.startYear, ed.endYear, ed.isCurrent)}
              {ed.specialization ? ` • ${ed.specialization}` : ""}
              {ed.gpa ? ` • GPA ${ed.gpa}` : ""}
            </div>
          ) : null}
        </div>
      ));

    case "certifications":
      return renderList(certifications, (c, i) => (
        <div className="ph-publicRow" key={safeKey(c, i, ["name", "issuer", "issueDate"])}>
          <div className="ph-publicRow__title">
            {c.name} — {c.issuer}
          </div>

          {formatCertDates(c.issueDate, c.expirationDate) ? (
            <div className="ph-publicRow__meta">
              {formatCertDates(c.issueDate, c.expirationDate)}
            </div>
          ) : null}

          {c.credentialUrl ? (
            <a
              className="ph-publicLink"
              href={c.credentialUrl}
              target="_blank"
              rel="noreferrer"
            >
              {c.credentialUrl}
            </a>
          ) : null}
        </div>
      ));

    default:
      return (
        <Wrap>
          <Empty text="Unknown section." />
        </Wrap>
      );
  }
}

/* ---------------- helpers ---------------- */

function Wrap({ children }) {
  return <div className="ph-publicModalContent">{children}</div>;
}

function Empty({ text }) {
  return <div className="ph-publicEmpty">{text}</div>;
}

// Accepts: array OR { items: array } OR null
function normalizeArray(maybe) {
  if (!maybe) return [];
  if (Array.isArray(maybe)) return maybe;
  if (Array.isArray(maybe.items)) return maybe.items;
  return [];
}

// lists can be: { projects: { items: [] } } OR { projects: [] } etc.
function normalizeList(lists, key) {
  if (!lists) return [];
  const section = lists[key];
  return normalizeArray(section);
}

function renderList(items, renderItem) {
  if (!items || items.length === 0) {
    return (
      <Wrap>
        <Empty text="Nothing here yet." />
      </Wrap>
    );
  }
  return <Wrap>{items.map(renderItem)}</Wrap>;
}

function safeKey(obj, idx, fields) {
  if (!obj || typeof obj !== "object") return `row-${idx}`;
  const parts = fields.map((f) => (obj[f] ? String(obj[f]) : "")).filter(Boolean);
  if (parts.length) return `${parts.join("|")}-${idx}`;
  return `row-${idx}`;
}

function formatRange(start, end, isCurrent) {
  const s = start || "";
  const e = isCurrent ? "Present" : (end || "");
  if (!s && !e) return "";
  if (s && e) return `${s} – ${e}`;
  return s || e;
}

function formatCertDates(issueDate, expirationDate) {
  const i = issueDate || "";
  const e = expirationDate || "";
  if (i && e) return `${i} – ${e}`;
  return i || e || "";
}
