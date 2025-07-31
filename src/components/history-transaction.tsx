import { fetchHistoryTransaction, resetTransactions } from "@/lib/features/balance/balance-slice"
import { formatCurrency, formatLocaleDate } from "@/lib/format"
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch"
import { useAppSelector } from "@/lib/hooks/use-app-selector"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"

export function HistoryTransactionSection() {
  const dispatch = useAppDispatch()
  const { transactions, offset, limit, isLoading } = useAppSelector((state) => state.balance)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    dispatch(resetTransactions())
    dispatch(fetchHistoryTransaction({ offset: 0, limit }))
  }, [dispatch, limit])

  const handleShowMore = () => {
    dispatch(fetchHistoryTransaction({ offset, limit }))
  }

  if (isLoading) {
    return (<section className="grid gap-3">
      <h1 className="font-medium">Semua Transaksi</h1>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton className="rounded p-9" key={`history-load-${index}`} />
      ))}
    </section>)
  }

  if (transactions.length === 0) {
    return (<section className="grid gap-14">
      <h1 className="font-medium">Semua Transaksi</h1>
      <span className="text-center text-muted-foreground/60">Maaf tidak ada history transaksi</span>
    </section>)
  }

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
            <span className="text-sm" >{item.description}</span>
          </div>
        ))}
      </section>

      <div className="my-6 text-center">
        <Button
          variant={'ghost'}
          onClick={handleShowMore}
          disabled={isLoading}
          className="text-primary hover:text-primary/80"
        >
          {isLoading ? 'Loading...' : 'Show More'}
        </Button>
      </div>
    </section>
  )
}
