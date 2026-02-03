import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchPublicProfile } from "../../api/publicProfile";

import PublicSectionCard from "../../components/public/publicSectionCard";
import PublicSkeleton from "../../components/public/publicSkeleton";
import PublicErrorCard from "../../components/public/publicErrorCard";

import PublicLinkItem from "../../components/public/publicLinkItem";
import PublicSkillsPills from "../../components/public/publicSkillsPills";

import PublicRecognitionList from "../../components/public/publicRecognitionList";
import PublicProjectList from "../../components/public/publicProjectList";
import PublicExperienceList from "../../components/public/publicExperienceList";
import PublicEducationList from "../../components/public/publicEducationList";
import PublicCertificationsList from "../../components/public/publicCertificationsList";

import PublicSectionModal from "../../components/publicSectionModal";
import PublicSectionModalContent from "../../components/publicSectionModalContent";

import {
  selectPublicBasics,
  selectPublicLists,
  selectPublicSkills,
  selectPublicTheme,
  selectPreviews,
} from "./publicSelectors";

import "./index.scss";

function EmptyState({ text }) {
  return <div className="ph-publicProfile__empty">{text}</div>;
}

function initialsFrom(displayName, username) {
  const n = (displayName || "").trim();
  if (n) {
    const parts = n.split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("");
  }
  return (username || "").slice(0, 2).toUpperCase();
}

function getSectionTitle(key) {
  switch (key) {
    case "about":
      return "About";
    case "skills":
      return "Skills";
    case "recognitions":
      return "Recognitions";
    case "projects":
      return "Projects";
    case "experience":
      return "Experience";
    case "education":
      return "Education";
    case "certifications":
      return "Certifications";
    default:
      return "Details";
  }
}

