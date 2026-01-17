import React, { useState } from "react";
import { login, authCheck } from "../../api/auth";

const Login = ({ onSuccess }) => {
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(username, password);
      await authCheck(); // prove token works
      onSuccess();       // tell App to navigate
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Profile Hub</h1>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 320 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <button disabled={loading} type="submit">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
