import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Capitalize the given string:
 * - first character upper‑cased
 * - the rest lower‑cased
 *
 * @param str — input string
 * @returns a new string with first letter capitalized
 *
 * @example
 * capitalize("hello")    // "Hello"
 * capitalize("wORLD")    // "World"
 * capitalize("")         // ""
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalize each word in a string.
 *
 * @param str — e.g. "hello world"
 * @returns "Hello World"
 */
export function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}
