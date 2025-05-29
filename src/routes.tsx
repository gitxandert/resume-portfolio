import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence }           from 'framer-motion';
import { AnimatedPage }              from './utils/AnimatedPage';

import Home     from './pages/Home';
import Projects from './pages/Projects';
import Resume   from './pages/Resume';
import Contact  from './pages/Contact';
import NotFound from './pages/NotFound';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<AnimatedPage><Home/></AnimatedPage>} />
        <Route path="/projects" element={<AnimatedPage><Projects/></AnimatedPage>} />
        <Route path="/resume"   element={<AnimatedPage><Resume/></AnimatedPage>} />
        <Route path="/contact"  element={<AnimatedPage><Contact/></AnimatedPage>} />
        <Route path="/*"        element={<AnimatedPage><NotFound/></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}
