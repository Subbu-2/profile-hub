import React from "react";
import "./index.scss";

export default function SkillsSection({
  value,
  onChange,
  loading,
  saving,
  errMsg,
  okMsg,
}) {
  return (
    <div className="ph-skills">
      <p className="ph-skills__hint">
        Enter skills separated by commas or new lines.
      </p>

      {loading ? (
        <div className="ph-profileEdit__muted">Loading...</div>
      ) : (
        <textarea
          className="ph-skills__textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Go, React, AWS, DynamoDB..."
          rows={3}
        />
      )}

      {errMsg && <div className="ph-profileEdit__error">{errMsg}</div>}
      {/* {okMsg && <div className="ph-profileEdit__success">{okMsg}</div>} */}
      {saving && <div className="ph-profileEdit__muted">Saving...</div>}
    </div>
  );
}