import { apiFetch, logout } from "./client";

const BASE = "/api/v1/profile/education";

export async function listEducation() {
  const res = await apiFetch(BASE);
  if (!res.ok) throw new Error(`List education failed (HTTP ${res.status})`);
  return res.json();
}

export async function createEducation(payload) {
  const res = await apiFetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Create education failed (HTTP ${res.status})`);
  return res.json();
}

export async function updateEducation(eduId, payload) {
  const res = await apiFetch(`${BASE}/${eduId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Update education failed (HTTP ${res.status})`);
  return res.json();
}

export async function deleteEducation(eduId) {
  const res = await apiFetch(`${BASE}/${eduId}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Delete education failed (HTTP ${res.status})`);
  return true;
}
