"use client";

import { ReactNode, useContext } from "react";
import { ModalContext } from "@/lib/providers/modal";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface AboutModalClientProps {
  children?: ReactNode;
  title: string;
}

const AboutModalClient = ({ children, title }: AboutModalClientProps) => {
  const { aboutOpen, setAboutOpen } = useContext(ModalContext);

  return (
    <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
      <DialogContent>
        <DialogTitle className="text-xl">{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AboutModalClient;
