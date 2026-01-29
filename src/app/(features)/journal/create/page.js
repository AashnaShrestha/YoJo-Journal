"use client";
import React, { useState } from "react";
import Editor from "../../../components/common/editor/EditorComponent";
import "../../globals.css";
import { Btn } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { createJournal } from "@/client/journal.api";

export default function JournalPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    await createJournal({ content, name: title });
  };

  return (
    <div>
      <InputField
        name="title"
        label="Title"
        onChange={(e) => {
          setTitle(e.currentTarget.value);
        }}
      />
      <Editor value={content} onChange={setContent} />
      <Btn btnLabel="Submit" onClick={handleSubmit} />
    </div>
  );
}
