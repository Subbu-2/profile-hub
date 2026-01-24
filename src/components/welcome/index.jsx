import React, { useEffect, useState } from "react";
import { authCheck } from "../../api/auth";
import { logout } from "../../api/client";
import { useNavigate } from "react-router-dom";
import Card from "../ui/card";
import "./index.scss"

const Welcome = ({ onLogout }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking"); // checking | ok | failed

  useEffect(() => {
    async function verify() {
      try {
        await authCheck();
        setStatus("ok");
      } catch (e) {
        logout();
        navigate("/login", { replace: true });
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

<p className="helper">
  You’ll soon be able to:
</p>

<ul className="helper-list">
  <li>Build your public profile</li>
  <li>Share it via a clean URL</li>
  <li>Control visibility and updates</li>
</ul>

<p className="helper helper--muted">
  Thanks for being early 🙌
</p>
      <button
        className="button button-danger"
        onClick={() => {
          logout();
          onLogout();
        }}
      >
        Logout
      </button>
    </Card>

  );
};

export default Welcome;
