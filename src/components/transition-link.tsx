"use client";

import Link from "next/link";
import { useNavigateWithTransition } from "@/lib/providers/view-transition";
import type { ComponentProps, MouseEvent } from "react";

type TransitionLinkProps = ComponentProps<typeof Link>;

export function TransitionLink({
  href,
  children,
  onClick,
  ...props
}: TransitionLinkProps) {
  const navigate = useNavigateWithTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;

    const url = typeof href === "string" ? href : (href.pathname ?? "/");
    if (url.startsWith("http")) return;

    e.preventDefault();
    navigate(url);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
