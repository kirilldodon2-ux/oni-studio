"use client";
import { useEffect, useState } from "react";

const TEXT_STATES = [
  { a: "proc / idle", b: "build: 0" },
  { a: "0x3a → null", b: "stream: dormant" },
  { a: "node: 0 active", b: "env: cold" },
  { a: "sig: none", b: "—" },
];

// Node positions in 200×50 SVG viewport — sparse routing topology
type Point = [number, number];
const NODES: Point[] = [
  [10, 10],   // N0 — top-left anchor
  [52, 6],    // N1 — top-center-left
  [110, 12],  // N2 — top-center
  [168, 6],   // N3 — top-right
  [24, 38],   // N4 — bottom-left
  [78, 42],   // N5 — bottom-center
  [138, 36],  // N6 — bottom-center-right
  [192, 44],  // N7 — bottom-right
];

// Infrastructure routing edges — sparse, not a complete graph
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3],  // top routing chain
  [0, 4],                   // N0 vertical drop
  [2, 5],                   // N2 vertical drop
  [3, 6],                   // N3 vertical drop
  [4, 5], [6, 7],           // bottom partial chain
];

// Signal scan path — top chain traversal: N0 → N1 → N2 → N3
// Approx path length: 42 + 58 + 58 ≈ 162 (used for stroke-dasharray)
const SIGNAL_D = "M10,10 L52,6 L110,12 L168,6";

// Candidates for active node — nodes on or adjacent to the signal path
const SIGNAL_NODES = [1, 2, 3, 6] as const;

/**
 * SystemArtifact
 *
 * Living signal surface for the SYSTEM ARCHITECTURES territory.
 * Renders a dormant infrastructure topology: 8 nodes, 8 sparse routing
 * edges, and one slow signal scan that traverses the primary path every
 * 28 seconds. One node carries an orange signal accent (React-driven,
 * 8.2s cadence). Text state cycling continues independently at 5.4s.
 *
 * Behavioral philosophy:
 *   - Signal scan is the primary living element — 28s cycle, ~12s visible
 *   - Active node accent is the only color; all else is monochrome
 *   - Transitions are CSS (no JS animation frames)
 *   - Reads as environmental polling, not interactive UI
 *   - prefers-reduced-motion: all motion suppressed, text states pause
 */
export function SystemArtifact() {
  const [textIdx, setTextIdx] = useState(0);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const textId = setInterval(
      () => setTextIdx((i) => (i + 1) % TEXT_STATES.length),
      5400
    );

    // Delayed node activation — system "warms up" after initial render
    let nodeId: ReturnType<typeof setInterval>;
    const initId = setTimeout(() => {
      setActiveNode(SIGNAL_NODES[1]); // N2 — mid-path initial state
      nodeId = setInterval(() => {
        setActiveNode((prev) => {
          const candidates = SIGNAL_NODES.filter((n) => n !== prev);
          return candidates[Math.floor(Math.random() * candidates.length)];
        });
      }, 8200);
    }, 3600);

    return () => {
      clearInterval(textId);
      clearTimeout(initId);
      clearInterval(nodeId);
    };
  }, []);

  return (
    <div className="mt-6 border-t border-black/[0.05] pt-3" aria-hidden>
      {/* Node topology — dormant infrastructure surface */}
      <svg
        viewBox="0 0 200 50"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-3 block"
        style={{ width: "100%", maxWidth: "200px", height: "auto" }}
        aria-hidden="true"
        focusable="false"
      >
        {/* Infrastructure edges */}
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            stroke="#c0c0c0"
            strokeWidth="0.45"
            opacity="0.18"
          />
        ))}

        {/* Signal scan traversal — CSS animation, 28s cycle */}
        <path
          d={SIGNAL_D}
          fill="none"
          stroke="#c8c8c8"
          strokeWidth="0.65"
          strokeLinecap="round"
          strokeDasharray="162"
          className="oni-signal-traverse"
        />

        {/* Dormant nodes — active one carries orange signal accent */}
        {NODES.map(([x, y], i) => {
          const isActive = activeNode === i;
          return (
            <g key={i}>
              {/* Signal ring — CSS transition, only visible on active node */}
              <circle
                cx={x}
                cy={y}
                r={4.5}
                fill="none"
                stroke="#FF4A1A"
                strokeWidth="0.5"
                style={{
                  opacity: isActive ? 0.2 : 0,
                  transition: "opacity 1200ms ease-in-out",
                }}
              />
              {/* Node body */}
              <circle
                cx={x}
                cy={y}
                r={1.6}
                style={{
                  fill: isActive ? "#FF4A1A" : "#b8b8b8",
                  opacity: isActive ? 0.55 : 0.22,
                  transition: "fill 800ms ease-in-out, opacity 800ms ease-in-out",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Infrastructure state readout */}
      <p className="font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-neutral-300">
        {TEXT_STATES[textIdx].a}
      </p>
      <p className="mt-0.5 font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-neutral-200">
        {TEXT_STATES[textIdx].b}
      </p>
    </div>
  );
}
