"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import styles from "./VideoIntro.module.css";

const CinematicLayer = React.lazy(() => import("../CinematicLayer"));

const VIDEO_SRC = "/videos/talking-head.mp4?v=2";

export default function VideoIntro() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = useCallback(() => {
    const videos = [bgVideoRef.current, fgVideoRef.current];
    if (isPlaying) {
      videos.forEach((v) => v?.pause());
    } else {
      videos.forEach((v) => v?.play().catch(() => {}));
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const scrollToNext = useCallback(() => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const bgVideo = bgVideoRef.current;
    const fgVideo = fgVideoRef.current;
    if (!bgVideo || !fgVideo) return;

    const playVideos = async () => {
      try {
        bgVideo.muted = true;
        await Promise.all([
          bgVideo.play().catch(() => {}),
          fgVideo.play().catch(() => {}),
        ]);
      } catch {
        console.log("Autoplay prevented");
      }
    };

    playVideos();

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      bgVideo,
      { scale: 1.1 },
      { scale: 1, duration: 1.2 }
    )
      .fromTo(
        fgVideo,
        { scale: 1.05 },
        { scale: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        `.${styles.firstName}`,
        { opacity: 0, y: 40, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        `.${styles.lastName}`,
        { opacity: 0, y: 40, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 1 },
        "-=0.7"
      )
      .fromTo(
        `.${styles.role}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.2"
      );

    timelineRef.current = tl;

    const handleScroll = () => {
      if (!fgVideo || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const heroVisible = rect.bottom > 100 && rect.top < window.innerHeight;
      fgVideo.muted = !heroVisible;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      tl.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.videoContainer}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src={VIDEO_SRC}
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className={styles.overlay} />
        <video
          ref={fgVideoRef}
          className={styles.fgVideo}
          src={VIDEO_SRC}
          loop
          playsInline
          preload="auto"
        />
      </div>

      <React.Suspense fallback={null}>
        <CinematicLayer />
      </React.Suspense>

      <div ref={contentRef} className={styles.content}>
        <h1 className={styles.nameStack}>
          <span className={styles.firstName}>Mohamed</span>
          <span className={styles.lastName}>Azzim J</span>
        </h1>
        <p className={styles.role}>
          Python Developer &amp; Full Stack Engineer
        </p>
        <div className={styles.heroActions}>
          <a href="/resume/Mohamed_Azzim_Resume_Python.docx.pdf" download className={styles.resumeBtn}>
            Download Resume
          </a>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.glassButton}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="3" y="2" width="4" height="12" />
              <rect x="9" y="2" width="4" height="12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <polygon points="3,2 14,8 3,14" />
            </svg>
          )}
        </button>
      </div>

      <div
        ref={scrollIndicatorRef}
        className={styles.scrollIndicator}
        onClick={scrollToNext}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && scrollToNext()}
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}
