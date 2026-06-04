import { MIME_BY_EXT } from "./config";

function extensionOf(name: string): string {
  const idx = name.lastIndexOf(".");
  return idx >= 0 ? name.slice(idx + 1).toLowerCase() : "bin";
}

export type StoredAttachment = {
  name: string;
  url: string;
  size: number;
};

export async function storeAttachments(
  bucket: R2Bucket | undefined,
  publicBaseUrl: string | undefined,
  submissionId: string,
  files: File[]
): Promise<StoredAttachment[]> {
  if (!files.length) return [];
  if (!bucket || !publicBaseUrl) {
    throw new Error("Attachment storage is not configured.");
  }

  const stored: StoredAttachment[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = extensionOf(file.name);
    const key = `submissions/${submissionId}/${i}-${sanitizeKey(file.name)}`;
    const contentType = file.type || MIME_BY_EXT[ext] || "application/octet-stream";

    await bucket.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType },
      customMetadata: {
        originalName: file.name,
        submissionId,
      },
    });

    const url = `${publicBaseUrl.replace(/\/$/, "")}/${key}`;
    stored.push({ name: file.name, url, size: file.size });
  }

  return stored;
}

function sanitizeKey(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}
