import React from "react";
import "./index.scss";

function formatYM(ym) {
  if (!ym || typeof ym !== "string") return "";
  const [y, m] = ym.split("-");
  const year = Number(y);
  const month = Number(m);
  if (!year || !month) return ym;

  const d = new Date(year, month - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

function certDates(issueDate, expirationDate) {
  const issued = formatYM(issueDate);
  const exp = formatYM(expirationDate);

  if (issued && exp) return `Issued ${issued} • Expires ${exp}`;
  if (issued) return `Issued ${issued}`;
  if (exp) return `Expires ${exp}`;
  return "";
}

export default function PublicCertificationsList({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="ph-cert">
      {items.map((c, idx) => {
        const dates = certDates(c.issueDate, c.expirationDate);

        return (
          <div key={`${c.name || "cert"}-${c.issuer || idx}-${idx}`} className="ph-cert__item">
            <div className="ph-cert__top">
              <div className="ph-cert__name">{c.name}</div>
              {c.issuer ? <div className="ph-cert__issuer">{c.issuer}</div> : null}
            </div>

            {dates ? <div className="ph-cert__dates">{dates}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
