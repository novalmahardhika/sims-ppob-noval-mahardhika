import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerDefaultValues, registerSchema, type RegisterSchemaType } from "@/lib/schemas/register-schema";
import { Form } from "../ui/form";
import { InputField } from "../ui/form-field";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { IoIosAt } from "react-icons/io";
import { MdLockOutline, MdPersonOutline } from "react-icons/md";
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/lib/hooks/use-app-selector";
import { registerUser } from "@/lib/features/auth/auth-slice";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import type { ErrorPayload } from "@/lib/types/api-type";


export function FormRegister() {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.auth)
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues
  })

  const submitHandler = async (values: RegisterSchemaType) => {
    const { email, first_name, last_name, password } = values
    const result = await dispatch(registerUser({ email, first_name, last_name, password }))
    if (registerUser.fulfilled.match(result)) {
      toast.success("Register berhasil")
      form.reset()
    } else {
      const error = result.payload as ErrorPayload
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="max-w-sm w-full grid gap-6">
        <InputField control={form.control} name="email" placeholder="masukan email anda" icon={<IoIosAt />} />
        <InputField control={form.control} name="first_name" placeholder="nama depan" icon={<MdPersonOutline />} />
        <InputField control={form.control} name="last_name" placeholder="nama belakang" icon={<MdPersonOutline />} />
        <InputField control={form.control} name="password" placeholder="buat password" icon={<MdLockOutline />} type="password" />
        <InputField control={form.control} name="confirmation_password" placeholder="konfirmasi password" icon={<MdLockOutline />} type="password" />
        <Button className="mt-4" disabled={isLoading}>{
          isLoading ? <Spinner /> : 'Register'
        }</Button>
      </form>
      <div className="text-center text-sm">
        Sudah punya akun ? login{" "}
        <Link to={'/login'} className="text-primary font-semibold">
          di sini
        </Link>
      </div>
    </Form>
  )
}
