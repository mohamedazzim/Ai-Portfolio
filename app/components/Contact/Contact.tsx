"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

const WEB3FORMS_KEY = "e87876ae-63b0-457a-8380-9b928ab3a3bf";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[data-contact]");
    if (!els) return;
    gsap.fromTo(els, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          message,
          subject: `Portfolio Inquiry from ${name}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header} data-contact>
          <p className={styles.label}>Contact</p>
          <h2 className={styles.heading}>
            Let&apos;s build something<br />
            <span className={styles.highlight}>together.</span>
          </h2>
          <p className={styles.sub}>
            Open for full-time roles. Reach out — I reply within 24 hours.
          </p>
        </div>
        <div className={styles.grid}>
          <div className={styles.infoCol} data-contact>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>✉</span>
              <div>
                <p className={styles.contactLabel}>Email</p>
                <a href="mailto:azzimandabdullah1@gmail.com" className={styles.contactValue}>
                  azzimandabdullah1@gmail.com
                </a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <div>
                <p className={styles.contactLabel}>Phone</p>
                <a href="tel:+916380083647" className={styles.contactValue}>
                  +91 63800 83647
                </a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <div>
                <p className={styles.contactLabel}>Location</p>
                <p className={styles.contactValue}>Trichy, Tamil Nadu, India</p>
              </div>
            </div>
            <div className={styles.socials}>
              <a href="https://linkedin.com/in/mohamedazzimj" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                LinkedIn ↗
              </a>
              <a href="https://github.com/mohamedazzim" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                GitHub ↗
              </a>
            </div>
          </div>
          <div className={styles.formCol} data-contact>
            {status === "sent" ? (
              <div className={styles.successMsg}>
                <span className={styles.successIcon}>✓</span>
                <p>Message sent successfully! I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : status === "error" ? (
              <div className={styles.errorMsg}>
                <span className={styles.errorIcon}>✗</span>
                <p>Something went wrong. Please email me directly or try again.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Name</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Email</label>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Message</label>
                  <textarea
                    className={styles.textarea}
                    rows={4}
                    placeholder="Your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
