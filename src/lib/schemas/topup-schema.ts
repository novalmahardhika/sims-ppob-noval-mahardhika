import z from "zod";

export const topUpSchema = z.object({
  top_up_amount: z.coerce
    .number({
      error: 'Must be a number'
    })
    .min(10_000, { message: 'Minimal top up adalah 10.000' })
    .max(1_000_000, { message: 'Maksimal top up adalah 1.000.000' }),
})

export type TopUpSchemaType = z.infer<typeof topUpSchema>

export const topUpDefaultValues: TopUpSchemaType = {
  top_up_amount: 0
}