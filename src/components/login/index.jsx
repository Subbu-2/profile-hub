import React, { useState } from "react";
import { login, authCheck } from "../../api/auth";
import Card from "../ui/card";

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
      await authCheck(); 
      onSuccess();       
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title="Welcome back" subtitle="Login to continue">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label className="label">Username</label>
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="helper">At least 8 characters</div>
        </div>

        {error && <div className="error">{error}</div>}

        <button className="button" disabled={loading}>
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>
    </Card>
  );
};

export default Login;
