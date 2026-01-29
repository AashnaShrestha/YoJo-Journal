"use client";

import { listJournals } from "@/client/journal.api";
import { useEffect, useState } from "react";
import JournalCardComponent from "@/components/common/journal/JournalCardComponent";
import { useRouter } from "next/navigation";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ListJournalPage() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const fetch = async (y, m) => {
    setLoading(true);
    setError(null);
    try {
      const data = await listJournals(y, m);
      setJournals(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load journals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(year, month);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  const yearOptions = (() => {
    const cur = now.getFullYear();
    const years = [];
    for (let y = cur - 2; y <= cur + 1; y++) years.push(y);
    return years;
  })();

  return (
    <div>
      <div className="flex justify-center pa-8 ma-16 gap-6">
        <h1 className="text-3xl font-semibold">My Journals</h1>
      </div>

      <header
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <label style={{ marginRight: 8 }}>Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {MONTHS.map((name, idx) => (
              <option key={name} value={idx + 1}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ marginRight: 8 }}>Year</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </header>

      {loading && <p>Loading journals…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-4 gap-6">
          {journals.length === 0 && <p>No journals found.</p>}
          {journals.map((journal) => (
            <JournalCardComponent
              key={journal.id}
              onClick={() => router.push(`/journal/${journal.id}`)}
              title={journal.name}
              createdAt={journal.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
