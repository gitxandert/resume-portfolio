import { useMemo, useState } from "react";

import data           from "../data/blogs.json";
import Card           from "../components/Card";
import BlogPost       from "../components/BlogPost";
import SectionHeader  from "../components/SectionHeader";

const sortKeyOptions = [
  "updated-desc",
  "updated-asc",
  "published-desc",
  "published-asc", 
  "written-desc",
  "written-asc",
  "title-asc",
  "title-desc"
] as const;

type SortKey = typeof sortKeyOptions[number];

const COMPARATORS = {
  "updated-desc": (a: any, b: any) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime(),
  "updated-asc":  (a: any, b: any) => new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime(),
  "published-desc": (a: any, b: any) => new Date(b.published).getTime() - new Date(a.published).getTime(),
  "published-asc":  (a: any, b: any) => new Date(a.published).getTime() - new Date(b.published).getTime(),
  "written-desc": (a: any, b: any) => new Date(b.written).getTime() - new Date(a.written).getTime(),
  "written-asc":  (a: any, b: any) => new Date(a.written).getTime() - new Date(b.written).getTime(),
  "title-asc":    (a: any, b: any) => a.title.localeCompare(b.title),
  "title-desc":   (a: any, b: any) => b.title.localeCompare(a.title)
};

export default function Blogs() {
  const [entries,  setEntries ] = useState<any | null>(null);
  const [opened,   setOpened  ] = useState<any | null>(null);
  const [sortKey,  setSortKey ] = useState<SortKey>("updated-desc");

  const sortedBlogs = useMemo(() => {
    const cmp = COMPARATORS[sortKey] ?? COMPARATORS["updated-desc"];
    return [...data].sort((a,b) => {
      const res = cmp(a,b);
      if (res !== 0) return res;
      return String(a.last_updated).localeCompare(String(b.last_updated));
    });
  }, [data, sortKey]);

  function getEntries(json_path: string) {
    const url = `${import.meta.env.BASE_URL}${json_path}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setEntries(data);
      })
      .catch(err => console.error("Error with entries JSON:", err));
  }

  function getMd(md_path: string) {
    const url = `${import.meta.env.BASE_URL}${md_path}`
    fetch(url)
      .then(res => res.text())
      .then(data => {
        setOpened(data);
      })
      .catch(err => console.error("Error with entry md:", err));
  }

  return (
    <section className="w-full max-w-4xl mx-auto p-8">
      <SectionHeader className="text-blue-950 dark:text-red-300 change-color">Blogs</SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
        <div className="sm:col-span-1 flex flex-col items-start gap-2">
          <span className="text-sm opacity-80">Sort by:</span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="rounded-md border px-2 py-1 bg-transparent cursor-pointer"
          >
            <option value="updated-desc">newest</option>
            <option value="updated-asc">oldest</option>
            <option value="title-asc">a → z</option>
            <option value="title-desc">z → a</option>
          </select>
          <ul>
            {sortedBlogs.map(b => (
              <li key={b.slug}>
                <button
                  onClick={() => getEntries(b.src_path)}
                  className="w-full text-left cursor-pointer"
                >
                  <Card  
                    title={b.title} 
                    className="bg-blue-950 dark:bg-rose-400 change-color" 
                    titleClassName="text-cyan-100 dark:text-rose-100 change-color"
                  >
                    <p className="mb-2 text-sm text-cyan-200 dark:text-rose-100 change-color">{b.description}</p>
                  </Card>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* opened blog */}
        <div className="sm:col-span-4">
          {opened ? (
            <BlogPost content={opened} />
          ) : entries ? (
              <div>
                {entries.map((e: any) => (
                  <button
                    key={e.slug}
                    onClick={() => getMd(e.content)}
                    className="w-full text-left cursor-pointer" 
                  >
                    <div>
                      <h2>{e.title}</h2>
                      <p>{e.written}</p>
                      <p>{e.published}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : ( <></> )
          }
        </div>
      </div>
    </section>
  );
}
