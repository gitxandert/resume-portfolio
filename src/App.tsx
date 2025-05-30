import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      {/* Full-bleed background */}
      <div className="min-h-screen w-full bg-cyan-400 dark:bg-rose-950 change-color flex flex-col">
        <Navbar />
        {/* Content wrapper with padding */}
        <div className="flex-1 w-full">
          <main className="w-full flex-1">
            <AppRoutes />
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
