import { z } from "zod";

export const HealthResponse = z.object({
  status: z.literal("ok"),
  uptime: z.number(),
  timestamp: z.string(),
});
export type HealthResponse = z.infer<typeof HealthResponse>;
