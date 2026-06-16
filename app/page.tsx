"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import MemoryWall from "./components/MemoryWall";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const VideoIntro = dynamic(() => import("./components/VideoIntro"), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        color: "rgba(255, 255, 255, 0.5)",
        fontSize: "14px",
        letterSpacing: "2px",
        textTransform: "uppercase"
      }}>
        Loading Experience...
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main>
      <Navbar />
      <div id="hero">
        <VideoIntro />
      </div>
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Achievements />
      <MemoryWall />
      <Contact />
      <Footer />
    </main>
  );
}
