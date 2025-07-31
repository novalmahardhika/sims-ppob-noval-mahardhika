import { z } from "zod"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"]

export const updateProfileSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  profile_image: z
    .instanceof(File)
    .refine((file) => file.size <= 100_000, {
      message: "Image must be smaller than 100KB",
    })
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpeg or .png files are allowed",
    })
    .or(z.literal(null))
})

export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>

export const updateProfileDefaultValues: UpdateProfileSchemaType = {
  email: '',
  first_name: '',
  last_name: '',
  profile_image: null
}