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
        <li>View Your Public Profile </li>
        <li>Update your bio and details by clicking on {user.username} on top right</li>
      </ul>

      <p className="helper">You’ll soon be able to:</p>

      <ul className="helper-list">
        <li>Change password</li>
        <li>Update themes</li>
        <li>Replace your resume with your ProfileHub</li>
      </ul>

      <p className="helper helper--muted">Thanks for being early 🙌 </p>
      <p className="helper helper--muted">
        <a className="helper helper--muted"
          href={`mailto:subbusubramanyam92@gmail.com?subject=Profile Hub suggestion&body=Page: /profile/edit%0A%0ASuggestion:`}
        >
          Provide suggestion at Send it to us
        </a>
      </p>
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
