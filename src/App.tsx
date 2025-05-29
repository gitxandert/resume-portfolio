import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col dark:bg-cyan-400 bg-rose-950 transition-colors duration-600 ease-out">
        {/* NAVBAR → always at top, sticky if you scroll */}
        <Navbar />
        {/* MAIN CONTENT → grows to fill remaining space */}
        <main className="flex-1 container mx-auto p-6 pt-12 overflow-hidden">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
