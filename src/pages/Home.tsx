import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import resume from '../data/resume.json';

export default function Home() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-200 change-color mb-4">
        {resume.name}
      </h1>
      <h2 className="text-xl mb-6 text-indigo-600 dark:text-rose-200 change-color">
        {resume.title}
      </h2>
      <p className="mb-8 text-blue-950 dark:text-red-300 change-color leading-relaxed">
        {resume.summary}
      </p>

      <SectionHeader className="text-blue-950 dark:text-rose-200 change-color">
        Featured Projects
      </SectionHeader>

      <p className="text-blue-950 dark:text-red-300 change-color">
        Check out my{' '}
        <Link to="/projects" className="text-blue-800 dark:text-rose-200 change-color underline">
          projects
        </Link>{' '}
        to see what I’ve been hacking on.
      </p>
    </section>
  );
}
