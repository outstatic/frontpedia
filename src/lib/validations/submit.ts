"use client";

import * as z from "zod";

const typeEnum = z
  .enum(["Resources", "Inspiration", "People"])
  .describe("Type of submission");

const websiteSchema = z
  .string()
  .url({ message: "Hey, that URL is invalid. Wanna try again?" })
  .describe("Website URL");

const props = {
  website: websiteSchema,
  credits: z.string().optional().describe("Credits for submission"),
};

const resourceSchema = z.object({
  postType: z.literal(typeEnum.enum.Resources),
  ...props,
});

const inspirationSchema = z.object({
  postType: z.literal(typeEnum.enum.Inspiration),
  ...props,
});

const peopleSchema = z.object({
  postType: z.literal(typeEnum.enum.People),
  ...props,
  website: props.website.optional(),
});

export const submitSchema = z.discriminatedUnion("postType", [
  resourceSchema,
  inspirationSchema,
  peopleSchema,
]);
