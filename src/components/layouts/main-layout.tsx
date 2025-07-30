import { Link, Outlet } from "react-router";
import { Logo } from "../ui/logo";


export function MainLayout() {
  return (
    <div>
      <header className="h-16 border-b">
        <nav className="h-full px-3 xl:px-0 max-w-7xl mx-auto flex justify-between items-center">
          <Logo size="sm" />
          <span className="flex gap-8 font-medium">
            <Link to="/topup">Top Up</Link>
            <Link to="/transaction">Transaction</Link>
            <Link to="/account">Akun</Link>
          </span>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-3 xl:px-0 mt-3">
        <Outlet />
      </main>
    </div>
  )
}
