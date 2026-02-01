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
        setJournal(data || {});
      } catch (err) {
        console.error("Failed to fetch journal detail", err);
      }
    };
    fetchJournalDetail();
  }, [journalId]);

  const createMarkup = (html) => ({ __html: DOMPurify.sanitize(html || "") });

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg shadow-lg bg-white p-8 m-8 w-[60vw] h-[80vh] overflow-auto">
        <div className="flex justify-center">
          <h2 className="text-2xl font-semibold">{journal?.name}</h2>
        </div>
        {journal?.content ? (
          <div dangerouslySetInnerHTML={createMarkup(journal.content)} />
        ) : (
          <pre>{JSON.stringify(journal, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
