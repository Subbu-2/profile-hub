import { apiFetch } from "./client";

export async function listExperiences() {
  const res = await apiFetch("/api/v1/profile/experience");
  if (!res.ok) throw new Error(`List experiences failed (HTTP ${res.status})`);
  return res.json();
}

export async function createExperience(payload) {
  const res = await apiFetch("/api/v1/profile/experience", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Create experience failed (HTTP ${res.status})`);
  return res.json();
}

export async function updateExperience(id, payload) {
  const res = await apiFetch(`/api/v1/profile/experience/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Update experience failed (HTTP ${res.status})`);
  return res.json();
}

export async function deleteExperience(id) {
  const res = await apiFetch(`/api/v1/profile/experience/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Delete experience failed (HTTP ${res.status})`);
  return true;
}
