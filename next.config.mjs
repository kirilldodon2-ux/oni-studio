/** @type {import('next').NextConfig} */

function archiveImageRemotePatterns() {
  const origin = process.env.NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN;
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

const remotePatterns = archiveImageRemotePatterns();

const nextConfig = {
  transpilePackages: ["three"],
  ...(remotePatterns.length > 0 && {
    images: {
      remotePatterns,
    },
  }),
};

export default nextConfig;
