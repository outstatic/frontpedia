"use client";

import * as z from "zod";

export const subscribeSchema = z.object({
  email: z.string().email().min(1).max(254),
});
