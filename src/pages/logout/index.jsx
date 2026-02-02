import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card";
import "./index.scss";

const Logout = () => {
  const navigate = useNavigate();

  return (
    <Card title="You’re logged out" subtitle="Your session has ended safely.">
      <div className="logout">
        <p className="helper">
          Thanks for using Profile Hub. You can sign in again anytime.
        </p>

        <div className="logout__actions">
          <button className="button" onClick={() => navigate("/login")}>
            Sign in again
          </button>

          <button
            className="button button-secondary"
            onClick={() => navigate("/")}
          >
            Go to home
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Logout;
