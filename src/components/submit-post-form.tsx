"use client";
import React, { SetStateAction, useCallback, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { AlertCircle, Loader2, PartyPopper } from "lucide-react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";
import { submitSchema } from "@/lib/validations/submit";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Alert, AlertDescription } from "./ui/alert";

const alertMessages = {
  success: {
    icon: <PartyPopper className="h-10 w-10" />,
    variant: "success" as const,
    title: "Thank you for that beautiful suggestion!",
    message: "We'll review it shortly.",
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

const postTypeDescription = {
  Resources: {
    description:
      "Share links to tutorials, articles, videos, libraries, tools, etc...",
  },
  Inspiration: {
    description: "Share links to websites that inspire you.",
  },
  People: {
    description:
      "Share links to people's websites, portfolios, social media, etc...",
  },
};

type SubmitPostModalProps = {
  setAlert: React.Dispatch<SetStateAction<AlertMessagesType>>;
  form: UseFormReturn<z.infer<typeof submitSchema>>;
  handleCloseModal: () => void;
};

const SubmitPostForm = ({
  setAlert,
  form,
  handleCloseModal,
}: SubmitPostModalProps) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const postType = useWatch({
    control: form.control,
    name: "postType",
    defaultValue: "Resources",
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof submitSchema>) => {
      setSubmitting(true);

      const response = await fetch("/submit", {
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="postType"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Suggest a link:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value ?? "Resources"}
                      aria-label="Select the type of content you want to submit"
                      className="flex"
                    >
                      <div className="flex items-center gap-2">
                        {["Resources", "Inspiration", "People"].map((type) => {
                          const isSelected = postType === type;
                          return (
                            <div key={type} className="flex items-center">
                              <FormItem className="relative overflow-visible">
                                <FormControl>
                                  <RadioGroupItem
                                    id={type}
                                    value={type}
                                    className="hidden"
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor={type}
                                  className={cn(
                                    buttonVariants({
                                      variant: isSelected ? "default" : "outline",
                                    }),
                                    "relative cursor-pointer",
                                    isSelected
                                      ? "after:content-[''] after:absolute after:bottom-[-24px] after:left-1/2 after:h-[15px] after:w-[15px] after:-translate-x-1/2 after:rotate-45 after:rounded-none after:bg-black"
                                      : "after:hidden"
                                  )}
                                >
                                  {type}
                                </FormLabel>
                              </FormItem>
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <Alert className="bg-foreground text-background min-h-18 md:min-h-0 border-foreground">
                  <AlertDescription>
                    {postTypeDescription[postType].description}
                  </AlertDescription>
                </Alert>
              </>
            )}
          />

          {postType !== "People" ? (
            <>
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://frontpedia.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website or social media</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://x.com/veronezidev"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="credits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  We want to give you a shout out! How can we credit you?
                  (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://x.com/AndreVitorio"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 flex justify-end space-x-3">
            <Button
              variant="outline"
              type="button"
              onClick={handleCloseModal}
              disabled={submitting}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant={submitting ? "ghost" : "default"}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SubmitPostForm;
