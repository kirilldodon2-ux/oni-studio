export const ALLOWED_EXTENSIONS = new Set([
  "pdf",
  "docx",
  "pptx",
  "jpg",
  "jpeg",
  "png",
  "zip",
]);

export const MIME_BY_EXT: Record<string, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  zip: "application/zip",
};

export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 25 * 1024 * 1024;
export const MAX_NAME_LEN = 120;
export const MAX_CONTACT_LEN = 200;
export const MIN_PROJECT_LEN = 10;
export const MAX_PROJECT_LEN = 8000;

export const DEFAULT_ALLOWED_ORIGINS = [
  "https://oni-studio.pages.dev",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];
