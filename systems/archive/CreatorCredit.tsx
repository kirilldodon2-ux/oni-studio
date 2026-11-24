import { Fragment } from "react";

const portfolios = new Map([
  ["@zxseeczs", { handle: "@zxseeczsV2", href: "https://vvoevodin.art/" }],
  ["@minzvr", { handle: "@digibuggg", href: "https://www.digibug.eu/" }],
  ["@somovdes", { handle: "@somovdes", href: "https://t.me/somovdes" }],
  ["@whytheweakest", { handle: "@whytheweakest", href: "https://t.me/whytheweekest" }],
  ["dodon.one", { handle: "dodon.one", href: "https://dodon.one/" }],
]);

const creditSeparator = " x ";

export function getCreatorLabel(creator?: string) {
  return creator?.split(creditSeparator).map(name => portfolios.get(name)?.handle ?? name).join(creditSeparator);
}

export function CreatorCredit({ creator, className }: { creator: string; className?: string }) {
  return (
    <span className={className}>
      {creator.split(creditSeparator).map((name, index) => {
        const portfolio = portfolios.get(name);
        return (
          <Fragment key={`${name}-${index}`}>
            {index > 0 && creditSeparator}
            {portfolio ? (
              <a
                href={portfolio.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-6 items-center align-middle text-[10px] normal-case tracking-normal underline underline-offset-2 hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
              >
                {portfolio.handle}
              </a>
            ) : name}
          </Fragment>
        );
      })}
    </span>
  );
}
