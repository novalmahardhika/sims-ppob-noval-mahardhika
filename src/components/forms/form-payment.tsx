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
import type { ServiceType } from "@/lib/types/service-type";
import { openModal } from "@/lib/features/ui/ui-slice";

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

  const submitHandler = async () => {
    dispatch(openModal({ name: 'payment', props: item }))

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
