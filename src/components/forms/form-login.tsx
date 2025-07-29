import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { InputField } from "../ui/form-field";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { loginDefaultValues, loginSchema, type LoginSchemaType } from "@/lib/schemas/login-schema";
import { IoIosAt } from "react-icons/io";
import { MdLockOutline } from "react-icons/md";


export default function FormLogin() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues
  })

  const submitHandler = (values: LoginSchemaType) => {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="max-w-sm w-full grid gap-6">
        <InputField control={form.control} name="email" placeholder="masukan email anda" icon={<IoIosAt />} />
        <InputField control={form.control} name="password" placeholder="masukan password anda" icon={<MdLockOutline />} type="password" />
        <Button className="mt-4">Masuk</Button>
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
