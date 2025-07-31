import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Logo } from "../ui/logo";
import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";


export function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation();
  const { isLoading, token } = useAuth()

  useEffect(() => {
    if (!isLoading && !token) {
      navigate('/login')
    }
  }, [isLoading, token, navigate])

  return (
    <div>
      <header className="h-16 border-b">
        <nav className="h-full px-3 xl:px-0 max-w-6xl mx-auto flex justify-between items-center">
          <Logo size="sm" href="/" className="cursor-pointer" />
          <span className="hidden md:flex gap-8 font-medium text-sm">
            <Link to="/topup" className={cn(location.pathname === '/topup' && 'text-primary')}>Top Up</Link>
            <Link to="/transaction" className={cn(location.pathname === '/transaction' && 'text-primary')}>Transaction</Link>
            <Link to="/account" className={cn(location.pathname === '/account' && 'text-primary')}>Akun</Link>
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-2xl md:hidden">
              <BiDotsHorizontalRounded />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/topup" className={cn(location.pathname === '/topup' && 'text-primary')}>Top Up</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/transaction" className={cn(location.pathname === '/transaction' && 'text-primary')}>Transaction</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/account" className={cn(location.pathname === '/account' && 'text-primary')}>Akun</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>


      </header>
      <main className="max-w-6xl mx-auto px-3 xl:px-0 mt-6">
        <Outlet />
      </main>
    </div>
  )
}
