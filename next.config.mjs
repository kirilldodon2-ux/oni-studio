/** @type {import('next').NextConfig} */

function remotePatternsFromEnv(envVar) {
  const origin = process.env[envVar];
  if (!origin) return [];

  try {
    const url = new URL(origin);
    return [
      {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        pathname: "/**",
      },
    ];
  } catch {
    return [];
  }
}

function mergeRemotePatterns(patterns) {
  const seen = new Set();
  return patterns.filter((p) => {
    const key = `${p.protocol}://${p.hostname}${p.pathname}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const remotePatterns = mergeRemotePatterns([
  ...remotePatternsFromEnv("NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN"),
  ...remotePatternsFromEnv("NEXT_PUBLIC_CASES_MEDIA_ORIGIN"),
]);

const nextConfig = {
  transpilePackages: ["three"],
  ...(remotePatterns.length > 0 && {
    images: {
      remotePatterns,
    },
  }),
};

export default nextConfig;
