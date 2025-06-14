"use client";

import dynamic from "next/dynamic";
import type { ThemeProviderProps } from "next-themes";

const NextThemesProvider = dynamic<ThemeProviderProps>(
  () => import("next-themes").then((mod) => mod.ThemeProvider),
  { ssr: false },
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
