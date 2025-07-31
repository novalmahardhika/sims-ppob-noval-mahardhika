import { ModalTopUp } from "../modals/modal-topup";
import { TopUpSection } from "../topup-section";
import { UserInfo } from "../user-info";

export default function TopUpPage() {

  return (
    <section className="grid gap-6">
      <UserInfo />
      <TopUpSection />
      <ModalTopUp />
    </section>
  )
}
