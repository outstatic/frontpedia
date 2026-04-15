"use client";
import React, { useState, useContext } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent } from "./ui/dialog";
import { ModalContext } from "@/lib/providers/modal";
import { subscribeSchema } from "@/lib/validations/subscribe";
import SubscribeForm from "./subscribe-form";

type AlertMessagesType = {
  icon: React.ReactNode;
  variant: "success" | "destructive";
  title: string;
  message: string;
} | null;

const SubscribeModal: React.FC = () => {
  const { subscribeOpen, setSubscribeOpen } = useContext(ModalContext);
  const [alert, setAlert] = useState<AlertMessagesType>(null);
  const form = useForm<z.infer<typeof subscribeSchema>>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleCloseModal = () => {
    setSubscribeOpen(false);
    form.reset();
    // Avoid showing form on modal close
    setTimeout(() => {
      setAlert(null);
    }, 500);
  };

  return (
    <>
      <Dialog open={subscribeOpen} onOpenChange={handleCloseModal}>
        <DialogContent initialFocus={false}>
          {alert ? (
            <div className="flex flex-col space-y-4 items-center text">
              {alert.icon}
              <p className="text-xl font-semibold">{alert.title}</p>
              <p className="text-lg">{alert.message}</p>
              <Button type="button" onClick={handleCloseModal}>
                Close
              </Button>
            </div>
          ) : (
            <SubscribeForm
              form={form}
              handleCloseModal={handleCloseModal}
              setAlert={setAlert}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscribeModal;
