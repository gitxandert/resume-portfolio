import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      {/* Full-bleed background */}
      <div className="min-h-dvh w-full bg-cyan-400 dark:bg-rose-950 flex flex-col">
        <Navbar />
        {/* Content wrapper with padding */}
        <div className="flex-1 w-full">
          <main className="max-w-4xl mx-auto p-4 sm:p-8 pt-12">
            <AppRoutes />
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
