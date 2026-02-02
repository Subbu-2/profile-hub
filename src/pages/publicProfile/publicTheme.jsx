/**
 * Phase 4A: hardcoded theme choices.
 * Later: this will read from profile.theme or a settings endpoint.
 */
export function resolvePublicTheme(/* profile */) {
  return {
    theme: "singlepage", // "singlepage" | "modal"
    accent: "default", // "default" | "pink"
  };
}
