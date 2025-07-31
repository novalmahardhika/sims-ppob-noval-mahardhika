import { HistoryTransactionSection } from "../history-transaction";
import { UserInfo } from "../user-info";

export default function TransactionPage() {
  return (
    <section className="grid gap-6">
      <UserInfo />
      <HistoryTransactionSection />
    </section>
  )
}
