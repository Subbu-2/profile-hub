import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkHealth } from "../../api/health";
import { logout } from "../../api/client";
import Card from "../../components/card";
import "./index.scss";

const Intro = ({ onLogin }) => {
  const [status, setStatus] = useState("checking"); // checking | up | down
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function runHealthCheck() {
    setStatus("checking");
    setError("");

    try {
      await checkHealth();
      setStatus("up");
    } catch (e) {
      setStatus("down");
      setError(e.message);
    }
  }

  useEffect(() => {
    try {
      logout();
    } catch (e) {
      // ignore
    }
    runHealthCheck();
  }, []);

  return (
    <div className="introPage">
      <div className="introGrid">
        {/* LEFT: Free hero */}
        <div className="introHero">
          <div className="introBrand">PROFILE HUB</div>

          <h1 className="introHeadline">Your profile, done right.</h1>
          <p className="introSub">
            Create a simple public page at <strong>/username</strong>. Share it
            when you want — clean, calm, and built for real people.
          </p>

          <div className="statusRow">
            {status === "checking" && (
              <div className="statusBadge">
                <span className="statusDot" />
                Checking…
              </div>
            )}

            {status === "up" && (
              <div className="statusBadge statusBadge--ok">
                <span className="statusDot" />
                Online
              </div>
            )}

            {status === "down" && (
              <div className="statusBadge statusBadge--down">
                <span className="statusDot" />
                Offline
              </div>
            )}

            {status === "down" && error && <div className="error">{error}</div>}
          </div>

          <div className="actionRow">
            {status === "up" ? (
              <button className="button" onClick={onLogin}>
                Get started
              </button>
            ) : (
              <button className="button" onClick={runHealthCheck}>
                Retry
              </button>
            )}

            <button className="button button--ghost" onClick={() => { navigate("/public/profilehub") }} type="button">
              View example
            </button>
          </div>

          <div className="trustLine">
            Simple by design • Private by default • Built for real people
          </div>
        </div>

        {/* RIGHT: Preview (Card accent) */}
        <div className="previewWrap">
          <Card title="Preview" subtitle="This is what a profile can look like">
            <div className="previewCardInner">
              <div className="previewTop">
                <div className="avatarDot" />
                <div>
                  <div className="previewName">Navya G.</div>
                  <div className="previewHandle">@navya</div>
                </div>
              </div>

              <div className="previewBio">
                Software Engineer • Loves clean systems • Building Profile Hub
              </div>

              <div className="previewMeta">
                <span className="pill">Public URL</span>
                <span className="pill">Fast</span>
                <span className="pill">Minimal</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Intro;
