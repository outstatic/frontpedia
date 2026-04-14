"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { useContext } from "react";
import { ModalContext } from "@/lib/providers/modal";
import { siteConfig } from "@/config/site";

type SubmitPostButtonProps = {
  children?: React.ReactNode;
};

export const SubmitPostButton = ({ children }: SubmitPostButtonProps) => {
  const { setSubmitOpen } = useContext(ModalContext);

  if (!siteConfig.features.submitContent) {
    return null;
  }

  return (
    <Button className={buttonVariants()} onClick={() => setSubmitOpen(true)}>
      {children ? children : "Submit"}
    </Button>
  );
};
