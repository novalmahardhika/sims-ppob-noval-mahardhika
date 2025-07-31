import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { InputField } from "../ui/form-field";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";
import { loginDefaultValues, loginSchema, type LoginSchemaType } from "@/lib/schemas/login-schema";
import { IoIosAt } from "react-icons/io";
import { MdLockOutline } from "react-icons/md";
import { useAppSelector } from "@/lib/hooks/use-app-selector";
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch";
import { Spinner } from "../ui/spinner";
import { fetchCurrentUser, loginUser } from "@/lib/features/auth/auth-slice";
import { toast } from "sonner";
import type { ErrorPayload } from "@/lib/types/api-type";


export default function FormLogin() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.auth)
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues
  })

  const submitHandler = async (values: LoginSchemaType) => {
    const result = await dispatch(loginUser(values))
    if (loginUser.fulfilled.match(result)) {
      toast.success("Login berhasil")
      form.reset()
      await dispatch(fetchCurrentUser())
      navigate(0)
    } else {
      const error = result.payload as ErrorPayload
      toast.error(error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="max-w-sm w-full grid gap-6">
        <InputField control={form.control} name="email" placeholder="masukan email anda" icon={<IoIosAt />} />
        <InputField control={form.control} name="password" placeholder="masukan password anda" icon={<MdLockOutline />} type="password" />
        <Button className="mt-4">{
          isLoading ? <Spinner /> : 'Masuk'}</Button>
      </form>
      <div className="text-center text-sm">
        Belum punya akun ? registrasi{" "}
        <Link to={'/register'} className="text-primary font-semibold">
          di sini
        </Link>
      </div>
    </Form>
  )
}
