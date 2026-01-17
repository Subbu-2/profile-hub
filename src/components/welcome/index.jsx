import React, { useEffect, useState } from "react";
import { authCheck } from "../../api/auth";
import { clearToken } from "../../api/client";
import { useNavigate } from "react-router-dom";

const Welcome = ({ onLogout }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking"); // checking | ok | failed

  useEffect(() => {
    async function verify() {
      try {
        await authCheck();
        setStatus("ok");
      } catch (e) {
        clearToken();
        navigate("/login", { replace: true });
      }
    }

    verify();
  }, [navigate]);

  if (status === "checking") {
    return <p>Verifying session…</p>;
  }
  return (
    <div style={{ padding: 24 }}>
      <h1>✅ Welcome!</h1>
      <p>You are logged in and JWT authcheck succeeded.</p>

      <button
        onClick={() => {
          clearToken();
          onLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Welcome;
