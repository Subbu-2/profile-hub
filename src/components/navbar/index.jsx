import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import { getUser, logout } from "../../api/client";

const Navbar = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup");
  const user = getUser();
  const navigate = useNavigate();

  return (
    <header className="ph-nav">
      <div className="ph-nav__inner">
        <Link to="/" className="ph-nav__brand">
          <span className="ph-nav__logoDot" />
          <span className="ph-nav__brandText">Profile Hub</span>
        </Link>

        <nav className="ph-nav__actions">
          {!user && !isAuthPage ? (
            <>
              <Link className="ph-nav__link" to="/login">
                Sign in
              </Link>
              <Link className="ph-nav__button" to="/signup">
                Sign up
              </Link>
            </>
          ) : user ? (
            <div className="ph-nav__userBlock">
              <span className="ph-nav__user">@{user.username}</span>
              <button
                className="button button-danger"
                onClick={() => {
                  logout();
                  navigate("/", { replace: true });
                }}
              >
                Logout
              </button>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
