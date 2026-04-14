"use client";

import { ModalProvider } from "./modal";
import { ViewTransitionProvider } from "./view-transition";

export function Providers({ children }) {
  return (
    <ViewTransitionProvider>
      <ModalProvider>{children}</ModalProvider>
    </ViewTransitionProvider>
  );
}
