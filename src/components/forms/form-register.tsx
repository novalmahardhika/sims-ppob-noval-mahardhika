import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerDefaultValues, registerSchema, type RegisterSchemaType } from "@/lib/schemas/register-schema";
import { Form } from "../ui/form";
import { InputField } from "../ui/form-field";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { IoIosAt } from "react-icons/io";
import { MdLockOutline, MdPersonOutline } from "react-icons/md";


export function FormRegister() {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues
  })

  const submitHandler = (values: RegisterSchemaType) => {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="max-w-sm w-full grid gap-6">
        <InputField control={form.control} name="email" placeholder="masukan email anda" icon={<IoIosAt />} />
        <InputField control={form.control} name="firstName" placeholder="nama depan" icon={<MdPersonOutline />} />
        <InputField control={form.control} name="lastName" placeholder="nama belakang" icon={<MdPersonOutline />} />
        <InputField control={form.control} name="password" placeholder="buat password" icon={<MdLockOutline />} type="password" />
        <InputField control={form.control} name="confirmationPassword" placeholder="konfirmasi password" icon={<MdLockOutline />} type="password" />
        <Button className="mt-4">Registrasi</Button>
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
