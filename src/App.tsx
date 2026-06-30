import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { FloatingActions } from "./components/FloatingActions";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import About from "./pages/About";
import BecomeTutor from "./pages/BecomeTutor";
import ApplySuccess from "./pages/ApplySuccess";
import Commission from "./pages/Commission";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Vacancies from "./pages/Vacancies";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <Loader />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/commission" element={<Commission />} />
          <Route path="/become-tutor" element={<BecomeTutor />} />
          <Route path="/apply-success" element={<ApplySuccess />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
