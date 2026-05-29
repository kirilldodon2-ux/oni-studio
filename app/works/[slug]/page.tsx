import { notFound } from "next/navigation";
import { getWorkBySlug, worksRegistry } from "@/content/works/field";
import { ControlSurface } from "@/components/navigation";
import { PageBackdrop } from "@/systems/backdrop";
import { WorkPageView } from "@/systems/works";

export function generateStaticParams() {
  return worksRegistry.map((work) => ({ slug: work.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const work = getWorkBySlug(params.slug);
  if (!work) return {};
  return { title: `${work.title} — ONI Works` };
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const work = getWorkBySlug(params.slug);
  if (!work) notFound();

  return (
    <div className="relative min-h-screen bg-white text-black">
      <div
        className="pointer-events-none absolute inset-0 z-0 min-h-full w-full"
        aria-hidden
      >
        <PageBackdrop />
      </div>

      <ControlSurface />

      <main className="relative z-10 px-4 pb-24 pt-24 sm:px-5 md:px-8 md:pt-28 lg:px-10 lg:pt-32">
        <WorkPageView work={work} />
      </main>
    </div>
  );
}
