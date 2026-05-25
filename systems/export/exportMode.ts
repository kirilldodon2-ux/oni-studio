/**
 * Canonical landing export flag: `/?export=1`
 * Perception freeze on the live home route — not a parallel export system.
 */
export const ONI_EXPORT_QUERY = "export" as const;
export const ONI_EXPORT_VALUE = "1" as const;
export const ONI_EXPORT_HTML_CLASS = "oni-export" as const;

export function isExportSearchParam(
  value: string | string[] | undefined
): boolean {
  if (value === ONI_EXPORT_VALUE) return true;
  if (Array.isArray(value)) return value.includes(ONI_EXPORT_VALUE);
  return false;
}

export function isExportMode(searchParams: {
  [ONI_EXPORT_QUERY]?: string | string[];
}): boolean {
  return isExportSearchParam(searchParams[ONI_EXPORT_QUERY]);
}
