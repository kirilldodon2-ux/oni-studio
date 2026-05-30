import Link from "next/link";
import { SectionContainer } from "@/systems/layout/SectionContainer";
import { SectionLabel } from "@/systems/layout/SectionLabel";
import { FadeIn, RevealUp } from "@/systems/atmosphere";
import { IdentityManifesto } from "./IdentityManifesto";

export function BrandIdentitySection() {
  return (
    <SectionContainer
      id="identity"
      data-oni-section="brand-identity"
      aria-labelledby="brand-identity-heading"
      className="pt-8 pb-4 md:pt-10 md:pb-5 lg:pt-[clamp(1.75rem,3vh,2.5rem)] lg:pb-4"
    >
      <div className="relative mx-auto max-w-oni-page">
        <RevealUp>
          <SectionLabel id="brand-identity-heading" className="mb-2 lg:mb-3">
            BRAND IDENTITY
          </SectionLabel>
        </RevealUp>

        <FadeIn delay={80}>
          <div className="relative">
            <Link
              href="/brandbook"
              aria-label="Open brandbook"
              className="relative block cursor-pointer"
            >
              <IdentityManifesto />
            </Link>

            <div className="mt-5 flex flex-col gap-2 border-t border-black/[0.05] pt-3 sm:flex-row sm:items-center sm:justify-between md:mt-6">
              <p className="font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-neutral-300">
                identity field · continuation in brandbook
              </p>
              <Link
                href="/brandbook"
                className="inline-flex w-fit items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-oni-accent transition-opacity duration-150 hover:opacity-70"
              >
                <span aria-hidden className="text-base font-light leading-none">
                  →
                </span>
                Open brandbook
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionContainer>
  );
}
