"use client";

import {
  ArtifactConsumptionPair,
  type ArtifactConsumptionPairProps,
} from "./ArtifactConsumptionPair";

/** @deprecated Use ArtifactConsumptionPair — interface consumed by artifact, not symmetric convergence. */
export type ConvergencePairProps = Omit<
  ArtifactConsumptionPairProps,
  "interfaceLayer" | "artifact"
> & {
  leading: ArtifactConsumptionPairProps["interfaceLayer"];
  trailing: ArtifactConsumptionPairProps["artifact"];
  trailingScale?: ArtifactConsumptionPairProps["artifactScale"];
};

/** @deprecated Use ArtifactConsumptionPair */
export function ConvergencePair({
  leading,
  trailing,
  trailingScale,
  ...rest
}: ConvergencePairProps) {
  return (
    <ArtifactConsumptionPair
      interfaceLayer={leading}
      artifact={trailing}
      artifactScale={trailingScale}
      {...rest}
    />
  );
}
