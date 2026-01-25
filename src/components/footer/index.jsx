import { Link } from "react-router-dom";
import "./index.scss";

const Footer = () => {
  return (
    <footer className="ph-footer">
      <div className="ph-footer__inner">
        <span className="ph-footer__copy">
          © {new Date().getFullYear()} Profile Hub
        </span>

        <nav className="ph-footer__links" aria-label="Legal">
          <Link className="ph-link" to="/terms">
            Terms
          </Link>
          <span className="ph-footer__sep">·</span>
          <Link className="ph-link" to="/privacy">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;