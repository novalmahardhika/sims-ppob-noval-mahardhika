import { Link, Outlet, useNavigate } from "react-router";
import { Logo } from "../ui/logo";
import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect } from "react";


export function MainLayout() {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isLoading, isAuthenticated, navigate])

  return (
    <div>
      <header className="h-16 border-b">
        <nav className="h-full px-3 xl:px-0 max-w-6xl mx-auto flex justify-between items-center">
          <Logo size="sm" href="/" className="cursor-pointer" />
          <span className="flex gap-8 font-medium text-sm">
            <Link to="/topup">Top Up</Link>
            <Link to="/transaction">Transaction</Link>
            <Link to="/account">Akun</Link>
          </span>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-3 xl:px-0 mt-6">
        <Outlet />
      </main>
    </div>
  )
}
