import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function AuthLayout() {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/')
    }
  }, [isLoading, isAuthenticated, navigate])

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
