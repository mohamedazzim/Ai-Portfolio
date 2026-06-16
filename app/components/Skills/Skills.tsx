"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Skills.module.css";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { icon: "🐍", label: "Languages", color: "#e8631a", skills: ["Python", "JavaScript", "C++"] },
  { icon: "⚡", label: "Python Frameworks", color: "#ff9a5c", skills: ["Flask", "FastAPI"] },
  { icon: "🖥️", label: "Backend", color: "#50a0ff", skills: ["Node.js", "Express.js", "REST APIs"] },
  { icon: "🗃️", label: "Databases", color: "#6bdf8f", skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Qdrant", "SQL"] },
  { icon: "🎨", label: "Frontend", color: "#c084fc", skills: ["React", "HTML", "CSS", "Bootstrap"] },
  { icon: "☁️", label: "Cloud & DevOps", color: "#f472b6", skills: ["AWS (S3, CloudFront, Route 53)", "Docker", "Render", "VPS"] },
  { icon: "🤖", label: "AI / ML", color: "#facc15", skills: ["LangGraph", "LangChain", "LangSmith", "Scikit-Learn", "Pandas", "NumPy"] },
  { icon: "🔧", label: "Tools & Workflow", color: "#38bdf8", skills: ["Git", "GitHub", "Postman", "Figma", "MCP Servers", "ElevenLabs", "Twilio", "Make.com"] },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hdr = sectionRef.current?.querySelectorAll("[data-skills-header]");
    const cards = sectionRef.current?.querySelectorAll("[data-skill-card]");
    if (hdr) {
      gsap.fromTo(hdr, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }
    if (cards) {
      gsap.fromTo(cards, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }
  }, []);

  return (
    <section id="skills" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header} data-skills-header>
          <p className={styles.label}>Technical Skills</p>
          <h2 className={styles.heading}>Tools I build with</h2>
        </div>
        <div className={styles.grid}>
          {categories.map((cat) => (
            <div
              key={cat.label}
              className={styles.card}
              data-skill-card
              style={{ "--card-accent": cat.color } as React.CSSProperties}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon} style={{ color: cat.color }}>{cat.icon}</span>
                <span className={styles.cardCategory}>{cat.label}</span>
              </div>
              <div className={styles.tags}>
                {cat.skills.map((s) => (
                  <span key={s} className={styles.tag}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
