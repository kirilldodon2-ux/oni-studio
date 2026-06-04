"use client";

import { useCallback, useId, useRef, useState } from "react";

const ACCEPTED_EXTENSIONS = [
  ".pdf",
  ".docx",
  ".pptx",
  ".jpg",
  ".jpeg",
  ".png",
  ".zip",
] as const;

const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_BYTES = 25 * 1024 * 1024;

type FormStatus = "idle" | "submitting" | "success" | "error";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extensionAllowed(name: string): boolean {
  const lower = name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function validateFiles(files: File[]): string | null {
  if (files.length > MAX_FILES) {
    return `Maximum ${MAX_FILES} files.`;
  }
  let total = 0;
  for (const file of files) {
    if (!extensionAllowed(file.name)) {
      return `"${file.name}" is not an accepted format.`;
    }
    if (file.size > MAX_FILE_BYTES) {
      return `"${file.name}" exceeds ${formatBytes(MAX_FILE_BYTES)}.`;
    }
    total += file.size;
  }
  if (total > MAX_TOTAL_BYTES) {
    return `Total attachment size exceeds ${formatBytes(MAX_TOTAL_BYTES)}.`;
  }
  return null;
}

const inputClass =
  "w-full border-0 border-b border-black/[0.12] bg-transparent py-3 font-sans text-[13px] font-normal normal-case tracking-[0.02em] text-black outline-none transition-opacity duration-300 placeholder:text-neutral-400 focus:border-black/[0.28]";

const labelClass =
  "font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500";

export function ProjectContactForm() {
  const formId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL;

  const onFilesChange = useCallback((list: FileList | null) => {
    if (!list?.length) {
      setSelectedFiles([]);
      return;
    }
    const next = Array.from(list);
    const err = validateFiles(next);
    if (err) {
      setErrorMessage(err);
      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setErrorMessage(null);
    setSelectedFiles(next);
  }, []);

  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (fileInputRef.current) {
        const dt = new DataTransfer();
        next.forEach((f) => dt.items.add(f));
        fileInputRef.current.files = dt.files;
      }
      return next;
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    if (!apiUrl) {
      setStatus("error");
      setErrorMessage("Contact service is not configured.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    const honeypot = String(data.get("company") ?? "").trim();
    if (honeypot) {
      setStatus("success");
      form.reset();
      setSelectedFiles([]);
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    const project = String(data.get("project") ?? "").trim();

    if (!name || name.length > 120) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!contact || contact.length > 200) {
      setStatus("error");
      setErrorMessage("Please enter email or Telegram.");
      return;
    }
    if (!project || project.length < 10 || project.length > 8000) {
      setStatus("error");
      setErrorMessage("Tell us a bit more about your project (at least 10 characters).");
      return;
    }

    const fileErr = validateFiles(selectedFiles);
    if (fileErr) {
      setStatus("error");
      setErrorMessage(fileErr);
      return;
    }

    const payload = new FormData();
    payload.set("name", name);
    payload.set("contact", contact);
    payload.set("project", project);
    selectedFiles.forEach((file) => payload.append("files", file));

    setStatus("submitting");

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        body: payload,
      });
      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(body.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="mt-10 border-t border-black/[0.06] pt-8 md:mt-12"
        role="status"
        aria-live="polite"
      >
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-black">
          Message sent
        </p>
        <p className="mt-3 max-w-md font-sans text-[13px] leading-relaxed tracking-[0.02em] text-neutral-500">
          Thank you. We received your project and will respond soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-sans text-[10px] font-medium uppercase tracking-[0.20em] text-neutral-400 transition-opacity duration-300 hover:opacity-60"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="mt-10 border-t border-black/[0.06] pt-8 md:mt-12 md:pt-10"
      noValidate
    >
      {/* Honeypot — hidden from users and assistive tech */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid max-w-2xl gap-8 md:gap-10">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            disabled={status === "submitting"}
            className={`${inputClass} mt-2`}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor={`${formId}-contact`} className={labelClass}>
            Email or Telegram
          </label>
          <input
            id={`${formId}-contact`}
            name="contact"
            type="text"
            required
            autoComplete="email"
            maxLength={200}
            disabled={status === "submitting"}
            className={`${inputClass} mt-2`}
            placeholder="hello@studio.com or @handle"
          />
        </div>

        <div>
          <label htmlFor={`${formId}-project`} className={labelClass}>
            About your project
          </label>
          <textarea
            id={`${formId}-project`}
            name="project"
            required
            rows={5}
            minLength={10}
            maxLength={8000}
            disabled={status === "submitting"}
            className={`${inputClass} mt-2 resize-y min-h-[7rem]`}
            placeholder="What are you building? Context, references, intent."
          />
        </div>

        <div>
          <span className={labelClass}>Attach files</span>
          <p className="mt-1 font-sans text-[10px] font-medium tracking-[0.06em] text-neutral-400">
            PDF, DOCX, PPTX, JPG, PNG, ZIP — up to {MAX_FILES} files,{" "}
            {formatBytes(MAX_FILE_BYTES)} each
          </p>

          <input
            ref={fileInputRef}
            id={`${formId}-files`}
            name="files"
            type="file"
            multiple
            accept={ACCEPTED_EXTENSIONS.join(",")}
            className="sr-only"
            disabled={status === "submitting"}
            onChange={(ev) => onFilesChange(ev.target.files)}
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={status === "submitting"}
              onClick={() => fileInputRef.current?.click()}
              className="border border-black/[0.08] px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.20em] text-black transition-opacity duration-300 hover:opacity-60 disabled:opacity-40"
            >
              Select files
            </button>
            {selectedFiles.length > 0 ? (
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                {selectedFiles.length} attached
              </span>
            ) : null}
          </div>

          {selectedFiles.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-2 border-t border-black/[0.04] pt-4">
              {selectedFiles.map((file, index) => (
                <li
                  key={`${file.name}-${file.size}-${index}`}
                  className="flex items-baseline justify-between gap-4 border-b border-black/[0.04] pb-2"
                >
                  <span className="min-w-0 truncate font-sans text-[11px] font-medium tracking-[0.04em] text-neutral-600">
                    {file.name}
                  </span>
                  <span className="shrink-0 font-sans text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                    {formatBytes(file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    disabled={status === "submitting"}
                    className="shrink-0 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400 transition-opacity duration-300 hover:opacity-60"
                    aria-label={`Remove ${file.name}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {errorMessage ? (
        <p
          className="mt-6 font-sans text-[11px] font-medium tracking-[0.04em] text-oni-accent"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-10 border-t border-black/[0.06] pt-4 md:mt-12">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-black transition-opacity duration-300 hover:opacity-60 disabled:opacity-40"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
