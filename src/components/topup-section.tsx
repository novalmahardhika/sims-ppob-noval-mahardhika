import { FormTopUp } from "./forms/form-topup";


export function TopUpSection() {
  return (
    <section className="grid gap-3">
      <div className="grid gap-1">
        <span>Silahkan masukan</span>
        <h1 className="font-medium text-3xl">Nominal Top Up</h1>
      </div>
      <FormTopUp />
    </section>
  )
}
