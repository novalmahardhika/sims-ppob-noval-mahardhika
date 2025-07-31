import { useAppDispatch } from "@/lib/hooks/use-app-dispatch";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { InputField } from "../ui/form-field";
import { Spinner } from "../ui/spinner";
import { useAppSelector } from "@/lib/hooks/use-app-selector";
import { useForm, type Resolver } from "react-hook-form";
import { paymentDefaultValues, paymentSchema, type PaymentSchemaType } from "@/lib/schemas/payment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LiaCcMastercard } from "react-icons/lia";
import { useEffect } from "react";
import { toast } from "sonner";
import { fetchBalance, paymentService } from "@/lib/features/balance/balance-slice";
import type { ErrorPayload } from "@/lib/types/api-type";
import type { ServiceType } from "@/lib/types/service-type";

type FormPaymentProps = {
  item: ServiceType
}

export function FormPayment({ item }: FormPaymentProps) {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.balance)
  const form = useForm<PaymentSchemaType>({
    resolver: zodResolver(paymentSchema) as Resolver<PaymentSchemaType>,
    defaultValues: paymentDefaultValues
  })

  useEffect(() => {
    if (item) {
      form.setValue("amount", item.service_tariff);
      form.setValue("service_code", item.service_code);
    }
  }, [form, item]);

  const submitHandler = async (values: PaymentSchemaType) => {
    const result = await dispatch(paymentService(values))
    if (paymentService.fulfilled.match(result)) {
      toast.success("Top Up berhasil")
      dispatch(fetchBalance())
    } else {
      const error = result.payload as ErrorPayload
      if (error.status === 401) {
        toast.error('Unauthorized')
        return
      }
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="w-full grid gap-3">
        <InputField control={form.control} name="amount" icon={<LiaCcMastercard />} readOnly />
        <Button>{
          isLoading ? <Spinner /> : 'Bayar'}</Button>
      </form>
    </Form>

  )
}
