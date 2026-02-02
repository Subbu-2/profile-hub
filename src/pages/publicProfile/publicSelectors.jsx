function asString(v) {
  return typeof v === "string" ? v : "";
}

function asArray(v) {
  return Array.isArray(v) ? v : [];
}

function asBool(v) {
  return typeof v === "boolean" ? v : false;
}

function listItems(v) {
  // supports:
  // - [] (already array)
  // - { items: [...] }
  // - null/undefined
  if (Array.isArray(v)) return v;
  if (v && Array.isArray(v.items)) return v.items;
  return [];
}

/**
 * UI-ready selectors for the public profile contract.
 * These never throw and always return safe defaults.
 */
export function selectPublicBasics(profile) {
  const user = profile?.user || {};
  const p = profile?.profile || {};

  return {
    username: asString(user.username),
    displayName: asString(user.displayName) || asString(user.username),
    headline: asString(p.headline),
    bio: asString(p.bio),
    location: asString(p.location),

    links: {
      linkedinUrl: asString(p.linkedinUrl),
      githubUrl: asString(p.githubUrl),
      portfolioUrl: asString(p.portfolioUrl),
      xUrl: asString(p.xUrl),
    },

    contact: {
      email: asString(p.contactEmail),
      phone: asString(p.contactPhone),
    },
  };
}

/**
 * Lists (full) — still not rendered in Phase 2B, just prepared.
 */
export function selectPublicLists(profile) {
  return {
    experience: listItems(profile?.experience),
    education: listItems(profile?.education),
    certifications: listItems(profile?.certifications),
    projects: listItems(profile?.projects),
    recognitions: listItems(profile?.recognitions),
  };
}

export function selectPublicSkills(profile) {
  // skills could be singleton string list or object, depending on your contract
  // keep it flexible: if profile.skills.items exists, use it, else if array, use it, else [].
  const s = profile?.skills;

  if (Array.isArray(s)) return s;
  if (Array.isArray(s?.items)) return s.items;
  if (Array.isArray(s?.skills)) return s.skills;

  return [];
}

/**
 * Theme settings (future): we hardcode defaults now.
 * Later this reads from profile.theme or profile.publicSettings endpoint.
 */
export function selectPublicTheme(profile) {
  // hardcoded defaults for now
  return {
    theme: "singlepage", // or "modal"
    accent: "default", // or "pink"
    // capability flags for future themes
    supportsAccentOverride: true,
  };
}

export function selectPreviews(profile) {
  const lists = selectPublicLists(profile);

  return {
    experiencePreview: lists.experience.slice(0, 2),
    projectsPreview: lists.projects.slice(0, 2),
    educationPreview: lists.education.slice(0, 2),
    certificationsPreview: lists.certifications.slice(0, 2),
    recognitionsPreview: lists.recognitions.slice(0, 2),
  };
}