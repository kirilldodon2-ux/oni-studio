import { LocalizedText } from "@/systems/i18n/LocaleProvider";
export function HeroSceneLoading() {
  return (
    <div className="flex h-[52vh] w-full items-center justify-center bg-transparent lg:h-full">
      <p className="text-sm text-neutral-400"><LocalizedText value={"Loading scene…"} /></p>
    </div>
  );
}
