import SectionHeader from "../components/SectionHeader";
import Card from "../components/Card";
import data from "../data/resume.json";

export default function Resume() {
  return (
    <section className="max-w-3xl mx-auto p-8 dark:text-blue-950 text-red-300 change-color">
      <SectionHeader>Skills</SectionHeader>
      <ul className="flex flex-wrap gap-2 mb-8">
        {data.skills.map(s => (
          <li
            key={s}
            className="px-2 py-1 dark:bg-indigo-500 bg-rose-500 dark:text-cyan-200 text-red-100 change-color rounded text-xs tracking-wide"
          >
            {s}
          </li>
        ))}
      </ul>

      <SectionHeader>Experience</SectionHeader>
      {data.experience.map(job => (
        <div>
        <Card className="mb-5 dark:bg-blue-950 bg-rose-400 change-color" titleClassName="dark:text-cyan-100 text-red-100 change-color" key={job.role} title={`${job.role} — ${job.company}`}>
          <span className="text-xs dark:text-neutral-400 text-orange-950 change-color">{job.years}</span>
          <ul className="list-disc text-cyan-100 ml-4 mt-2 space-y-1 text-sm">
            {job.bullets.map(b => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Card>
        </div>
      ))}

      <SectionHeader className="mt-10">Education</SectionHeader>
      {data.education.map(ed => (
        <p key={ed.school} className="mb-2 dark:text-blue-950 text-rose-200">
          <strong>{ed.school}</strong> — {ed.degree} ({ed.years})
        </p>
      ))}

      <a
        href="Xander_Toth_Software_Engineering_Resume.docx"
        className="dark:bg-indigo-500 bg-rose-500 rounded dark:text-cyan-200 text-red-100 inline-block mt-8 px-4 py-2 transform transition-all duration-300 ease-out hover:scale-103 hover:shadow-lg"
        target="_blank"
      >
        Download Resume
      </a>
    </section>
  );
}
