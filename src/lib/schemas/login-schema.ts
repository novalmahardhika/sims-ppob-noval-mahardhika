import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export type LoginSchemaType = z.infer<typeof loginSchema>

export const loginDefaultValues: LoginSchemaType = {
  email: "",
  password: ""
} 