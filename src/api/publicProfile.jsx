export async function fetchPublicProfile(username) {
  const u = (username || "").trim();
  if (!u) throw new Error("Username is required");

  const res = await fetch(`/api/v1/public/profile/${encodeURIComponent(u)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === 404) {
    throw new Error(`Profile not found (HTTP ${res.status})`);
  }

  if (!res.ok) throw new Error(`Failed to load profile (HTTP ${res.status})`);
  return res.json();
}
