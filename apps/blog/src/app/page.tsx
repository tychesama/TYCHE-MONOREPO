"use client";

import { getCategorizedArticles } from "../../lib/articles";
import ArticleItemList from "components/ArticleListItem";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [articles, setArticles] = useState<Record<string, any> | null>(null);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputCategory, setInputCategory] = useState<string>("");
  const [inputContent, setInputContent] = useState<string>("");

  useEffect(() => {
    const loadArticles = async () => {
      const data = await getCategorizedArticles();
      setArticles(data);
    };
    loadArticles();
  }, []);

  const onClick = async () => {
    const content = inputContent;
    const title = inputTitle || "Untitled";
    const category = inputCategory || "uncategorized";
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `article-${Date.now()}`;

    try {
      const res = await fetch("/api/create-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, title, category, content }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "unknown" }));
        console.error("Save failed", err);
        return;
      }

      const json = await res.json();
      console.log("Saved:", json.path);
      setInputTitle("");
      setInputCategory("");
      setInputContent("");
    } catch (e) {
      console.error("Request failed", e);
    }
  };

  if (!articles) return <div>Loading...</div>;

  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16 mb-20">
      <header className="font-cormorantGaramond font-light text-6xl text-neutral-900 text-center">
        <h1>Blog Tyche</h1>
      </header>

      <input
      placeholder="Title"
      className="bg-gray-200 w-11/12 h-[30px] p-3"
      value={inputTitle}
      onChange={(e) => setInputTitle(e.target.value)}
    />

    <input
      placeholder="Category"
      className="bg-gray-200 w-11/12 h-[30px] p-3"
      value={inputCategory}
      onChange={(e) => setInputCategory(e.target.value)}
    />

    <textarea
      placeholder="Content (markdown)"
      className="bg-gray-200 w-11/12 h-[200px] p-3"
      value={inputContent}
      onChange={(e) => setInputContent(e.target.value)}
    />
    <button className="bg-gray-200 w-[100px] h-[100px] p-3 hover:bg-black" onClick={onClick}>Save</button>
    
      <section className="md-grid md:grid-cols-2 flex flex-col gap-10">
        {articles && Object.keys(articles).map(article => (
          <ArticleItemList
            category={article}
            articles={articles[article]}
            key={article}
          />
        ))}
      </section>
    </section>
  );
}

export default HomePage;