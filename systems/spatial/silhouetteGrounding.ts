/**
 * Object grounding — silhouette drop-shadow stack.
 * Reference: ShowreelMediaCard frame-layer filter chain (post-matte).
 * Apply ONLY to rendered media (`img`, `video`, transparent PNG), never wrappers.
 */
export const ONI_SILHOUETTE_CONTACT =
  "drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.20))";

export const ONI_SILHOUETTE_LIFT =
  "drop-shadow(0px 6px 28px rgba(0, 0, 0, 0.09))";

export const ONI_SILHOUETTE_FILTER = [
  ONI_SILHOUETTE_CONTACT,
  ONI_SILHOUETTE_LIFT,
].join(" ");
