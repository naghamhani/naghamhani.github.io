"use client";
import type { ReactNode } from "react";
import { I18nProvider } from "../i18n";
import { LightboxProvider } from "../lightbox";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <LightboxProvider>{children}</LightboxProvider>
    </I18nProvider>
  );
}
