import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      <div className="flex justify-center items-center">
        <Outlet />
      </div>
      <div className="bg-primary-foreground relative hidden lg:flex overflow-hidden justify-end items-center">
        <img src="/src/assets/images/illustration-auth.png" alt="illustration" className="absolute" />
      </div>
    </section>
  )
}
