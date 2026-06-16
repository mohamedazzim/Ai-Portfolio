"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Education.module.css";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    icon: "🎓",
    degree: "Master of Computer Applications (MCA)",
    institution: "Bishop Heber College",
    location: "Trichy",
    period: "Jun 2024 — Apr 2026",
    grade: "78%",
    current: true,
  },
  {
    icon: "📘",
    degree: "B.Sc. Computer Science",
    institution: "Jamal Mohamed College",
    location: "Trichy",
    period: "Jun 2021 — Apr 2024",
    grade: "73%",
    current: false,
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[data-edu]");
    if (!els) return;
    gsap.fromTo(els, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
  }, []);

  return (
    <section id="education" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.label}>Education</p>
          <h2 className={styles.heading}>Academic Background</h2>
        </div>
        <div className={styles.list}>
          {education.map((e) => (
            <div key={e.degree} className={styles.item} data-edu>
              <div className={styles.iconWrap}><span>{e.icon}</span></div>
              <div className={styles.body}>
                <div className={styles.topRow}>
                  <div>
                    <h3 className={styles.degree}>{e.degree}</h3>
                    <p className={styles.institution}>
                      {e.institution}
                      <span className={styles.location}> · {e.location}</span>
                    </p>
                  </div>
                  <div className={styles.rightCol}>
                    <span className={styles.period}>{e.period}</span>
                    <span className={styles.grade}>{e.grade}</span>
                    {e.current && <span className={styles.currentBadge}>Current</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
