import { apiFetch } from "./client";

const BASE = "/api/v1/profile/projects";

export async function listProjects() {
  const res = await apiFetch(BASE);
  if (!res.ok) throw new Error(`List projects failed (HTTP ${res.status})`);
  return res.json();
}

export async function createProject(payload) {
  const res = await apiFetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Create project failed (HTTP ${res.status})`);

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function updateProject(projectId, payload) {
  if (!projectId) throw new Error("updateProject: projectId is required");

  const res = await apiFetch(`${BASE}/${encodeURIComponent(projectId)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Update project failed (HTTP ${res.status})`);

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function deleteProject(projectId) {
  if (!projectId) throw new Error("deleteProject: projectId is required");

  const res = await apiFetch(`${BASE}/${encodeURIComponent(projectId)}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error(`Delete project failed (HTTP ${res.status})`);
  return true;
}
