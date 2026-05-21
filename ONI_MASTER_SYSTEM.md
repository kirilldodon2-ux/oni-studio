# ONI Studio — Documentation System

## Purpose

This documentation system exists to:

- stabilize the architecture
- improve AI-assisted development
- preserve visual direction
- reduce chaos during refactors
- make the project scalable
- create long-term project memory

The goal is NOT corporate documentation. The goal is a clean creative operating system.

---

# Recommended Documentation Structure

```txt
/README.md
/ARCHITECTURE.md
/VISUAL_LANGUAGE.md
/FOLDER_MAP.md
/AI_RULES.md
/ROADMAP.md
```

These files should live in the root of the repository.

---

# 1. README.md

## Purpose

The main entry point of the project.

Should explain:

- what ONI is
- current stack
- how to run locally
- core philosophy
- project status
- links to architecture docs

---

## Suggested Structure

```md
# ONI Studio

Cinematic creative studio frontend.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js / R3F
- Cloudflare Pages

## Philosophy

- cinematic calmness
- editorial rhythm
- restrained motion
- atmosphere over feature count
- systems over hacks

## Current Priority

Phase 0 — Structural Refactor

## Local Development

npm install
npm run dev

## Documentation

- ARCHITECTURE.md
- VISUAL_LANGUAGE.md
- AI_RULES.md
- ROADMAP.md
```

---

# 2. ARCHITECTURE.md

## Purpose

Defines:

- section structure
- system ownership
- layout philosophy
- responsive logic
- scalable foundations

This is the MOST IMPORTANT file.

---

## Suggested Structure

```md
# ONI Architecture

## Core Principles

- sections own layout
- decorative systems never control layout
- systems are removable independently
- responsive behavior first
- atmosphere over complexity
- avoid global absolute positioning

---

## Current Problems

- giant PageBackdrop controls too much
- overflow is globally coupled
- decorative systems affect layout
- mobile containment is fragile
- sections are not fully isolated

---

## Target Architecture

sections/
  Hero/
  Work/
  Showreel/
  CTA/
  Footer/

systems/
  backdrop/
  motion/
  typography/
  layout/
  ornaments/

---

## Section Rules

Each section must:
- be self-contained
- own its layout
- contain local overflow
- support mobile independently
- avoid global positioning dependencies

---

## System Rules

Systems are reusable infrastructure.

Systems should:
- never hard-control layout
- remain reusable
- remain removable independently
- avoid coupling to viewport height

---

## Responsive Philosophy

- mobile is equal priority
- clamp() preferred over hard viewport logic
- avoid giant fixed artboards
- avoid uncontrolled absolute positioning
- decorative layers must scale safely
```

---

# 3. VISUAL\_LANGUAGE.md

## Purpose

Preserve the ONI aesthetic direction.

Prevents AI from turning the project into:

- startup UI
- dashboard design
- generic motion-heavy aesthetic

**Live doc includes:** `## Interaction` — signal-selection philosophy, global `::selection` styling, and the broader ONI Interaction Layer direction. Technical tokens and implementation notes live in `ARCHITECTURE.md` → Interaction Layer and `app/globals.css`.

---

## Suggested Structure

```md
# ONI Visual Language

## Keywords

- cinematic
- architectural
- restrained
- atmospheric
- editorial
- gallery-like
- premium minimalism

---

## Avoid

- startup aesthetics
- glossy SaaS visuals
- random gradients
- visual overload
- motion spam
- over-Awwwards chaos
- dashboard UI feeling

---

## Typography

Typography should feel:
- oversized
- editorial
- calm
- spacious
- architectural

---

## Motion

Motion should feel:
- slow
- cinematic
- ambient
- intentional
- spatial

Avoid:
- aggressive easing
- excessive particles
- loud animation
- constant movement

---

## Layout

Layouts should feel:
- gallery-like
- breathable
- balanced
- cinematic
- modular

Avoid:
- cramped cards
- generic UI grids
- dashboard rhythm
```

---

# 4. FOLDER\_MAP.md

## Purpose

Help AI and humans understand the repository structure.

---

## Suggested Structure

```md
# Folder Map

app/
sections/
systems/
components/
shared/
assets/
docs/

---

sections/
  Hero/
  Work/
  Showreel/
  CTA/
  Footer/

systems/
  backdrop/
  motion/
  typography/
  layout/
  ornaments/

---

assets/
  renders/
  textures/
  frames/
  references/
```

---

# 5. AI\_RULES.md

## Purpose

Teach AI assistants how to behave inside the project.

This dramatically improves:

- Cursor consistency
- refactor stability
- style preservation
- responsive safety

---

## Suggested Structure

```md
# AI Rules

## Before Modifying Structure

- analyze dependencies first
- preserve responsive behavior
- preserve cinematic restraint
- avoid introducing chaos

---

## Do Not

- create unnecessary wrappers
- introduce random UI libraries
- duplicate systems
- overuse absolute positioning
- convert ONI into startup UI
- introduce visual clutter

---

## Prefer

- reusable systems
- isolated sections
- scalable layout logic
- maintainable motion systems
- section ownership
- local overflow containment

---

## Motion Rules

Motion should:
- support atmosphere
- never block usability
- remain subtle
- preserve calmness

---

## Responsive Rules

- mobile is equal priority
- avoid giant viewport-based positioning
- test all layout changes responsively
- decorative systems must not create overflow
```

---

# 6. ROADMAP.md

## Purpose

Long-term direction of the project.

Contains:

- phases
- priorities
- future systems
- visual goals
- engineering philosophy

This should contain the current ONI roadmap.

---

# Suggested Refactor Workflow

## Step 1

Create all root documentation files.

## Step 2

Clean repository structure.

## Step 3

Map current sections/components.

## Step 4

Extract Hero into isolated section architecture.

## Step 5

Refactor PageBackdrop into local decorative systems.

## Step 6

Normalize responsive foundations.

## Step 7

Begin stable cinematic polish.

---

# Important Principle

The goal is NOT:

- perfect code
- infinite complexity
- overengineered systems

The goal IS:

- scalable creative infrastructure
- maintainable cinematic frontend
- stable responsive behavior
- future-proof creative platform

---

# Core Philosophy

- atmosphere > feature count
- systems > hacks
- scalable structure > temporary polish
- cinematic calmness > visual overload
- editorial rhythm > startup UI
- stability first, spectacle second

