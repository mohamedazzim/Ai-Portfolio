"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Experience.module.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Full Stack Developer Intern",
    company: "App Angadi",
    location: "India",
    period: "Nov 2025 — Present",
    bullets: [
      "Developing enterprise case-tracking platform with full-stack architecture.",
      "Building backend APIs and database integrations for production workflows.",
      "Participating in application architecture design and deployment processes.",
      "Collaborating with development teams on production feature delivery.",
    ],
    tech: ["Python", "Flask", "PostgreSQL", "REST APIs", "Git"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[data-exp]");
    if (!els) return;
    gsap.fromTo(els, { opacity: 0, x: -40 }, {
      opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
  }, []);

  return (
    <section id="experience" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.label}>Experience</p>
          <h2 className={styles.heading}>Where I&apos;ve worked</h2>
        </div>
        <div className={styles.timeline}>
          {experiences.map((exp) => (
            <div key={exp.role} className={styles.item} data-exp>
              <div className={styles.dot} />
              <div className={styles.line} />
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <div>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <p className={styles.company}>
                      <span className={styles.companyName}>{exp.company}</span>
                      <span className={styles.companyMeta}> · {exp.location}</span>
                    </p>
                  </div>
                  <span className={styles.period}>{exp.period}</span>
                </div>
                <ul className={styles.bullets}>
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className={styles.techRow}>
                  {exp.tech.map((t) => (
                    <span key={t} className={styles.tech}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.callout} data-exp>
          <span className={styles.calloutDot} />
          <p className={styles.calloutText}>
            Currently <strong>open to full-time roles</strong> in Python, Full Stack Development, and AI Engineering.
          </p>
          <a href="#contact" className={styles.calloutBtn}>Let&apos;s connect →</a>
        </div>
      </div>
    </section>
  );
}
