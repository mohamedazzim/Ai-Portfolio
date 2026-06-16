"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import styles from "./VideoIntro.module.css";

const CinematicLayer = React.lazy(() => import("../CinematicLayer"));

const VIDEO_SRC = "/videos/talking-head.mp4?v=3";

export default function VideoIntro() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  const togglePlay = useCallback(() => {
    const videos = [bgVideoRef.current, fgVideoRef.current];
    if (isPlaying) {
      videos.forEach((v) => v?.pause());
      setIsPlaying(false);
    } else {
      videos.forEach((v) => v?.play().catch(console.error));
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const videos = [bgVideoRef.current, fgVideoRef.current];
    const newMuted = !isMuted;
    videos.forEach((v) => {
      if (v) v.muted = newMuted;
    });
    setIsMuted(newMuted);
  }, [isMuted]);

  const scrollToNext = useCallback(() => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const attemptPlay = useCallback(async (video: HTMLVideoElement, label: string) => {
    try {
      video.muted = true;
      video.currentTime = 0;
      await video.play();
      console.log(`[Video] ${label} autoplay started`);
      return true;
    } catch (err) {
      console.warn(`[Video] ${label} autoplay blocked:`, err);
      return false;
    }
  }, []);

  useEffect(() => {
    const bgVideo = bgVideoRef.current;
    const fgVideo = fgVideoRef.current;
    if (!bgVideo || !fgVideo) return;

    console.log("[Video] Component mounted, setting up video");

    const handleLoadedData = () => {
      console.log("[Video] loadeddata event fired");
      setVideoReady(true);
    };

    const handleCanPlay = () => {
      console.log("[Video] canplay event fired");
    };

    const handleCanPlayThrough = () => {
      console.log("[Video] canplaythrough event fired");
    };

    const handleError = (e: Event) => {
      console.error("[Video] Error loading video:", e);
    };

    bgVideo.addEventListener("loadeddata", handleLoadedData);
    fgVideo.addEventListener("loadeddata", handleLoadedData);
    bgVideo.addEventListener("canplay", handleCanPlay);
    fgVideo.addEventListener("canplay", handleCanPlay);
    bgVideo.addEventListener("canplaythrough", handleCanPlayThrough);
    fgVideo.addEventListener("canplaythrough", handleCanPlayThrough);
    bgVideo.addEventListener("error", handleError);
    fgVideo.addEventListener("error", handleError);

    const playVideos = async () => {
      console.log("[Video] Attempting to play videos");

      const bgSuccess = await attemptPlay(bgVideo, "bgVideo");
      const fgSuccess = await attemptPlay(fgVideo, "fgVideo");

      if (bgSuccess && fgSuccess) {
        setIsPlaying(true);
        console.log("[Video] Both videos playing successfully");
      } else if (retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        console.log(`[Video] Retrying playback (attempt ${retryCountRef.current}/${maxRetries})`);
        setTimeout(playVideos, 1000 * retryCountRef.current);
      } else {
        console.log("[Video] Autoplay blocked after retries, waiting for user interaction");
      }
    };

    if (bgVideo.readyState >= 2) {
      playVideos();
    } else {
      bgVideo.addEventListener("canplay", () => playVideos(), { once: true });
    }

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

    return () => {
      bgVideo.removeEventListener("loadeddata", handleLoadedData);
      fgVideo.removeEventListener("loadeddata", handleLoadedData);
      bgVideo.removeEventListener("canplay", handleCanPlay);
      fgVideo.removeEventListener("canplay", handleCanPlay);
      bgVideo.removeEventListener("canplaythrough", handleCanPlayThrough);
      fgVideo.removeEventListener("canplaythrough", handleCanPlayThrough);
      bgVideo.removeEventListener("error", handleError);
      fgVideo.removeEventListener("error", handleError);
      tl.kill();
    };
  }, [attemptPlay]);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.videoContainer}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src={VIDEO_SRC}
          autoPlay
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
          autoPlay
          loop
          muted
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
        <button
          className={styles.glassButton}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
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
