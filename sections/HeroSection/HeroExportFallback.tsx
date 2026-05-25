/**
 * Static hero sculpture reference for ?export=1 perception freeze.
 * Same artboard geometry as the WebGL column; replaces canvas for Figma capture.
 */
export function HeroExportFallback() {
  return (
    <div
      className="relative h-full w-full"
      data-oni-layer="content"
      data-oni-hero-fallback=""
      aria-hidden
    >
      <picture className="block h-full w-full">
        <source
          media="(min-width: 1024px)"
          srcSet="/png/desktop/desktop hero bright.png"
        />
        <img
          src="/png/mobile/mobile hero bright.png"
          alt=""
          className="h-full w-full select-none object-contain object-center"
          draggable={false}
        />
      </picture>
    </div>
  );
}
