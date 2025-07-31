import { topUpSchema, type TopUpSchemaType } from "@/lib/schemas/topup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { Form } from "../ui/form";
import { InputField, RadioButtonField } from "../ui/form-field";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/lib/hooks/use-app-selector";
import { NOMINAL_OPTIONS } from "@/lib/constants";
import { openModal } from "@/lib/features/ui/ui-slice";
import { LiaCcMastercard } from "react-icons/lia";

export function FormTopUp() {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.topup)
  const form = useForm<TopUpSchemaType>({
    resolver: zodResolver(topUpSchema) as Resolver<TopUpSchemaType>,
  })

  const submitHandler = async (values: TopUpSchemaType) => {
    dispatch(openModal({ name: 'topUp', props: values }))
  }

  const nominal = form.watch('top_up_amount')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="w-full grid md:grid-cols-2 gap-3 mt-6">
        <div className="w-full grid gap-3">
          <InputField control={form.control} name="top_up_amount" placeholder="masukan nominal Top Up" type="number" icon={<LiaCcMastercard />} />
          <Button
            className=" disabled:bg-zinc-400 disabled:cursor-not-allowed"
            disabled={isLoading || !nominal}
          >{
              isLoading ? <Spinner /> : 'Top Up'}
          </Button>
        </div>
        <RadioButtonField control={form.control} name='top_up_amount' options={NOMINAL_OPTIONS} />
      </form>
    </Form>
  )
}
