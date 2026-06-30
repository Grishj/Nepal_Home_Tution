import type { Vacancy } from "../types/vacancy";

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

function parseBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toUpperCase() === "TRUE";
  return false;
}

function parseNumber(value: unknown): number {
  if (typeof value === "number") return value;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function validateVacancy(raw: Record<string, unknown>): Vacancy | null {
  const id = String(raw.id || "").trim();
  const statusRaw = String(raw.status || "").trim().toUpperCase();
  const status = statusRaw === "OPEN" || statusRaw === "CLOSED" ? statusRaw : null;

  if (!id || !status) return null;
  if (!parseBoolean(raw.active)) return null;

  return {
    id,
    status,
    subject: String(raw.subject || "").trim(),
    class: String(raw.class || "").trim(),
    location: String(raw.location || "").trim(),
    salary: parseNumber(raw.salary),
    teacherGender: String(raw.teacherGender || "").trim(),
    duration: String(raw.duration || "").trim(),
    description: String(raw.description || "").trim(),
    postedDate: String(raw.postedDate || "").trim(),
    experience: String(raw.experience || "").trim(),
    education: String(raw.education || "").trim(),
    urgent: parseBoolean(raw.urgent),
    active: parseBoolean(raw.active),
  };
}

function fetchViaJsonp(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const callbackName = `__jsonp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const script = document.createElement("script");
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Request timed out. Please try again."));
    }, 15000);

    function cleanup() {
      clearTimeout(timeout);
      delete (window as unknown as Record<string, unknown>)[callbackName];
      document.body.removeChild(script);
    }

    (window as unknown as Record<string, unknown>)[callbackName] = (data: unknown) => {
      resolve(data);
      cleanup();
    };

    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${callbackName}`;
    script.onerror = () => {
      cleanup();
      reject(new Error("Network error. Please check your internet connection and try again."));
    };
    document.body.appendChild(script);
  });
}

export async function getVacancies(): Promise<Vacancy[]> {
  if (!SCRIPT_URL) {
    throw new Error("Google Script URL is not configured. Set VITE_GOOGLE_SCRIPT_URL in your .env file.");
  }

  let data: unknown;

  try {
    data = await fetchViaJsonp(SCRIPT_URL);
  } catch (err) {
    throw err instanceof Error ? err : new Error("Failed to load vacancies.");
  }

  if (!Array.isArray(data)) {
    throw new Error("Unexpected data format received from the server.");
  }

  const vacancies: Vacancy[] = [];

  for (const item of data) {
    if (typeof item !== "object" || item === null) continue;
    const validated = validateVacancy(item as Record<string, unknown>);
    if (validated) vacancies.push(validated);
  }

  return vacancies;
}
