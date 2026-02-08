"use client";
import React, { useEffect, useState } from "react";
import Editor from "@/components/common/editor/EditorComponent";
// import "../../../globals.css";
import { Btn } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { updateJournal, getJournalDetail } from "@/client/journal.api";
import { useRouter, useParams } from "next/navigation";

export default function JournalPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const journalId = params?.id;

  const router = useRouter();

  const fetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getJournalDetail(journalId);
      setContent(data?.content || "");
      setTitle(data?.name || "");
    } catch (err) {
      console.error(err);

      toast("Failed to load journals");

      setError("Failed to load journals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!journalId) return;
    fetch();
  }, [journalId]);

  const handleUpdate = async () => {
    await updateJournal({ content, name: title, journalId });
    router.push("/journal");
    router.refresh();
  };

  return (
    <>
      {loading && <p>Loading journal…</p>}
      {
        !loading && (
          <div className="flex flex-col gap-6 p-8">
            <InputField
              name="title"
              label="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
            />
            <div className="flex flex-col gap-4">
              <Editor value={content} onChange={setContent} />
              <Btn
                className="w-20 self-end"
                btnLabel="Update"
                onClick={handleUpdate}
              />
            </div>
          </div>
        )
      }
    </>
  );
}
