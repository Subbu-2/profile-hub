import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import Card from "../../components/card";
import "./index.scss";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // UI-only validation (no API yet)
  const isValid = useMemo(() => {
    const fnOk = firstName.trim().length > 0;
    const lnOk = lastName.trim().length > 0;
    const unOk = username.trim().length >= 3;
    const pwOk = password.length >= 8;
    return fnOk && lnOk && unOk && pwOk;
  }, [firstName, lastName, username, password]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValid || loading) return;

    setLoading(true);
    setError("");

    try {
      await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim(),
        password,
      });

      navigate("/welcome", { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signupPage">
      <Card
        title="Create your profile"
        subtitle="Just the basics to get started"
      >
        <form className="form" onSubmit={handleSubmit}>
          <div className="signupGrid">
            <div>
              <label className="label">First name</label>
              <input
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Navya"
                autoComplete="given-name"
              />
            </div>

            <div>
              <label className="label">Last name</label>
              <input
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Godavarthi"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div>
            <label className="label">Username</label>
            <div className="usernameRow">
              {/* <span className="usernamePrefix">@</span> */}
              <input
                className="input usernameInput"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
                placeholder="navya"
                autoComplete="username"
              />
            </div>
            <div className="helper">At least 3 characters. No spaces.</div>
          </div>

          <div>
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <div className="helper">At least 8 characters.</div>
          </div>
          {error && <div className="error">{error}</div>}

          <button className="button" disabled={!isValid || loading}>
            {loading ? "Creating…" : "Create my profile"}
          </button>

          <div className="signupFooter">
            <span className="helper">Already have one?</span>
            <Link className="signupLink" to="/login">
              Sign in
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
