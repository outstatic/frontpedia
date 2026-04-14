"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

type ModalContextValue = {
  submitOpen: boolean;
  setSubmitOpen: Dispatch<SetStateAction<boolean>>;
  subscribeOpen: boolean;
  setSubscribeOpen: Dispatch<SetStateAction<boolean>>;
  aboutOpen: boolean;
  setAboutOpen: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextValue>({
  submitOpen: false,
  setSubmitOpen: () => {},
  subscribeOpen: false,
  setSubscribeOpen: () => {},
  aboutOpen: false,
  setAboutOpen: () => {},
});

export const ModalProvider = ({ children }) => {
  const [submitOpen, setSubmitOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        submitOpen,
        setSubmitOpen,
        subscribeOpen,
        setSubscribeOpen,
        aboutOpen,
        setAboutOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
