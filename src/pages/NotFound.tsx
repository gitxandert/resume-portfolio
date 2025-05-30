export default function NotFound() {
  return (
    <div className="h-screen grid place-items-center text-center">
      <div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="mb-6">Page not found.</p>
        <a href="`${import.meta.env.BASE_URL}`" className="text-indigo-400 dark:text-rose-600 hover:underline">
          Go home
        </a>
      </div>
    </div>
  );
}
