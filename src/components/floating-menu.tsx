"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { useContext } from "react";
import { ModalContext } from "@/lib/providers/modal";
import { TransitionLink } from "@/components/transition-link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, AtSign, InfoIcon, Pen } from "lucide-react";

type FloatingMenuProps = {
  url?: string;
};

export const FloatingMenu = ({ url }: FloatingMenuProps) => {
  const { setSubscribeOpen, setAboutOpen, setSubmitOpen } =
    useContext(ModalContext);
  const showEmailList = siteConfig.features.emailList;
  const showSubmitContent = siteConfig.features.submitContent;

  return (
    <div className="left-1/2 -translate-x-1/2 w-full md:max-w-xl fixed bottom-5 px-2 md:px-0 z-10">
      <div className="bg-slate-100 border-2 border-slate-900 p-2 rounded-lg grid grid-cols-5 gap-2 md:flex md:justify-between shadow-xl">
        <div className="col-span-1 grid grid-cols-1">
          <TransitionLink href="/" className={buttonVariants()}>
            <Logo short color="white" className="text-2xl md:text-lg" />
          </TransitionLink>
        </div>
        <div
          className={cn(
            "grid col-span-4 md:flex gap-2 grid-cols-4"
          )}
        >
          {!url ? <div /> : null}
          {showSubmitContent ? (
            <Button
              className={buttonVariants()}
              onClick={() => setSubmitOpen(true)}
            >
              <Pen aria-hidden="true" className="inline md:hidden" />{" "}
              <span className="sr-only md:not-sr-only md:inline">Submit</span>
            </Button>
          ) : null}
          {showEmailList ? (
            <Button
              className={buttonVariants()}
              onClick={() => setSubscribeOpen(true)}
            >
              <AtSign aria-hidden="true" className="inline md:hidden" />{" "}
              <span className="sr-only md:not-sr-only md:inline">
                Subscribe
              </span>
            </Button>
          ) : null}
          <Button
            className={buttonVariants()}
            onClick={() => setAboutOpen(true)}
          >
            <InfoIcon aria-hidden="true" className="inline md:hidden" />{" "}
            <span className="sr-only md:not-sr-only md:inline">About</span>
          </Button>
          {url ? (
            <Link
              className={buttonVariants()}
              href={`${url}?ref=frontpedia.com`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight aria-hidden="true" className="inline md:hidden" />{" "}
              <span className="sr-only md:not-sr-only md:inline">
                Visit site
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};
