/**
 * systems/atmosphere — shared atmospheric infrastructure
 *
 * Primitives for environmental motion, cinematic reveal, and spatial depth.
 * Sections PARTICIPATE in the atmosphere by adopting these systems;
 * they do not own motion behavior independently.
 *
 * Exports:
 *   PresenceLayer    — scroll-driven opacity/translateY emergence (client)
 *   AmbientField     — CSS-driven ambient drift + breathing wrapper (server)
 *   FadeIn           — pure opacity emergence atom (client)
 *   RevealUp         — opacity + restrained upward spatial emergence (client)
 *   useDepthField    — scroll-driven parallax depth hook (client)
 *   ContinuityField  — page-level spatial continuity layer (server)
 */
export { PresenceLayer } from "./PresenceLayer";
export { AmbientField } from "./AmbientField";
export { FadeIn, RevealUp } from "./RevealPrimitives";
export { useDepthField } from "./useDepthField";
export { ContinuityField } from "./ContinuityField";
