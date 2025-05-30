export default function Footer() {
  return (
    <footer className="w-full mt-12 py-6 text-center text-sm text-blue-950 dark:text-rose-200 change-color">
      © {new Date().getFullYear()} Alexander Toth — built with React & Vite
    </footer>
  );
}
