import { createEnv } from "@t3-oss/env-nextjs"
import z from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    ARCJET_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    HUME_API_KEY: z.string().min(1),
    HUME_SECRET_KEY: z.string().min(1),
    GEMINI_API_KEY: z.string().min(1),
  },
  createFinalSchema: env => {
    return z.object(env).transform(val => {
      const { DATABASE_URL, ...rest } = val
      return {
        ...rest,
        DATABASE_URL: DATABASE_URL,
      }
    })
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
})
