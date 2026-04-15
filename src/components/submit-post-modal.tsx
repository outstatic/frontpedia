"use client";
import React, { useState, useContext } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitSchema } from "@/lib/validations/submit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent } from "./ui/dialog";
import { ModalContext } from "@/lib/providers/modal";
import SubmitPostForm from "./submit-post-form";

type AlertMessagesType = {
  icon: React.ReactNode;
  variant: "success" | "destructive";
  title: string;
  message: string;
} | null;

export const SubmitPostModal: React.FC = () => {
  const { submitOpen, setSubmitOpen } = useContext(ModalContext);
  const [alert, setAlert] = useState<AlertMessagesType>(null);
  const form = useForm<z.infer<typeof submitSchema>>({
    resolver: zodResolver(submitSchema),
    defaultValues: {
      postType: "Resources",
      website: "",
      credits: "",
    },
  });

  const handleCloseModal = () => {
    setSubmitOpen(false);
    form.reset();
    // Avoid showing form on modal close
    setTimeout(() => {
      setAlert(null);
    }, 500);
  };

  return (
    <>
      <Dialog open={submitOpen} onOpenChange={handleCloseModal}>
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
            <SubmitPostForm
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
