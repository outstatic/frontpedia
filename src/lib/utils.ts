import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://frontpedia.com";

  try {
    return new URL(path, baseUrl).toString();
  } catch {
    return new URL(path, "https://frontpedia.com").toString();
  }
}
