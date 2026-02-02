import { apiFetch } from "./client";

const BASE = "/api/v1/profile/skills";

export async function getSkills() {
  const res = await apiFetch(BASE);
  if (!res.ok) throw new Error(`Get skills failed (HTTP ${res.status})`);
  return res.json();
}

export async function putSkills(payload) {
  const res = await apiFetch(BASE, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Save skills failed (HTTP ${res.status})`);

  // backend might return 204 or json — handle both safely
  if (res.status === 204) return null;
  return res.json();
}
