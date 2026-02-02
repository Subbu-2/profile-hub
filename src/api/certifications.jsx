import { apiFetch } from "./client";

const BASE = "/api/v1/profile/certification";

export async function listCertifications() {
  const res = await apiFetch(BASE);
  if (!res.ok) throw new Error(`List certifications failed (HTTP ${res.status})`);
  return res.json();
}

export async function createCertification(payload) {
  const res = await apiFetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Create certification failed (HTTP ${res.status})`);
  return res.json();
}

export async function updateCertification(id, payload) {
  const res = await apiFetch(`${BASE}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Update certification failed (HTTP ${res.status})`);
  return res.json();
}

export async function deleteCertification(id) {
  const res = await apiFetch(`${BASE}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error(`Delete certification failed (HTTP ${res.status})`);
  if (res.status === 204) return;
  return res.json();
}


// export async function swapCertificationSortOrder(a, b) {
//   const aNext = { ...a, sortOrder: b.sortOrder };
//   const bNext = { ...b, sortOrder: a.sortOrder };

//   await Promise.all([
//     updateCertification(a.id, aNext),
//     updateCertification(b.id, bNext),
//   ]);
// }
