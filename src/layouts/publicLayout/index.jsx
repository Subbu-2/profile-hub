import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ThemeHost from "../../components/public/ThemeHost";
import "./index.scss";

export default function PublicLayout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup");

  return (
    <ThemeHost>
      <div className="ph-publicLayout">
        {/* Header */}
        <header className="ph-publicLayout__header">
          <div className="ph-publicLayout__headerInner">
            <Link to="/" className="ph-publicLayout__brand">
              <span className="ph-publicLayout__logoDot" />
              <span className="ph-publicLayout__brandText">Profile Hub</span>
            </Link>

            {!isAuthPage ? (
              <nav className="ph-publicLayout__actions">
                <Link className="ph-publicLayout__cta" to="/signup">
                  Get yours
                </Link>
              </nav>
            ) : null}
          </div>
        </header>

        {/* Main */}
        <main className="ph-publicLayout__main">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="ph-publicLayout__footer">
          <div className="ph-publicLayout__footerInner">
            <div className="ph-publicLayout__muted">
              © {new Date().getFullYear()} Profile Hub
            </div>

            {!isAuthPage ? (
              <Link className="ph-publicLayout__link" to="/signup">
                Get yours
              </Link>
            ) : null}
          </div>
        </footer>
      </div>
    </ThemeHost>
  );
}
