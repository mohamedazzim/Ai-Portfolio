"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MemoryWall.module.css";

gsap.registerPlugin(ScrollTrigger);

const memories = [
  {
    image: "/memories/Captured while recording input's from MR Vadivel [CP Child} in Spastic Society - Trichy ] for building that voice rec application which granted cash from RPS.jpeg",
    title: "CP Child Research",
    caption: "Recording voice inputs from children at the Spastic Society, Trichy — building the assistive speech recognition app that secured ₹19.5 Lakhs AICTE funding.",
    alt: "Recording voice samples from a child at the Spastic Society for the cerebral palsy research project",
    rotate: -8,
  },
  {
    image: "/memories/moment of receiveing prize for securing 2nd in progamming competition conducted by msc ds dept in st joseph's college - trichy.jpeg",
    title: "Programming Runner-Up",
    caption: "Secured 2nd Place in the Programming Competition organized by the MSc Data Science Department at St. Joseph's College, Trichy.",
    alt: "Receiving 2nd place award at a programming competition at St. Joseph's College",
    rotate: 5,
  },
  {
    image: "/memories/proud moment when taking charge as president of mca 2026.jpeg",
    title: "MCA President 2026",
    caption: "Taking charge as the MCA Department President for 2026 — leading initiatives, mentoring juniors, and organizing department events.",
    alt: "Assuming the role of MCA Department President for 2026",
    rotate: -3,
  },
  {
    image: "/memories/receiving certificate for shortlisted from 110 team which all other has 3 to 4 per team and solo came to 5th place in PITCHFEST'26 conducted by st jooseph college- trichy.jpeg",
    title: "PitchFest Solo Achiever",
    caption: "Competed solo against 110 teams (most with 3–4 members) and secured 5th Place at PitchFest '26, St. Joseph's College, Trichy.",
    alt: "Receiving 5th place certificate at PitchFest 26 as a solo competitor",
    rotate: 9,
  },
  {
    image: "/memories/receiving certificate of appriciation of being president of mca'26 and conducting various event s and seesions for juniors.jpeg",
    title: "Leadership Recognition",
    caption: "Honored with a Certificate of Appreciation for serving as MCA President and organizing workshops, sessions, and events for junior students.",
    alt: "Receiving certificate of appreciation for leadership as MCA President",
    rotate: -6,
  },
  {
    image: "/memories/receiving firt prize for programming competition conductd in bishop heber college mca association '25.jpeg",
    title: "Programming Champion",
    caption: "Won First Place in the Programming Competition at Bishop Heber College MCA Association '25 — demonstrating strong algorithmic thinking.",
    alt: "Receiving first prize at the Bishop Heber College MCA programming competition",
    rotate: 4,
  },
  {
    image: "/memories/Secured 3rd place [solo] when all others are 4 members team conducted by St.Joseph College -Trichy named Hackathon'25 , and cash prize of 750 inr.jpeg",
    title: "Hackathon Podium Solo",
    caption: "Secured 3rd Place solo at Hackathon '25, St. Joseph's College — competing against full teams of 4, winning ₹750 cash prize.",
    alt: "Receiving 3rd place and cash prize at Hackathon 25 as a solo participant",
    rotate: 7,
  },
  {
    image: "/memories/when sid ahmend - ceo of vdart - appriciating for cp child proj and captured selfi.jpeg",
    title: "Industry Recognition",
    caption: "CEO of VDart, Mr. Sid Ahmed, appreciated the CP Child speech recognition project — validating its real-world impact and innovation.",
    alt: "Selfie with CEO of VDart appreciating the cerebral palsy speech recognition project",
    rotate: -5,
  },
  {
    image: "/memories/won 1st prize in competitive programming conducted by cs dept in dhanalaksmi college of engineering- samayapuram.jpeg",
    title: "Coding Competition Winner",
    caption: "Won First Place in the Competitive Programming Contest organized by the CS Department at Dhanalaksmi College of Engineering, Samayapuram.",
    alt: "Receiving first prize at competitive programming contest at Dhanalaksmi College of Engineering",
    rotate: 3,
  },
];

export default function MemoryWall() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll("[data-polaroid]");
    if (!cards) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section id="memory-wall" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.label}>Check Out My</p>
          <h2 className={styles.heading}>Memory Wall</h2>
        </div>
        <div className={styles.grid}>
          {memories.map((m, i) => (
            <div
              key={i}
              className={styles.polaroid}
              data-polaroid
              style={{ "--rotate": `${m.rotate}deg` } as React.CSSProperties}
            >
              <div className={styles.tape} />
              <div className={styles.imageWrapper}>
                <img
                  src={m.image}
                  alt={m.alt}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <p className={styles.title}>{m.title}</p>
              <p className={styles.caption}>{m.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
