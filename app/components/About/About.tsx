"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[data-about]");
    if (!els) return;
    gsap.fromTo(
      els,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textCol}>
          <p className={styles.label} data-about>Get To Know More</p>
          <h2 className={styles.heading} data-about>About Me</h2>
          <p className={styles.body} data-about>
            Python Developer and Full Stack Engineer with hands-on experience in
            building web applications, REST APIs, AI-powered systems, and
            production-grade multi-agent AI platforms.
          </p>
          <p className={styles.body} data-about>
            Built CareerOS — an end-to-end AI-native career intelligence
            platform featuring LangGraph multi-agent orchestration, RAG
            pipelines, vector search (Qdrant), MCP-based voice automation
            (ElevenLabs + Twilio), LangSmith observability, and governance
            layers. Experienced in Python, Flask, Node.js, PostgreSQL, Redis,
            and AWS.
          </p>
          <p className={styles.body} data-about>
            Passionate about solving real-world problems through scalable
            software and continuously learning emerging technologies. Open to
            relocation and immediate opportunities.
          </p>
          <div className={styles.links} data-about>
            <a href="#contact" className={styles.primaryBtn}>Get in Touch</a>
            <a href="https://github.com/mohamedazzim" target="_blank" rel="noopener noreferrer" className={styles.ghostBtn}>
              GitHub ↗
            </a>
          </div>
        </div>
        <div className={styles.statsCol} data-about>
          <div className={styles.statCard}>
            <span className={styles.statNum}>7+</span>
            <span className={styles.statLabel}>Projects Built</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum}>78%</span>
            <span className={styles.statLabel}>MCA Score</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum}>₹19.5L</span>
            <span className={styles.statLabel}>AICTE Grant Secured</span>
          </div>
        </div>
      </div>
    </section>
  );
}
