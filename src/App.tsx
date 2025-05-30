import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen flex flex-col bg-cyan-400 dark:bg-rose-950 transition-colors duration-600 ease-out">
        {/* NAVBAR → always at top, sticky if you scroll */}
        <Navbar />
        {/* MAIN CONTENT → grows to fill remaining space */}
        <main className="flex-1 container mx-auto p-6 pt-12 overflow-hidden">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
