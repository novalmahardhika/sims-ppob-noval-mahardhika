import { fetchHistoryTransaction } from "@/lib/features/balance/balance-slice"
import { formatCurrency, formatLocaleDate } from "@/lib/format"
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch"
import { useAppSelector } from "@/lib/hooks/use-app-selector"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

export function HistoryTransactionSection() {
  const dispatch = useAppDispatch()
  const { transactions } = useAppSelector((state) => state.balance)


  useEffect(() => {
    dispatch(fetchHistoryTransaction())
  }, [dispatch])

  return (
    <section className="grid gap-3">
      <h1 className="font-medium">Semua Transaksi</h1>
      <section className="grid gap-3">
        {transactions.map((item, index) => (
          <div key={`history-item-${index}`} className="border rounded p-3 flex justify-between">
            <span className="grid gap-1">
              <h2 className={cn('text-lg font-medium',
                item.transaction_type === 'TOPUP' ? 'text-green-400' : 'text-red-400'
              )}>{`${item.transaction_type === 'TOPUP' ? "+" : "-"} ${formatCurrency(item.total_amount)}`}</h2>
              <p className="text-xs text-muted-foreground">{formatLocaleDate(item.created_on)}</p>
            </span>

            <span className="text-xs" >{item.description}</span>
          </div>
        ))}
      </section>
    </section>
  )
}