export default function PublicProfilePage() {
  const { username } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  // dev-only theme toggles
  const isDev = import.meta.env.DEV;
  const [devTheme, setDevTheme] = useState("singlepage");
  const [devAccent, setDevAccent] = useState("default");

  // modal section key (Phase 4B)
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPublicProfile(username);
        if (isMounted) setProfile(data);
      } catch (e) {
        if (isMounted)
        e?.message === "Profile not found (HTTP 404)" ? setError("NOT_FOUND") : setError(e?.message || "FETCH_FAILED");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (username) load();
    else {
      setError("NOT_FOUND");
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [username]);

  const isNotFound = !loading && error === "NOT_FOUND";
  const isError = !loading && !!error && error !== "NOT_FOUND";
  const isReady = !loading && !error && !!profile;

  // selectors (safe even if profile is null IF your selectors guard; otherwise keep isReady gating)
  const basics = useMemo(() => selectPublicBasics(profile), [profile]);
  const lists = useMemo(() => selectPublicLists(profile), [profile]);
  const skills = useMemo(() => selectPublicSkills(profile), [profile]); // treat as array
  const resolvedTheme = useMemo(() => selectPublicTheme(profile), [profile]);
  const previews = useMemo(() => selectPreviews(profile), [profile]);

  const themeCfg = useMemo(() => {
    const fallback = { theme: "singlepage", accent: "default" };
    if (isDev) return { theme: devTheme, accent: devAccent };
    return resolvedTheme || fallback;
  }, [isDev, devTheme, devAccent, resolvedTheme]);

  const isModalTheme = themeCfg.theme === "modal";

  const initials = initialsFrom(basics?.displayName, profile?.user?.username);

  // full lists (assuming your selectors normalize to arrays)
  const recognitions = lists?.recognitions || [];
  const projects = lists?.projects || [];
  const experience = lists?.experience || [];
  const education = lists?.education || [];
  const certifications = lists?.certifications || [];

  // previews from selector
  const experiencePreview = previews?.experiencePreview || [];
  const projectsPreview = previews?.projectsPreview || [];
  const educationPreview = previews?.educationPreview || [];
  const certificationsPreview = previews?.certificationsPreview || [];
  const recognitionsPreview = previews?.recognitionsPreview || [];

  function openModal(sectionKey) {
    setOpenSection(sectionKey);
  }

  function closeModal() {
    setOpenSection(null);
  }

  return (
    <div
      className="ph-publicProfile ph-publicTheme"
      data-theme={themeCfg.theme}
      data-accent={themeCfg.accent}
    >
      {/* {isDev ? (
        <div className="ph-publicProfile__devBar">
          <button
            type="button"
            className="ph-publicProfile__devBtn"
            onClick={() =>
              setDevTheme((t) => (t === "singlepage" ? "modal" : "singlepage"))
            }
          >
            Theme: {devTheme}
          </button>

          <button
            type="button"
            className="ph-publicProfile__devBtn"
            onClick={() => setDevAccent((a) => (a === "default" ? "pink" : "default"))}
          >
            Accent: {devAccent}
          </button>
        </div>
      ) : null} */}

      {/* LOADING */}
      {loading ? (
        <div className="ph-publicProfile__hero">
          <div className="ph-publicProfile__heroInner">
            <PublicSkeleton lines={3} />
          </div>
        </div>
      ) : null}

      {/* NOT FOUND */}
      {isNotFound ? (
        <div className="ph-publicProfile__state">
          <PublicErrorCard
            title="User not found"
            text="This profile doesn’t exist or isn’t public."
          />
        </div>
      ) : null}

      {/* GENERIC ERROR */}
      {isError ? (
        <div className="ph-publicProfile__state">
          <PublicErrorCard title="Something went wrong" text="Please try again later." />
        </div>
      ) : null}

      {/* SUCCESS */}
      {isReady ? (
        <>
          <div className="ph-publicProfile__hero">
            <div className="ph-publicProfile__heroInner">
              <div className="ph-publicProfile__identity">
                <div className="ph-publicProfile__avatar" aria-hidden="true">
                  <span className="ph-publicProfile__avatarInitials">{initials}</span>
                </div>

                <div className="ph-publicProfile__who">
                  <h1 className="ph-publicProfile__name">{basics.displayName}</h1>

                  {basics.headline ? (
                    <div className="ph-publicProfile__headline">{basics.headline}</div>
                  ) : null}

                  {basics.location ? (
                    <div className="ph-publicProfile__meta">{basics.location}</div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="ph-publicProfile__grid">
            <div className="ph-publicProfile__left">
              <PublicSectionCard title="About">
                {basics.bio ? (
                  <div className="ph-publicProfile__bio">{basics.bio}</div>
                ) : (
                  <EmptyState text="No bio added yet." />
                )}
              </PublicSectionCard>

              <PublicSectionCard title="Experience">
                {isModalTheme ? (
                  <>
                    {experiencePreview.length > 0 ? (
                      <PublicExperienceList items={experiencePreview} />
                    ) : (
                      <EmptyState text="No experience added yet." />
                    )}

                    {experience.length > 2 ? (
                      <div className="ph-publicProfile__viewAllRow">
                        <button
                          type="button"
                          className="ph-publicProfile__viewAll"
                          onClick={() => openModal("experience")}
                        >
                          View all
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : experience.length > 0 ? (
                  <PublicExperienceList items={experience} />
                ) : (
                  <EmptyState text="No experience added yet." />
                )}
              </PublicSectionCard>

              <PublicSectionCard title="Projects">
                {isModalTheme ? (
                  <>
                    {projectsPreview.length > 0 ? (
                      <PublicProjectList items={projectsPreview} />
                    ) : (
                      <EmptyState text="No projects added yet." />
                    )}

                    {projects.length > 2 ? (
                      <div className="ph-publicProfile__viewAllRow">
                        <button
                          type="button"
                          className="ph-publicProfile__viewAll"
                          onClick={() => openModal("projects")}
                        >
                          View all
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : projects.length > 0 ? (
                  <PublicProjectList items={projects} />
                ) : (
                  <EmptyState text="No projects added yet." />
                )}
              </PublicSectionCard>

              <PublicSectionCard title="Education">
                {isModalTheme ? (
                  <>
                    {educationPreview.length > 0 ? (
                      <PublicEducationList items={educationPreview} />
                    ) : (
                      <EmptyState text="No education added yet." />
                    )}

                    {education.length > 2 ? (
                      <div className="ph-publicProfile__viewAllRow">
                        <button
                          type="button"
                          className="ph-publicProfile__viewAll"
                          onClick={() => openModal("education")}
                        >
                          View all
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : education.length > 0 ? (
                  <PublicEducationList items={education} />
                ) : (
                  <EmptyState text="No education added yet." />
                )}
              </PublicSectionCard>

              <PublicSectionCard title="Certifications">
                {isModalTheme ? (
                  <>
                    {certificationsPreview.length > 0 ? (
                      <PublicCertificationsList items={certificationsPreview} />
                    ) : (
                      <EmptyState text="No certifications added yet." />
                    )}

                    {certifications.length > 2 ? (
                      <div className="ph-publicProfile__viewAllRow">
                        <button
                          type="button"
                          className="ph-publicProfile__viewAll"
                          onClick={() => openModal("certifications")}
                        >
                          View all
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : certifications.length > 0 ? (
                  <PublicCertificationsList items={certifications} />
                ) : (
                  <EmptyState text="No certifications added yet." />
                )}
              </PublicSectionCard>

              <PublicSectionCard title="Recognitions">
                {isModalTheme ? (
                  <>
                    {recognitionsPreview.length > 0 ? (
                      <PublicRecognitionList items={recognitionsPreview} />
                    ) : (
                      <EmptyState text="No recognitions added yet." />
                    )}

                    {recognitions.length > 2 ? (
                      <div className="ph-publicProfile__viewAllRow">
                        <button
                          type="button"
                          className="ph-publicProfile__viewAll"
                          onClick={() => openModal("recognitions")}
                        >
                          View all
                        </button>
                      </div>
                    ) : null}
                  </>
                ) : recognitions.length > 0 ? (
                  <PublicRecognitionList items={recognitions} />
                ) : (
                  <EmptyState text="No recognitions added yet." />
                )}
              </PublicSectionCard>

              {/* modal (Phase 4B-2) */}
              <PublicSectionModal
                isOpen={!!openSection}
                title={getSectionTitle(openSection)}
                onClose={closeModal}
              >
                <PublicSectionModalContent
                  openSection={openSection}
                  basics={basics}
                  lists={lists}
                  skills={skills} // pass array consistently
                />
              </PublicSectionModal>
            </div>

            <div className="ph-publicProfile__right">
              <PublicSectionCard title="Links">
                {basics?.links?.linkedinUrl ||
                basics?.links?.githubUrl ||
                basics?.links?.portfolioUrl ||
                basics?.links?.xUrl ? (
                  <div className="ph-publicProfile__linkList">
                    <PublicLinkItem label="LinkedIn" href={basics.links.linkedinUrl} />
                    <PublicLinkItem label="GitHub" href={basics.links.githubUrl} />
                    <PublicLinkItem label="Portfolio" href={basics.links.portfolioUrl} />
                    <PublicLinkItem label="X" href={basics.links.xUrl} />
                  </div>
                ) : (
                  <EmptyState text="No links added yet." />
                )}
              </PublicSectionCard>

              <PublicSectionCard title="Skills">
                {skills?.length > 0 ? (
                  <PublicSkillsPills items={skills} />
                ) : (
                  <EmptyState text="No skills added yet." />
                )}
              </PublicSectionCard>

              <PublicSectionCard title="Contact">
                {basics?.contact?.email || basics?.contact?.phone ? (
                  <div className="ph-publicProfile__contact">
                    {basics.contact.email ? (
                      <a
                        className="ph-publicProfile__contactItem"
                        href={`mailto:${basics.contact.email}`}
                      >
                        {basics.contact.email}
                      </a>
                    ) : null}

                    {basics.contact.phone ? (
                      <a
                        className="ph-publicProfile__contactItem"
                        href={`tel:${basics.contact.phone}`}
                      >
                        {basics.contact.phone}
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <EmptyState text="No contact info." />
                )}
              </PublicSectionCard>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
