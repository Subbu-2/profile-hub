import { apiFetch } from "./client";

const BASE = "/api/v1/profile/basic";

export async function getBasicProfile() {
  const res = await apiFetch(BASE);

  if (!res.ok) {
    throw new Error(`Get basic profile failed (HTTP ${res.status})`);
  }

  return res.json();
}

export async function putBasicProfile(payload) {
  const res = await apiFetch(BASE, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Update basic profile failed (HTTP ${res.status})`);
  }

  if (res.status === 204) return {};
  return res.json();
}
