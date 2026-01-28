"use client";
import React, { useRef, useState } from "react";
import Editor from "../../components/common/editor/EditorComponent";
import "../globals.css";

export default function JournalPage() {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  
  const [content, setContent] = useState("");

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  return (
    <div>
      <Editor value={content} onChange={setContent} />
    </div>
  );
}
