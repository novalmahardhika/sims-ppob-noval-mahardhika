import { useAuth } from "@/lib/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { FiEye } from "react-icons/fi"
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch"
import { useAppSelector } from "@/lib/hooks/use-app-selector"
import { formatCurrency } from "@/lib/format"
import { useEffect } from "react"
import { fetchBalance } from "@/lib/features/balance/balance-slice"
import backgroundBalance from '../../src/assets/images/background-balance.png'
import avatar from '../../src/assets/images/avatar.png'
import { GoDotFill } from "react-icons/go";
import { toggleHiddenBalance } from "@/lib/features/ui/ui-slice"

export function UserInfo() {
  const { user } = useAuth()
  const dispatch = useAppDispatch()
  const { balance } = useAppSelector((state) => state.balance)
  const { isBalanceHidden } = useAppSelector((state) => state.ui)

  useEffect(() => {
    dispatch(fetchBalance())
  }, [dispatch])

  return (
    <header className="grid md:grid-cols-2">
      <section className="grid gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user?.profile_image} className="w-20 aspect-square" />
          <AvatarFallback>
            <img src={avatar} alt="avatar" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p>Selamat Datang,</p>
          <h1 className="font-medium text-3xl">{`${user?.first_name} ${user?.last_name}`}</h1>
        </div>
      </section>

      <section
        className="relative h-35.5 flex items-center overflow-hidden bg-cover bg-center bg-no-repeat rounded-2xl"
        style={{ backgroundImage: `url(${backgroundBalance})` }}
      >
        <div className="z-10 text-white px-5 grid gap-2">
          <p className="text-sm">Saldo anda</p>
          {isBalanceHidden ? (<h1 className="font-medium text-2xl">{formatCurrency(balance)}</h1>) : (<HideBalance />)}
          <button className="bg-primary text-xs flex items-center gap-2 w-28 py-1 cursor-pointer" onClick={() => dispatch(toggleHiddenBalance())}>
            <span>{isBalanceHidden ? "Tutup Saldo" : 'Lihat Saldo'}</span>
            <FiEye />
          </button>
        </div>
      </section>
    </header>
  )
}

function HideBalance() {
  return (
    <div className="flex items-center">
      <span className="font-medium text-2xl mr-1">Rp</span>
      {
        Array.from({ length: 7 }).map((_, index) => (
          <GoDotFill key={`dot-${index}`} />
        ))
      }
    </div>
  )
}
