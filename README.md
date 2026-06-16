# AI Portfolio — Mohamed Azzim J

A cinematic, full-stack portfolio website built with Next.js, GSAP, Three.js, and Web3Forms.

**Live Site:** [View Portfolio](https://mohamedazzim.github.io/Ai-Portfolio)

---

## Features

- **Cinematic Video Hero** — Dual-layer video (blurred bg + sharp fg) with GSAP entrance animations
- **Three.js Particle Overlay** — 180 floating particles with custom shaders and mouse parallax
- **9 Content Sections** — About, Skills, Projects, Experience, Education, Achievements, Memory Wall, Contact, Footer
- **Resume Integration** — All content parsed from a real resume and mapped to portfolio sections
- **Polaroid Memory Wall** — Real achievement photos with tape effects, tilted cards, hover zoom+straighten
- **Working Contact Form** — Web3Forms API integration delivering emails directly to inbox
- **Mobile Hamburger Nav** — Animated burger menu with slide-down mobile navigation
- **Fully Responsive** — 3-tier breakpoints (1024px, 768px, 480px) across all components
- **Scroll-triggered Animations** — GSAP ScrollTrigger on every section for smooth reveal effects

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 15, React 19, TypeScript |
| Styling | CSS Modules, Inter + Caveat fonts |
| Animation | GSAP (ScrollTrigger), Three.js (WebGL) |
| Forms | Web3Forms API |
| Deployment | Render / Vercel |
| Version Control | Git, GitHub |

## Project Structure

```
app/
├── components/
│   ├── VideoIntro/        # Hero section with dual-layer video
│   ├── CinematicLayer/    # Three.js particle overlay
│   ├── Navbar/            # Fixed nav with mobile hamburger
│   ├── About/             # Bio + stat cards
│   ├── Skills/            # 8-category skill grid
│   ├── Projects/          # 8 project cards
│   ├── Experience/        # Timeline layout
│   ├── Education/         # Degree cards
│   ├── Achievements/      # Achievement cards
│   ├── MemoryWall/        # Polaroid photo gallery
│   ├── Contact/           # Form + contact info
│   └── Footer/            # Logo + nav links
├── globals.css            # Global styles + fonts
├── layout.tsx             # Root layout
└── page.tsx               # Home page (all sections)
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/mohamedazzim/Ai-Portfolio.git

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Cinematic video intro with name, title, and resume download |
| **About** | Professional summary, education stats, career highlights |
| **Skills** | 8 categories: Languages, Frameworks, Backend, Databases, Frontend, Cloud, AI/ML, Tools |
| **Projects** | 8 projects including CLIFTON (client), CareerOS (AI platform), AICTE-funded research |
| **Experience** | Full Stack Developer Intern at App Angadi |
| **Education** | MCA (Bishop Heber College) + B.Sc. CS (Jamal Mohamed College) |
| **Achievements** | ₹19.5L AICTE Grant, CareerOS, Department President, AWS Deployment |
| **Memory Wall** | 9 polaroid-style achievement photos with professional captions |
| **Contact** | Working form via Web3Forms + email, phone, socials |

## Contact

- **Email:** azzimandabdullah1@gmail.com
- **Phone:** +91 63800 83647
- **LinkedIn:** [linkedin.com/in/mohamedazzimj](https://linkedin.com/in/mohamedazzimj)
- **GitHub:** [github.com/mohamedazzim](https://github.com/mohamedazzim)

---

Built with Next.js, GSAP, and Three.js.
