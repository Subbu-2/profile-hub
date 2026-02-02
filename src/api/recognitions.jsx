import { apiFetch } from "./client";

const BASE = "/api/v1/profile/recognitions";

export async function listRecognitions() {
  const res = await apiFetch(BASE);
  if (!res.ok) throw new Error(`List recognitions failed (HTTP ${res.status})`);
  return res.json();
}

export async function createRecognition(payload) {
  const res = await apiFetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Create recognition failed (HTTP ${res.status})`);
  return res.json();
}

export async function updateRecognition(recognitionId, payload) {
  const res = await apiFetch(`${BASE}/${recognitionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Update recognition failed (HTTP ${res.status})`);

  if (res.status === 204) return null;
  return res.json();
}

export async function deleteRecognition(recognitionId) {
  const res = await apiFetch(`${BASE}/${recognitionId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error(`Delete recognition failed (HTTP ${res.status})`);

  if (res.status === 204) return null;
  return res.json();
}
