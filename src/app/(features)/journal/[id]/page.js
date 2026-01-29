"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { getJournalDetail } from "@/client/journal.api";
import { useParams } from "next/navigation";

export default function JournalDetailPage() {
  const params = useParams();
  const journalId = params?.id;
  const [journal, setJournal] = useState({});

  useEffect(() => {
    if (!journalId) return;
    const fetchJournalDetail = async () => {
      try {
        const data = await getJournalDetail(journalId);
        console.log("Fetched journal detail:", data);
        setJournal(data || {});
      } catch (err) {
        console.error("Failed to fetch journal detail", err);
      }
    };
    fetchJournalDetail();
  }, [journalId]);

  const createMarkup = (html) => ({ __html: DOMPurify.sanitize(html || "") });

  return (
    <div>
      <h2 className="text-2xl font-semibold">{journal?.name}</h2>
      {journal?.content ? (
        <div dangerouslySetInnerHTML={createMarkup(journal.content)} />
      ) : (
        <pre>{JSON.stringify(journal, null, 2)}</pre>
      )}
    </div>
  );
}
