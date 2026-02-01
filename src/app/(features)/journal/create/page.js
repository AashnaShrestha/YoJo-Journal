"use client";
import React, { useState } from "react";
import Editor from "@/components/common/editor/EditorComponent";
import "../../../globals.css";
import { Btn } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { createJournal } from "@/client/journal.api";
import { useRouter } from "next/navigation";

export default function JournalPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    await createJournal({ content, name: title });
    router.push("/journal");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <InputField
        name="title"
        label="Title"
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />
      <div className="flex flex-col gap-4">
        <Editor value={content} onChange={setContent} />
        <Btn className="w-20 self-end" btnLabel="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
}
