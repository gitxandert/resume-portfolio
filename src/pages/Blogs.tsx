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
  const [jsonClass,   setJsonClass] = useState<string>("switch");
  const [mdClass,     setMdClass  ] = useState<string>("eroo");
  const [entries,     setEntries  ] = useState<any | null>(null);
  const [opened,      setOpened   ] = useState<any | null>(null);
  const [blogSort,    setBlogSort ] = useState<SortKey>("updated-desc");
  const [entrySort,   setEntrySort] = useState<SortKey>("published-desc");

  const sortedBlogs = useMemo(() => {
    const cmp = COMPARATORS[blogSort] ?? COMPARATORS["updated-desc"];
    return [...data].sort((a,b) => {
      const res = cmp(a,b);
      if (res !== 0) return res;
      return String(a.last_updated).localeCompare(String(b.last_updated));
    });
  }, [data, blogSort]);

  const sortedEntries = useMemo(() => {
    if (!entries) {
      return;
    }

    const cmp = COMPARATORS[entrySort] ?? COMPARATORS["published-desc"];
    return [...entries].sort((a,b) => {
      const res = cmp(a,b);
      if (res !== 0) return res;
      return String(a.published).localeCompare(String(b.published));
    });
  }, [entries, entrySort]);

  function getEntries(json_path: string) {
    const url = `${import.meta.env.BASE_URL}${json_path}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setEntries(data);
        setJsonClass("switch");
        setMdClass("eroo");
      })
      .catch(err => console.error("Error with entries JSON:", err));
  }

  function getMd(md_path: string) {
    const url = `${import.meta.env.BASE_URL}${md_path}`
    fetch(url)
      .then(res => res.text())
      .then(data => {
        setOpened(data);
        setJsonClass("eroo");
        setMdClass("switch");
      })
      .catch(err => console.error("Error with entry md:", err));
  }

  function returnToEntries() {
    setJsonClass("switch");
    setMdClass("eroo");
  }

  function formatDate(date: string) {
    return new Date(date).toString();
  }

  return (
    <section className="w-full max-w-4xl mx-auto p-8">
      <SectionHeader className="text-blue-950 dark:text-red-300 change-color">Blogs</SectionHeader>
      <div className="grid grid-cols-1 h-100 sm:grid-cols-5 gap-6">
        <div className="sm:col-span-1 flex flex-col min-h-0 overflow-hidden items-start gap-2">
          <span className="text-sm opacity-80">Sort blogs by:</span>
          <select
            value={blogSort}
            onChange={(e) => setBlogSort(e.target.value as SortKey)}
            className="rounded-md border px-2 py-1 bg-transparent cursor-pointer"
          >
            <option value="updated-desc">newest</option>
            <option value="updated-asc">oldest</option>
            <option value="title-asc">a → z</option>
            <option value="title-desc">z → a</option>
          </select>
          <ul className="mt-2 flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1">
            {sortedBlogs.map(b => (
              <li key={b.slug}>
                <button
                  onClick={() => getEntries(b.src_path)}
                  className="w-full text-left cursor-pointer m-0 p-0"
                >
                  <Card
                   title={b.title}
                   className="group overflow-hidden transition-all duration-300 bg-blue-950 dark:bg-rose-400 change-color !m-0 !pt-1 !pb-1 !pl-2 !pr-2"
                   titleClassName="text-cyan-100 dark:text-rose-100 change-color"
>
                    <div className="max-h-0 overflow-hidden transition-[max-height] duration-300 group-hover:max-h-40">
                      <p className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-sm text-cyan-200 dark:text-rose-100 change-color">
                        {b.description}
                      </p>
                    </div>
                  </Card>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* opened blog */}
        <div className="sm:col-span-4 relative min-h-[60vh] gap-2"> 
        {/* Entries layer */}
          {entries ? (
            <div
             className={`absolute inset-0 overflow-hidden gap-2 transition-all duration-300 ${jsonClass}`}
             aria-hidden={opened}
            >
              <div className="flex flex-col gap-2 mb-2">
                <span className="text-sm opacity-80">Sort entries by: </span>
                <select
                 value={entrySort}
                 onChange={(e) => setEntrySort(e.target.value as SortKey)}
                 className="rounded-md border px-2 py-1 bg-transparent cursor-pointer"
                >
                  <option value="published-desc">published: new</option>
                  <option value="published-asc">published: old</option>
                  <option value="written-desc">written: new</option>
                  <option value="written-asc">written: old</option>
                  <option value="title-asc">a → z</option>
                  <option value="title-desc">z → a</option>
                </select>
              </div>
              <div className="flex flex-col overflow-auto">
                {sortedEntries ? sortedEntries.map((e: any) => (
                  <div key={e.slug}>
                    <div
                     onClick={() => getMd(e.content)}
                     className="text-left cursor-pointer"
                    >
                      <span className="block text-2xl font-bold leading-tight">{e.title}</span>
                      <p>{formatDate(e.written)}</p>
                    </div>
                  </div>
                )) : null}
              </div>
            </div>
          ) : null}

          {/* Opened blog layer */}
          <div
           className={`absolute inset-0 flex flex-col overflow-hidden transition-all duration-300 ${mdClass}`}
           aria-hidden={!opened}
          >
            {opened && (
              <strong className="cursor-pointer m-2 border border-white-100 pl-2 pt-1 pb-1 w-15 rounded-sm transition-all hover:w-16 hover:text-lg" onClick={returnToEntries}>back</strong>
            )}
            <BlogPost content={opened} className="flex-1 overflow-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
