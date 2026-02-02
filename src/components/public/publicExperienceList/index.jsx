import React from "react";
import "./index.scss";

function formatYM(ym) {
  // ym: "2023-06"
  if (!ym || typeof ym !== "string") return "";
  const [y, m] = ym.split("-");
  const year = Number(y);
  const month = Number(m);

  if (!year || !month) return ym;

  const d = new Date(year, month - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

function rangeText(startDate, endDate, isCurrent) {
  const start = formatYM(startDate);
  const end = isCurrent ? "Present" : formatYM(endDate);
  if (!start && !end) return "";
  if (start && !end) return start;
  if (!start && end) return end;
  return `${start} — ${end}`;
}

export default function PublicExperienceList({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="ph-exp">
      {items.map((e, idx) => {
        const when = rangeText(e.startDate, e.endDate, e.isCurrent);

        return (
          <div key={`${e.company || "exp"}-${e.title || idx}-${idx}`} className="ph-exp__item">
            <div className="ph-exp__top">
              <div className="ph-exp__title">{e.title}</div>
              {when ? <div className="ph-exp__when">{when}</div> : null}
            </div>

            <div className="ph-exp__mid">
              <div className="ph-exp__company">{e.company}</div>
              {e.location ? <div className="ph-exp__loc">{e.location}</div> : null}
            </div>

            {e.description ? (
              <div className="ph-exp__desc">{e.description}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}