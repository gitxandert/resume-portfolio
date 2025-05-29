export default function Footer() {
  return (
    <footer className="mt-12 py-6 text-center text-sm dark:text-blue-950 text-rose-200 change-colors">
      © {new Date().getFullYear()} Alexander Toth — built with React & Vite
    </footer>
  );
}
