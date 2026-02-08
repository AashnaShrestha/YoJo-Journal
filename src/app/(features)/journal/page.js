"use client";

import { listJournals, deleteJournal } from "@/client/journal.api";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import JournalCardComponent from "@/components/common/journal/JournalCardComponent";
import { useRouter } from "next/navigation";
import { Btn } from "@/components/Button";
import moment from "moment";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

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

      toast("Failed to load journals");

      setError("Failed to load journals");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJournal(id);

      toast("Journal deleted successfully");

      await fetch(year, month); // refetch
    } catch (err) {
      console.error(err);

      toast("Failed to delete journal");
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
    <div className="p-8">
      <div className="flex justify-center">
        <h1 className="text-3xl font-semibold">My Journals</h1>
      </div>

      <div className="flex justify-between my-4">
        <div className="flex items-center gap-4">
          <div>
            <Select
              value={String(month)}
              onValueChange={(v) => setMonth(Number(v))}
            >
              <SelectTrigger>
                <SelectValue>{MONTHS[month - 1]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((name, idx) => (
                  <SelectItem key={name} value={String(idx + 1)}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={String(year)}
              onValueChange={(v) => setYear(Number(v))}
            >
              <SelectTrigger>
                <SelectValue>{String(year)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Btn
            theme="outline"
            btnLabel="Create Journal"
            onClick={() => router.push("/journal/create")}
          />
        </div>
      </div>

      {loading && <p>Loading journals…</p>}

      {!loading && !error && (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {journals.length === 0 && <p>No journals found.</p>}
          {journals.map((journal) => (
            <JournalCardComponent
              key={journal.id}
              onClick={() => router.push(`/journal/${journal.id}`)}
              handleDelete={() => handleDelete(journal.id)}
              title={journal.name}
              createdAt={moment(journal.createdAt).format("MMM DD, YYYY")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
