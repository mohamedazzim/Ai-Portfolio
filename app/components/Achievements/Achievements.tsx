"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Achievements.module.css";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: "🏆",
    name: "AICTE Research Grant — ₹19.5 Lakhs",
    org: "Speech Recognition for Cerebral Palsy — Approved under Research Promotion Scheme",
    color: "#e8631a",
  },
  {
    icon: "🤖",
    name: "CareerOS — Production-Ready AI Platform",
    org: "Multi-agent orchestration with LangGraph + RAG",
    color: "#50a0ff",
  },
  {
    icon: "🎯",
    name: "MCA Department President",
    org: "Leadership & Mentorship — Guided juniors in Programming",
    color: "#c084fc",
  },
  {
    icon: "☁️",
    name: "AWS Cloud Deployment",
    org: "S3, CloudFront, Route 53, SSL — Full infrastructure",
    color: "#facc15",
  },
  {
    icon: "📋",
    name: "Bootfete2k26 — Live Symposium Platform",
    org: "Real-time event management with 100+ participants",
    color: "#f472b6",
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[data-ach]");
    if (!els) return;
    gsap.fromTo(els, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.label}>Achievements &amp; Certifications</p>
          <h2 className={styles.heading}>Recognition &amp; Impact</h2>
        </div>
        <div className={styles.certsGrid}>
          {achievements.map((c) => (
            <div
              key={c.name}
              className={styles.certCard}
              data-ach
              style={{ "--cert-color": c.color } as React.CSSProperties}
            >
              <span className={styles.certIcon}>{c.icon}</span>
              <div>
                <p className={styles.certName}>{c.name}</p>
                <p className={styles.certOrg}>{c.org}</p>
              </div>
              <span className={styles.certBadge} style={{ color: c.color, borderColor: c.color }}>
                ✓
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
