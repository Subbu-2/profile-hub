import { Link } from "react-router-dom";
import "./index.scss";

export default function NotFoundPage() {
  return (
    <div className="ph-notFound">
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>The page you’re looking for doesn’t exist.</p>
      <p>Note: If you are trying to access your public page and seeing page try /public followed by username.</p>
      <div className="ph-notFound__actions">
        <Link to="/" className="ph-btn">Go Home</Link>
      </div>
    </div>
  );
}
