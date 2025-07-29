import FormLogin from "../forms/form-login"
import { Logo } from "../ui/logo"

export default function LoginPage() {
  return (
    <section className="max-w-sm w-full grid gap-10 sm:px-0 px-3">
      <header className="flex justify-center items-center flex-col max-w-72 mx-auto gap-10">
        <Logo />
        <h1 className="font-semibold text-center text-2xl">Masuk atau buat akun untuk memulai</h1>
      </header>
      <FormLogin />
    </section>
  )
}
