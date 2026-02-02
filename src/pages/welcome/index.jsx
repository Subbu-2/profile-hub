import React, { useEffect, useState } from "react";
import { authCheck } from "../../api/auth";
import { logout, getUser } from "../../api/client";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card";
import "./index.scss";

const Welcome = ({ onLogout }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking"); // checking | ok | failed
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function verify() {
      try {
        await authCheck();
        setStatus("ok");
        setUser(getUser());
      } catch (e) {
        logout();
        navigate("/logout", { replace: true });
      }
    }

    verify();
  }, [navigate]);

  if (status === "checking") {
    return <p>Verifying session…</p>;
  }
  return (
    <Card title="Welcome to Profile Hub 👋" subtitle="Your account is ready.">
      <p className="helper">
        The profile experience is currently under development.
      </p>

      <p className="helper">You’ll currently be able to:</p>

      <ul className="helper-list">
        <li>Build your public profile</li>
      </ul>

      <p className="helper">You’ll soon be able to:</p>

      <ul className="helper-list">
        <li>Share it via a clean URL</li>
        <li>Your Public Profile View Is still underway.....</li>
      </ul>

      <p className="helper helper--muted">Thanks for being early 🙌</p>
      <button
        className="button button-primary"
        onClick={() => {
          navigate("/profile/edit");
        }}
      >
        Go to Your Profile
      </button>
    </Card>
  );
};

export default Welcome;
