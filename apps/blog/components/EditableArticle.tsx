"use client";

import { useState, useEffect } from "react";

export default function EditableArticle({
  slug,
  initialHtml,
  initialMarkdown,
}: Readonly<{
  slug: string;
  initialHtml: string;
  initialMarkdown: string;
}>) {
  const [editing, setEditing] = useState(false);
  const [markdown, setMarkdown] = useState(initialMarkdown);

  useEffect(() => {
    setMarkdown(initialMarkdown);
  }, [initialMarkdown]);

  const handleSave = async () => {
    console.log("Saving markdown:", markdown);
    try {
      const res = await fetch(`/api/edit-article`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, content: markdown }),
      });
      if (res.ok) {
        console.log("Article saved successfully");
        setEditing(false);
      } else {
        const err = await res.json();
        console.error("Failed to save article:", err);
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleCancel = () => {
    setMarkdown(initialMarkdown);
    setEditing(false);
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-4">
        {!editing ? (
          <button className="bg-gray-200 px-3 py-1" onClick={() => setEditing(true)}>
            Edit
          </button>
        ) : (
          <>
            <button className="bg-amber-500 text-white px-3 py-1" onClick={handleSave}>
              Save
            </button>
            <button className="bg-gray-200 px-3 py-1" onClick={handleCancel}>
              Cancel
            </button>
          </>
        )}
      </div>

      {editing ? (
        <div>
          <p className="text-sm text-gray-500 mb-2">⚠️ Only edit the content below. Do not modify the front-matter (title, category, date).</p>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full min-h-[40vh] p-3 border rounded font-mono text-sm"
          />
        </div>
      ) : (
        <article
          className="article"
          dangerouslySetInnerHTML={{ __html: initialHtml }}
        />
      )}
    </div>
  );
}