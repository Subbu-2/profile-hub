import React from "react";
import "./index.scss";

function yearRange(startYear, endYear, isCurrent) {
  const s = startYear || "";
  const e = isCurrent ? "Present" : (endYear || "");
  if (!s && !e) return "";
  if (s && !e) return s;
  if (!s && e) return e;
  return `${s} — ${e}`;
}

export default function PublicEducationList({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="ph-edu">
      {items.map((e, idx) => {
        const when = yearRange(e.startYear, e.endYear, e.isCurrent);

        return (
          <div key={`${e.school || "edu"}-${e.degree || idx}-${idx}`} className="ph-edu__item">
            <div className="ph-edu__top">
              <div className="ph-edu__school">{e.school}</div>
              {when ? <div className="ph-edu__when">{when}</div> : null}
            </div>

            <div className="ph-edu__degreeRow">
              <div className="ph-edu__degree">{e.degree}</div>
              {e.specialization ? (
                <div className="ph-edu__spec">• {e.specialization}</div>
              ) : null}
            </div>

            {e.gpa ? <div className="ph-edu__gpa">GPA: {e.gpa}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
