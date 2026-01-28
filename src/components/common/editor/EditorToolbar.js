"use client";

export default function TipTapToolbar({ editor }) {
  if (!editor) return null;

  const buttonClass = (active) =>
    `px-2 py-1 rounded border text-sm ${
      active ? "bg-black text-white" : "bg-white"
    }`;

  return (
    <div className="flex flex-wrap gap-2 border-b p-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
      >
        B
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
      >
        I
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={buttonClass(editor.isActive("strike"))}
      >
        S
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 1 }))}
      >
        H1
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive("bulletList"))}
      >
        • List
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClass(editor.isActive("orderedList"))}
      >
        1. List
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="px-2 py-1 border rounded text-sm"
      >
        Undo
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="px-2 py-1 border rounded text-sm"
      >
        Redo
      </button>
    </div>
  );
}
