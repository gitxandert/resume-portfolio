import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import resume from '../data/resume.json';

export default function Home() {
  return (
    <section className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold dark:text-neutral-900 text-neutral-200 change-color mb-4">
        {resume.name}
      </h1>
      <h2 className="text-xl mb-6 dark:text-indigo-600 text-rose-200 change-color">
        {resume.title}
      </h2>
      <p className="mb-8 dark:text-blue-950 text-red-300 change-color leading-relaxed">
        {resume.summary}
      </p>

      <SectionHeader className="dark:text-blue-950 text-rose-200 change-color">
        Featured Projects
      </SectionHeader>

      <p className="dark:text-blue-950 text-red-300 change-color">
        Check out my{' '}
        <Link to="/projects" className="dark:text-blue-800 text-rose-200 change-color underline">
          projects
        </Link>{' '}
        to see what I’ve been hacking on.
      </p>
    </section>
  );
}
