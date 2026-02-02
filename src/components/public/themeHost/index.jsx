import React from "react";
import "./index.scss";

/**
 * ThemeHost
 * - Hardcoded for rollout: theme + accent
 * - Later: read from public profile config endpoint or settings
 *
 * data-theme: "singlepage" | "modal"
 * data-accent: "default" | "pink"
 */
const ThemeHost = ({ children }) => {
  // Hardcoded for now
  const theme = "singlepage";
  const accent = "default";

  return (
    <div className="ph-themeHost" data-theme={theme} data-accent={accent}>
      {children}
    </div>
  );
};

export default ThemeHost;
