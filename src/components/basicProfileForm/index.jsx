import React from "react";
import "./index.scss";

export const emptyBasicForm = {
  headline: "",
  location: "",
  bio: "",
  linkedinUrl: "",
  githubUrl: "",
  portfolioUrl: "",
  xUrl: "",
  contactEmail: "",
  contactPhone: "",
};

export function validateBasic(form) {
  const errs = {};

  // Keep required rules OFF for now (we’ll decide in validation phase)
  if (!form.headline.trim()) errs.headline = "Headline is required";

  // Email (if present)
  if (form.contactEmail.trim()) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail.trim());
    if (!ok) errs.contactEmail = "Enter a valid email";
  }

  // URL (if present) - minimal requirement: must be http(s)
  const urlKeys = ["linkedinUrl", "githubUrl", "portfolioUrl", "xUrl"];
  urlKeys.forEach((k) => {
    const v = form[k].trim();
    if (!v) return;
    let ok = true;
    try {
      const u = new URL(v);
      ok = u.protocol === "http:" || u.protocol === "https:";
    } catch {
      ok = false;
    }
    if (!ok) errs[k] = "Use a valid http(s) URL";
  });

  return errs;
}

export function toPutPayload(form) {
  return {
    bio: form.bio || "",
    contactEmail: form.contactEmail || "",
    contactPhone: form.contactPhone || "",
    githubUrl: form.githubUrl || "",
    headline: form.headline || "",
    linkedinUrl: form.linkedinUrl || "",
    location: form.location || "",
    portfolioUrl: form.portfolioUrl || "",
    xUrl: form.xUrl || "",
  };
}

export default function BasicProfilePanel({
  form,
  touched,
  errors,
  isBusy,
  onChangeField,
  onBlurField,
}) {

  return (
    <div className="ph-basicPanel">
      {/* Optional: error summary could go here later if you want */}

      <div className="ph-basicPanel__sectionTitle">Identity</div>
      <div className="ph-basicPanel__grid">
        <div className="ph-basicPanel__field">
          <label className="ph-basicPanel__label">Headline</label>
          <input
            className="ph-basicPanel__input"
            value={form.headline}
            onChange={(e) => onChangeField("headline", e.target.value)}
            onBlur={() => onBlurField("headline")}
            placeholder="Software Engineer • Go • AWS"
            disabled={isBusy}
          />
          {touched.headline && errors.headline ? (
            <div className="ph-basicPanel__errText">{errors.headline}</div>
          ) : null}
        </div>

        <div className="ph-basicPanel__field">
          <label className="ph-basicPanel__label">Location</label>
          <input
            className="ph-basicPanel__input"
            value={form.location}
            onChange={(e) => onChangeField("location", e.target.value)}
            onBlur={() => onBlurField("location")}
            placeholder="Peoria, IL"
            disabled={isBusy}
          />
          {touched.location && errors.location ? (
            <div className="ph-basicPanel__errText">{errors.location}</div>
          ) : null}
        </div>
      </div>

      <div className="ph-basicPanel__sectionTitle">About</div>
      <div className="ph-basicPanel__grid ph-basicPanel__grid--single">
        <div className="ph-basicPanel__field">
          <label className="ph-basicPanel__label">Bio</label>
          <textarea
            className="ph-basicPanel__textarea"
            value={form.bio}
            onChange={(e) => onChangeField("bio", e.target.value)}
            onBlur={() => onBlurField("bio")}
            placeholder="Short intro about you…"
            rows={5}
            disabled={isBusy}
          />
          {touched.bio && errors.bio ? (
            <div className="ph-basicPanel__errText">{errors.bio}</div>
          ) : null}
        </div>
      </div>

      <div className="ph-basicPanel__sectionTitle">Links</div>
      <div className="ph-basicPanel__grid">
        <div className="ph-basicPanel__field">
          <label className="ph-basicPanel__label">LinkedIn URL</label>
          <input
            className="ph-basicPanel__input"
            value={form.linkedinUrl}
            onChange={(e) => onChangeField("linkedinUrl", e.target.value)}
            onBlur={() => onBlurField("linkedinUrl")}
            placeholder="https://linkedin.com/in/…"
            disabled={isBusy}
          />
          {touched.linkedinUrl && errors.linkedinUrl ? (
            <div className="ph-basicPanel__errText">{errors.linkedinUrl}</div>
          ) : null}
        </div>

        <div className="ph-basicPanel__field">
          <label className="ph-basicPanel__label">GitHub URL</label>
          <input
            className="ph-basicPanel__input"
            value={form.githubUrl}
            onChange={(e) => onChangeField("githubUrl", e.target.value)}
            onBlur={() => onBlurField("githubUrl")}
            placeholder="https://github.com/…"
            disabled={isBusy}
          />
          {touched.githubUrl && errors.githubUrl ? (
            <div className="ph-basicPanel__errText">{errors.githubUrl}</div>
          ) : null}
        </div>

        <div className="ph-basicPanel__field">
          <label className="ph-basicPanel__label">Portfolio URL</label>
          <input
            className="ph-basicPanel__input"
            value={form.portfolioUrl}
            onChange={(e) => onChangeField("portfolioUrl", e.target.value)}
            onBlur={() => onBlurField("portfolioUrl")}
            placeholder="https://…"
            disabled={isBusy}
          />
          {touched.portfolioUrl && errors.portfolioUrl ? (
            <div className="ph-basicPanel__errText">{errors.portfolioUrl}</div>
          ) : null}
        </div>

        <div className="ph-basicPanel__field">
          <label className="ph-basicPanel__label">X URL</label>
          <input
            className="ph-basicPanel__input"
            value={form.xUrl}
            onChange={(e) => onChangeField("xUrl", e.target.value)}
            onBlur={() => onBlurField("xUrl")}
            placeholder="https://x.com/…"
            disabled={isBusy}
          />
          {touched.xUrl && errors.xUrl ? (
            <div className="ph-basicPanel__errText">{errors.xUrl}</div>
          ) : null}
        </div>
      </div>

      <div className="ph-basicPanel__sectionTitle">Contact</div>
      <div className="ph-basicPanel__grid">
        <div className="ph-basicPanel__field">
          <label className="ph-basicPanel__label">Contact Email</label>
          <input
            className="ph-basicPanel__input"
            value={form.contactEmail}
            onChange={(e) => onChangeField("contactEmail", e.target.value)}
            onBlur={() => onBlurField("contactEmail")}
            placeholder="name@email.com"
            disabled={isBusy}
          />
          {touched.contactEmail && errors.contactEmail ? (
            <div className="ph-basicPanel__errText">{errors.contactEmail}</div>
          ) : null}
        </div>

        <div className="ph-basicPanel__field">
          <label className="ph-basicPanel__label">Contact Phone</label>
          <input
            className="ph-basicPanel__input"
            value={form.contactPhone}
            onChange={(e) => onChangeField("contactPhone", e.target.value)}
            onBlur={() => onBlurField("contactPhone")}
            placeholder="+1 309 …"
            disabled={isBusy}
          />
          {touched.contactPhone && errors.contactPhone ? (
            <div className="ph-basicPanel__errText">{errors.contactPhone}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}