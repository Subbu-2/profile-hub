import { apiFetch, setToken, setUser } from "./client";

export async function login(username, password) {
  const res = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error(`Login failed (HTTP ${res.status})`);
  }

  const data = await res.json();
  if (!data.token) throw new Error("Token missing in response");
  setToken(data.token);
  setUser({ username: data.username, userId: data.userId });
  return data;
}

export async function authCheck() {
  const res = await apiFetch("/api/v1/authcheck");
  if (!res.ok) throw new Error(`Authcheck failed (HTTP ${res.status})`);
  return res.json();
}

export async function register({ firstName, lastName, username, password }) {
  const res = await fetch("/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, username, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    const msg =
      data?.error || data?.message || `Registration failed (HTTP ${res.status})`;
    throw new Error(msg);
  }

  const data = await res.json();
  if (!data?.token) throw new Error("Token missing in response");
  setToken(data.token);
  setUser({ username: data.username, userId: data.userId });
  return data;
}