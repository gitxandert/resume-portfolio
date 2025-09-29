import data from "../data/projects.json";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";

export default function Projects() {
  return (
    <section className="w-full max-w-4xl mx-auto p-8">
      <SectionHeader className="text-blue-950 dark:text-red-300 change-color">Projects</SectionHeader>
      <div className="grid sm:grid-cols-2 gap-6">
        {data.map(p => (
          <Card key={p.slug} title={p.name} className="bg-blue-950 dark:bg-rose-400 change-color" titleClassName="text-cyan-100 dark:text-rose-100 change-color">
            <ul className="flex flex-wrap gap-2 mb-4">
              {p.tags.map(t => (
                <li
                  key={t}
                  className="px-2 py-1 bg-indigo-500 dark:bg-rose-500 text-cyan-200 dark:text-red-100 change-color rounded text-xs tracking-wide"
                >
                  {t}
                </li>
               ))}
            </ul>
            <p className="mb-2 text-sm text-cyan-200 dark:text-rose-100 change-color">{p.description}</p>
           <div className="flex gap-3 text-sm">
             {Object.entries(p)
               // pick out only string values that look like URLs
               .filter(
                 ([key, val]) =>
                   typeof val === "string" &&
                   /^https?:\/\//.test(val) &&
                   !["image"].includes(key) // exclude non-link strings
               )
               .map(([key, val]) => (
                 <a
                   key={key}
                   href={val}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="capitalize text-indigo-200 dark:text-red-950 change-color hover:underline"
                 >
                   {key}
                 </a>
               ))}
           </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
