import React, { useEffect, useState } from "react";
import { checkHealth } from "../../api/health";

const Intro = ({ onLogin }) => {
  const [status, setStatus] = useState("checking");
  const [error, setError] = useState("");

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
    runHealthCheck();
  }, []);

  return (
    <>
      <h1 className="card">
        <div>Profile Hub</div>
        {status === "checking" && (
          <p className="logo">Checking backend health…</p>
        )}
        {status === "up" && (
          <>
            <p className="logo">Backend is UP</p>
            <button onClick={() => { onLogin() }}> Login </button>
          </>
        )}
        {status === "down" && (
          <>
            <p>Backend is DOWN</p>
            <p className="error">{error}</p>
            <button onClick={runHealthCheck}>Retry</button>
          </>
        )}
      </h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default Intro;
