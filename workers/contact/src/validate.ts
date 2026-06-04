import {
  ALLOWED_EXTENSIONS,
  MAX_CONTACT_LEN,
  MAX_FILE_BYTES,
  MAX_FILES,
  MAX_NAME_LEN,
  MAX_PROJECT_LEN,
  MAX_TOTAL_BYTES,
  MIME_BY_EXT,
  MIN_PROJECT_LEN,
} from "./config";

export type ParsedSubmission = {
  name: string;
  contact: string;
  project: string;
  files: File[];
  honeypot: string;
};

function extensionOf(name: string): string | null {
  const idx = name.lastIndexOf(".");
  if (idx < 0) return null;
  return name.slice(idx + 1).toLowerCase();
}

export function parseSubmission(form: FormData): ParsedSubmission {
  return {
    name: String(form.get("name") ?? "").trim(),
    contact: String(form.get("contact") ?? "").trim(),
    project: String(form.get("project") ?? "").trim(),
    honeypot: String(form.get("company") ?? "").trim(),
    files: form.getAll("files").filter((v): v is File => v instanceof File),
  };
}

export function validateSubmission(data: ParsedSubmission): string | null {
  if (data.honeypot) return null;

  if (!data.name || data.name.length > MAX_NAME_LEN) {
    return "Invalid name.";
  }
  if (!data.contact || data.contact.length > MAX_CONTACT_LEN) {
    return "Invalid contact.";
  }
  if (
    data.project.length < MIN_PROJECT_LEN ||
    data.project.length > MAX_PROJECT_LEN
  ) {
    return "Invalid project description.";
  }

  if (data.files.length > MAX_FILES) {
    return `Maximum ${MAX_FILES} files allowed.`;
  }

  let total = 0;
  for (const file of data.files) {
    const ext = extensionOf(file.name);
    if (!ext || !ALLOWED_EXTENSIONS.has(ext)) {
      return `File type not allowed: ${file.name}`;
    }
    const expectedMime = MIME_BY_EXT[ext];
    if (file.type && file.type !== expectedMime && file.type !== "application/octet-stream") {
      return `MIME mismatch for ${file.name}`;
    }
    if (file.size <= 0 || file.size > MAX_FILE_BYTES) {
      return `File too large: ${file.name}`;
    }
    total += file.size;
  }

  if (total > MAX_TOTAL_BYTES) {
    return "Total attachment size exceeded.";
  }

  return null;
}
