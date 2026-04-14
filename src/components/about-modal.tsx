"use client";
import React, { useContext } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { ModalContext } from "@/lib/providers/modal";

const AboutModal: React.FC = () => {
  const { aboutOpen, setAboutOpen } = useContext(ModalContext);

  const handleCloseModal = () => {
    setAboutOpen(false);
  };

  return (
    <>
      <Dialog open={aboutOpen} onOpenChange={handleCloseModal}>
        <DialogContent>
          <h1 className="text-xl font-semibold">About Frontpedia</h1>
          <p>
            Frontpedia is a community-driven platform where front-end developers
            and designers can share and discover content.
          </p>
          <p>
            Created by{" "}
            <a href="https://pacy.co/?ref=frontpedia" target="_blank">
              Pacy
            </a>{" "}
            - Digital design for fast-paced businesses.
          </p>
          <p>
            This site is{" "}
            <a href="https://github.com/outstatic/frontpedia" target="_blank">
              open source
            </a>
            .
          </p>
          <h2 className="text-lg font-semibold">Credits</h2>
          <ul>
            <li>
              <a href="https://x.com/AndreVitorio" target="_blank">
                Andre Vitorio
              </a>{" "}
              - Founding Design Engineer Pacy.co
            </li>
            <li>
              <a href="https://x.com/veronezidev" target="_blank">
                Filipe Veronezi
              </a>{" "}
              - Design Engineer Pacy.co
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AboutModal;
