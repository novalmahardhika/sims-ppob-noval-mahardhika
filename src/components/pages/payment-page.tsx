import { useAppSelector } from "@/lib/hooks/use-app-selector";
import { FormPayment } from "../forms/form-payment";
import { UserInfo } from "../user-info";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>()
  const { services } = useAppSelector((state) => state.service)
  const navigate = useNavigate()
  const item = services.find((service) => service.service_code === id)

  useEffect(() => {
    if (!item) navigate("/");
  }, [item, navigate]);

  if (!item) return null

  return (
    <section className="grid gap-6">
      <UserInfo />
      <div className="grid gap-3">
        <span>Pembayaran</span>
        <div className="flex items-center gap-3">
          <img src={item.service_icon} className="w-10 h-10" />
          <span className="font-medium">{item.service_name}</span>
        </div>
      </div>
      <FormPayment item={item} />
    </section>
  )
}
