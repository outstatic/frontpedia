"use client";
import React, { SetStateAction, useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AlertCircle, Loader2, PartyPopper } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { subscribeSchema } from "@/lib/validations/subscribe";

const alertMessages = {
  success: {
    icon: <PartyPopper className="h-10 w-10" />,
    variant: "success" as const,
    title: "Thank you for subscribing!",
    message: "Good things are coming to your inbox.",
  },
  error: {
    icon: <AlertCircle className="h-10 w-10" />,
    variant: "destructive" as const,
    title: "Oops!",
    message: "Something went wrong. Please, try again later.",
  },
};

type AlertMessagesType = {
  icon: React.ReactNode;
  variant: "success" | "destructive";
  title: string;
  message: string;
} | null;

type SubmitPostModalProps = {
  setAlert: React.Dispatch<SetStateAction<AlertMessagesType>>;
  form: UseFormReturn<z.infer<typeof subscribeSchema>>;
  handleCloseModal: () => void;
};

const SubscribeForm = ({ setAlert, form }: SubmitPostModalProps) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onSubmit = useCallback(
    async (values: z.infer<typeof subscribeSchema>) => {
      setSubmitting(true);

      const response = await fetch("/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      });

      const data = await response.json();

      setAlert(data.success ? alertMessages.success : alertMessages.error);
      setSubmitting(false);
    },
    [setAlert]
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Front-End Dev & Design Delight
        </h3>
        <p>
          The latest in frontend dev & design straight to your inbox
          every&nbsp;week!
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} placeholder="Your email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant={submitting ? "ghost" : "default"}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Subscribe
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SubscribeForm;
