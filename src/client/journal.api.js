export async function createJournal(data) {
  const res = await fetch("/api/journal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create journal");
  return res.json();
}

export async function listJournals(year, month) {
  const res = await fetch(`/api/journal?year=${year}&month=${month}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to list journal");
  }
  const data = await res.json();
  return data.data;
}

export async function getJournalDetail(journalId) {
  if (!journalId) throw new Error("journalId is required");
  const res = await fetch(`/api/journal/${journalId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get journal detail");
  }
  const data = await res.json();
  return data.data;
}
