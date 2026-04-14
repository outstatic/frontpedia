"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";

type StartViewTransition = (cb: () => Promise<void>) => void;

function getStartViewTransition(): StartViewTransition | null {
  if (
    "startViewTransition" in document &&
    typeof (document as Document & { startViewTransition?: unknown })
      .startViewTransition === "function"
  ) {
    return (cb) =>
      (
        document as Document & { startViewTransition: StartViewTransition }
      ).startViewTransition(cb);
  }
  return null;
}

function isForwardTransition(): boolean {
  const thumbnails = Array.from(
    document.querySelectorAll("[data-thumbnail]"),
  );
  return thumbnails.some(
    (el) => (el as HTMLElement).style.viewTransitionName === "post-media",
  );
}

function applyDirection(forward: boolean) {
  const { classList } = document.documentElement;
  classList.remove("vt-forward", "vt-back");
  classList.add(forward ? "vt-forward" : "vt-back");

  if (forward) {
    const hero = document.querySelector(
      "[data-post-hero]",
    ) as HTMLElement | null;
    if (hero) hero.style.viewTransitionName = "";
  }
}

type NavigateWithTransition = (href: string) => void;

const ViewTransitionContext = createContext<NavigateWithTransition>(() => {});

export const useNavigateWithTransition = () =>
  useContext(ViewTransitionContext);

export function ViewTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const resolveRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    resolveRef.current?.();
    resolveRef.current = null;
  }, [pathname]);

  const waitForRender = useCallback(() => {
    return new Promise<void>((resolve) => {
      resolveRef.current?.();
      resolveRef.current = resolve;
      setTimeout(resolve, 800);
    });
  }, []);

  useEffect(() => {
    const handleTraversal = () => {
      const start = getStartViewTransition();
      if (!start) return;
      applyDirection(false);
      start(async () => {
        await waitForRender();
      });
    };

    // Navigation API fires before Next.js processes the navigation,
    // so the DOM is still in the old state when we capture the snapshot.
    if ("navigation" in window) {
      const onNavigate = (e: Event) => {
        if ((e as Event & { navigationType: string }).navigationType !== "traverse") return;
        handleTraversal();
      };
      (window as unknown as Record<string, EventTarget>).navigation.addEventListener("navigate", onNavigate);
      return () =>
        (window as unknown as Record<string, EventTarget>).navigation.removeEventListener("navigate", onNavigate);
    }

    window.addEventListener("popstate", handleTraversal);
    return () => window.removeEventListener("popstate", handleTraversal);
  }, [waitForRender]);

  const navigate: NavigateWithTransition = useCallback(
    (href: string) => {
      const start = getStartViewTransition();
      if (!start) {
        router.push(href);
        return;
      }

      applyDirection(isForwardTransition());

      start(async () => {
        router.push(href);
        await waitForRender();
      });
    },
    [router, waitForRender],
  );

  return (
    <ViewTransitionContext.Provider value={navigate}>
      {children}
    </ViewTransitionContext.Provider>
  );
}
