import data from "../data/projects.json";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";

export default function Projects() {
  return (
    <section className="max-w-4xl mx-auto p-8">
      <SectionHeader className="dark:text-blue-950 text-red-300 change-color">Projects</SectionHeader>
      <div className="grid sm:grid-cols-2 gap-6">
        {data.map(p => (
          <Card key={p.slug} title={p.name} className="dark:bg-blue-950 bg-rose-400 change-color" titleClassName="dark:text-cyan-100 text-rose-100 change-color">
            <img src={p.image} alt="" className="rounded mb-3" />
            <p className="mb-2 text-sm dark:text-cyan-200 text-rose-100 change-color">{p.description}</p>
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
                   className="capitalize dark:text-indigo-200 text-red-950 change-color hover:underline"
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
