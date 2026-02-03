import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./index.scss";

import BasicProfilePanel, {
  emptyBasicForm,
  toPutPayload,
  validateBasic,
} from "../../components/basicProfileForm";

import { getBasicProfile, putBasicProfile } from "../../api/basicProfileApi";

const TABS = [
  { key: "basic", label: "Basic Details", enabled: true },
  { key: "password", label: "Change Password", enabled: false },
];

const ALL_BASIC_TOUCHED = {
  headline: true,
  location: true,
  bio: true,
  linkedinUrl: true,
  githubUrl: true,
  portfolioUrl: true,
  xUrl: true,
  contactEmail: true,
  contactPhone: true,
};

export default function ProfileSettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [basicLoading, setBasicLoading] = useState(false);
  const [basicSaving, setBasicSaving] = useState(false);
  const [basicError, setBasicError] = useState("");

  const [basicForm, setBasicForm] = useState(emptyBasicForm);
  const [basicInitial, setBasicInitial] = useState(emptyBasicForm);
  const [basicTouched, setBasicTouched] = useState({});

  const activeTab = useMemo(() => {
    const t = (searchParams.get("tab") || "basic").toLowerCase();
    return TABS.some((x) => x.key === t) ? t : "basic";
  }, [searchParams]);

  function setTab(key) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", key);
      return next;
    });
  }

  // Validation (RecognitionModal style)
  const basicErrors = useMemo(() => validateBasic(basicForm), [basicForm]);
  const basicCanSubmit =
    Object.keys(basicErrors).length === 0 && !basicSaving && !basicLoading;

  const basicDirty = useMemo(() => {
    return (
      JSON.stringify(toPutPayload(basicForm)) !==
      JSON.stringify(toPutPayload(basicInitial))
    );
  }, [basicForm, basicInitial]);

  // Load on Basic tab
  useEffect(() => {
    if (activeTab !== "basic") return;

    let cancelled = false;

    async function load() {
      setBasicError("");
      setBasicLoading(true);

      try {
        const data = await getBasicProfile();
        const normalized = { ...emptyBasicForm, ...(data || {}) };

        if (cancelled) return;
        setBasicForm(normalized);
        setBasicInitial(normalized);
        setBasicTouched({});
      } catch (e) {
        if (cancelled) return;
        setBasicError(e?.message || "Failed to load basic profile.");
      } finally {
        if (!cancelled) setBasicLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  function setBasicField(name, value) {
    setBasicForm((p) => ({ ...p, [name]: value }));
  }

  function markBasicTouched(name) {
    setBasicTouched((p) => ({ ...p, [name]: true }));
  }

  async function onSaveBasic() {
    // Mark all fields touched (so errors appear), like RecognitionModal
    setBasicTouched(ALL_BASIC_TOUCHED);

    const errs = validateBasic(basicForm);
    if (Object.keys(errs).length > 0) return;

    setBasicSaving(true);
    setBasicError("");

    try {
      await putBasicProfile(toPutPayload(basicForm));
      setBasicInitial(basicForm);
      setBasicTouched({});
    } catch (e) {
      setBasicError(e?.message || "Failed to update basic profile.");
    } finally {
      setBasicSaving(false);
    }
  }

  function onCancelBasic() {
    setBasicForm(basicInitial);
    setBasicTouched({});
    setBasicError("");
  }

  const activeMeta = TABS.find((t) => t.key === activeTab);
  const navigate = useNavigate();

  return (
    <div className="ph-page">
      <div className="ph-settings">
        <aside className="ph-settings__nav">
          <div className="ph-settings__navTitle">
            <div className="ph-settings__navTitle_left">Settings</div>
            <div className="ph-settings__navTitle_right">
              <button className="ph-settings__back" onClick={() => { navigate("/profile/edit") }} type="button">
                back
              </button>
            </div>
          </div>

          <div className="ph-settings__navList">
            {TABS.map((t) => {
              const isActive = t.key === activeTab;
              const cls = [
                "ph-settings__navItem",
                isActive ? "is-active" : "",
                !t.enabled ? "is-disabled" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <button
                  key={t.key}
                  type="button"
                  className={cls}
                  onClick={() => t.enabled && setTab(t.key)}
                  disabled={!t.enabled}
                >
                  {t.label}
                  {!t.enabled ? (
                    <span className="ph-settings__soon">Soon</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </aside>

        <main className="ph-settings__content">
          <div className="ph-settings__contentHeader">
            <h1 className="ph-settings__title">
              {activeMeta?.label || "Settings"}
            </h1>
            <p className="ph-settings__subtitle">
              {activeTab === "basic"
                ? "Update your public profile basics and contact links."
                : "Password settings will be available here soon."}
            </p>
          </div>

          <div className="ph-settings__panel">
            {activeTab === "basic" ? (
              <>
                {basicError ? (
                  <div className="ph-settings__error">{basicError}</div>
                ) : null}

                <BasicProfilePanel
                  form={basicForm}
                  touched={basicTouched}
                  errors={basicErrors}
                  isBusy={basicLoading || basicSaving}
                  onChangeField={setBasicField}
                  onBlurField={markBasicTouched}
                />

                {basicLoading ? (
                  <div className="ph-settings__hint">Loading…</div>
                ) : null}
              </>
            ) : (
              <div className="ph-settings__placeholder">
                Change Password panel will live here later.
              </div>
            )}
          </div>

          <div className="ph-settings__actions">
            <button
              className="ph-btn button button-danger"
              type="button"
              onClick={onCancelBasic}
              disabled={
                activeTab !== "basic" || basicSaving || basicLoading || !basicDirty
              }
            >
              Cancel
            </button>

            <button
              className="ph-btn button"
              type="button"
              onClick={onSaveBasic}
              disabled={
                activeTab !== "basic" ||
                !basicDirty ||
                !basicCanSubmit
              }
            >
              {basicSaving ? "Saving…" : "Save"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
