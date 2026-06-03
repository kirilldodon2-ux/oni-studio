import { FadeIn } from "@/systems/atmosphere";
import { HeroAtmosphere } from "./HeroAtmosphere";
import { HeroVisual } from "./HeroVisual";
import { ViewWorkLink } from "./ViewWorkLink";

type HeroSectionProps = {
  exportMode?: boolean;
};

export function HeroSection({ exportMode = false }: HeroSectionProps) {
  // Cinematic hero artboard — one spatial field, not a boxed strip
  return (
    <section
      className="relative z-10 min-h-[100svh] max-lg:overflow-visible text-black lg:h-[100svh] lg:min-h-0 lg:overflow-hidden"
      data-oni-section="hero"
      data-oni-layer="content"
      aria-label="Hero"
    >
      <div className="relative flex min-h-[100svh] flex-col lg:grid lg:h-full lg:min-h-0 lg:grid-cols-12 lg:grid-rows-1">

        {/* Environmental field — rings, guide axes, depth parallax; desktop only */}
        <HeroAtmosphere />

        {/* Editorial text column — FadeIn becomes the column div itself (no extra wrapper).
            Opacity 0→1 over 1200ms; text materializes on page load, not on scroll. */}
        <FadeIn
          className="relative z-20 flex shrink-0 flex-col items-center px-6 pb-4 pt-[calc(var(--oni-header-h)+2.5rem)] text-center sm:px-8 md:px-10 lg:col-start-2 lg:col-end-8 lg:row-start-1 lg:h-full lg:min-h-0 lg:w-full lg:max-w-none lg:-translate-y-[2vh] lg:items-start lg:justify-center lg:self-center lg:justify-self-start lg:px-0 lg:pb-0 lg:pl-[clamp(0.5rem,3.5vw,4rem)] lg:pt-[clamp(2rem,8vh,6rem)] lg:text-left"
          threshold={0}
        >
          <h1 className="font-bebas text-[clamp(5.75rem,20vw,15rem)] leading-[0.82] tracking-[0.015em] lg:translate-x-[-0.02em]">
            ONI
          </h1>
          <p className="mt-5 max-w-[18rem] text-[1.0625rem] font-semibold leading-[1.08] tracking-tight text-black md:mt-7 md:text-xl lg:mt-[clamp(1.25rem,3vh,2.25rem)] lg:max-w-[22rem] lg:text-[clamp(1.05rem,1.3vw,1.32rem)]">
            One studio. Every task.
          </p>
          <p className="mt-5 max-w-[21rem] text-[0.9375rem] leading-[1.72] text-neutral-500 md:mt-6 md:text-base lg:mt-[clamp(1.5rem,3.5vh,2.75rem)] lg:max-w-[24rem] lg:text-[0.96rem] lg:leading-[1.78]">
            We design motion, identity and digital worlds for brands that move
            culture forward.
          </p>
          <ViewWorkLink className="mt-8 hidden lg:mt-[clamp(2rem,5vh,4rem)] lg:inline-flex" />
        </FadeIn>

        <div className="oni-webgl relative z-[5] h-[38svh] min-h-[17rem] w-full max-h-[23rem] shrink-0 bg-transparent lg:col-start-5 lg:col-end-13 lg:row-start-1 lg:h-full lg:max-h-none lg:min-h-0 lg:w-full">
          <HeroVisual exportMode={exportMode} />
        </div>

        <div className="flex justify-center px-6 pb-8 pt-2 lg:hidden">
          <ViewWorkLink />
        </div>
      </div>
    </section>
  );
}
