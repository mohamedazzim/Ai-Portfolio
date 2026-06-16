"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    icon: "🌐",
    type: "Client Project • International Business",
    accent: "#e8631a",
    title: "CLIFTON Import & Export – International Trade Platform",
    desc: "Designed and deployed a multilingual international trade platform for a Brazil-based import/export company. Managed the full lifecycle from UI development to Render deployment, custom domain integration, DNS configuration, and production launch.",
    highlight: "✅ Delivered to Client — cliftons.com.br",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Render", "DNS Config", "SEO"],
    link: "https://cliftons.com.br",
  },
  {
    icon: "🚀",
    type: "AI Platform — Production Ready",
    accent: "#e8631a",
    title: "CareerOS – AI-Native Career Intelligence Platform",
    desc: "End-to-end AI-powered career intelligence platform featuring multi-agent orchestration, RAG pipelines, vector search, MCP-based voice automation, and full observability.",
    highlight: "LangGraph, RAG, ElevenLabs + Twilio",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "Qdrant", "LangGraph", "Docker"],
    link: "https://github.com/mohamedazzim",
  },
  {
    icon: "🧠",
    type: "Research — AICTE Funded",
    accent: "#50a0ff",
    title: "Speech Recognition for Children with Cerebral Palsy",
    desc: "Speech-recognition prototype for assistive communication. Fine-tuned deep learning models on Cerebral Palsy speech dataset with embedded hardware integration. Approved ₹19.5 Lakhs AICTE grant.",
    highlight: "₹19.5L AICTE Grant Approved",
    tech: ["Python", "Wav2Vec2", "Embedded Hardware"],
    link: null,
  },
  {
    icon: "📋",
    type: "Web App — Deployed",
    accent: "#6bdf8f",
    title: "Bootfete2k26 – Symposium Management System",
    desc: "Dynamic symposium management platform with event-wise credentials, proctored online tests, real-time WebSocket updates, admin panel, leaderboard generation, and automated email notifications.",
    highlight: "Live at dashboard.bootfete2k26.tech",
    tech: ["React", "PostgreSQL", "Redis", "WebSocket", "Resend API"],
    link: "https://dashboard.bootfete2k26.tech",
  },
  {
    icon: "🔗",
    type: "AI / Automation",
    accent: "#c084fc",
    title: "RAG Pipeline (n8n)",
    desc: "Built a Retrieval-Augmented Generation pipeline using n8n workflows with document ingestion, embedding storage, and semantic retrieval for automated AI response generation.",
    highlight: "Contextual knowledge sources",
    tech: ["n8n", "OpenAI API", "Vector Embeddings"],
    link: null,
  },
  {
    icon: "📞",
    type: "AI Automation",
    accent: "#f472b6",
    title: "AI Calling Agent Automation",
    desc: "AI calling workflow for automated voice synthesis using MCP to trigger multiple tools. Built with ElevenLabs voice synthesis and Twilio for Tech Updates delivery.",
    highlight: "MCP-powered tool orchestration",
    tech: ["ElevenLabs", "Twilio", "MCP Servers", "Cursor IDE"],
    link: null,
  },
  {
    icon: "🏗️",
    type: "Client Project",
    accent: "#facc15",
    title: "SR Builders – Portfolio Website",
    desc: "Responsive portfolio site for a construction company in Trichy. Integrated Google Maps and enquiry form for lead capture.",
    highlight: "srbuilderanddevelopers.in",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://srbuilderanddevelopers.in",
  },
  {
    icon: "☁️",
    type: "Cloud Infrastructure",
    accent: "#38bdf8",
    title: "AWS Static Website Hosting",
    desc: "Secure static website deployment with global content delivery via CloudFront, custom domain with Route 53, and SSL certificates via AWS Certificate Manager.",
    highlight: "AWS S3 + CloudFront + Route 53",
    tech: ["AWS S3", "CloudFront", "Route 53", "HTML", "CSS", "JavaScript"],
    link: null,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hdr = sectionRef.current?.querySelectorAll("[data-proj-header]");
    const cards = sectionRef.current?.querySelectorAll("[data-proj-card]");
    if (hdr) {
      gsap.fromTo(hdr, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }
    if (cards) {
      gsap.fromTo(cards, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }
  }, []);

  return (
    <section id="projects" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header} data-proj-header>
          <p className={styles.label}>Work</p>
          <h2 className={styles.heading}>Projects</h2>
          <p className={styles.sub}>Academic, personal, and client projects demonstrating full-stack, AI, and deployment capabilities.</p>
        </div>
        <div className={styles.grid}>
          {projects.map((p) => (
            <article
              key={p.title}
              className={styles.card}
              data-proj-card
              style={{ "--proj-accent": p.accent } as React.CSSProperties}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardIcon}>{p.icon}</span>
                <span className={styles.cardType}>{p.type}</span>
              </div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
              <div className={styles.highlight}>
                <span className={styles.highlightDot} style={{ background: p.accent }} />
                {p.highlight}
              </div>
              <div className={styles.techRow}>
                {p.tech.map((t) => (
                  <span key={t} className={styles.techTag}>{t}</span>
                ))}
              </div>
              <div className={styles.cardFooter}>
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.viewBtn}>
                    View Project <span className={styles.viewArrow}>→</span>
                  </a>
                ) : (
                  <span className={styles.viewBtn}>Internal Project</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
