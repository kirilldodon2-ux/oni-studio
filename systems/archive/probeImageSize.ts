import fs from "fs";

export type ImageDimensions = { width: number; height: number };

/** Read intrinsic dimensions from PNG, JPEG, or WebP (server-only). */
export function probeImageSize(filePath: string): ImageDimensions | null {
  let buf: Buffer;
  try {
    buf = fs.readFileSync(filePath);
  } catch {
    return null;
  }
  if (buf.length < 24) return null;

  // PNG — IHDR at byte 16
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // WebP — RIFF container
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const form = buf.toString("ascii", 12, 16);
    if (form === "VP8 ") {
      // Lossy: dimensions at offset 26–29 (14-bit each)
      const w = buf.readUInt16LE(26) & 0x3fff;
      const h = buf.readUInt16LE(28) & 0x3fff;
      return { width: w, height: h };
    }
    if (form === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }
    if (form === "VP8X" && buf.length >= 30) {
      return {
        width: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
        height: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
      };
    }
  }

  // JPEG — scan for SOF0 / SOF2 marker
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 8) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      if (marker === 0xc0 || marker === 0xc2) {
        return {
          height: buf.readUInt16BE(i + 5),
          width: buf.readUInt16BE(i + 7),
        };
      }
      const len = buf.readUInt16BE(i + 2);
      i += 2 + len;
    }
  }

  return null;
}
