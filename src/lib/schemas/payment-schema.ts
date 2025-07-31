import z from "zod";

export const paymentSchema = z.object({
  service_code: z.string().trim().min(1, { message: "Service code is required" }),
  amount: z.coerce
    .number({
      error: "Amount must be a number",
    })
    .min(1, { message: "Amount must be greater than zero" }),
})

export type PaymentSchemaType = z.infer<typeof paymentSchema>

export const paymentDefaultValues: PaymentSchemaType = {
  service_code: '',
  amount: 0
}