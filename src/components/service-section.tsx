import { useEffect } from "react"
import { fetchService } from "@/lib/features/service/service-slice"
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch"
import { useAppSelector } from "@/lib/hooks/use-app-selector"
import { ServiceSkeleton } from "./skeletons/service-skeleton"
import { useNavigate } from "react-router"

export function ServiceSection() {
  const dispatch = useAppDispatch()
  const { isLoading, services } = useAppSelector((state) => state.service)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchService())
  }, [dispatch])


  if (isLoading) {
    return (
      <section className="grid grid-cols-3 sm:grid-cols-6 xl:grid-cols-12 gap-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <ServiceSkeleton key={`service-load-${index}`} />
        ))}
      </section>
    )
  }

  return (
    <section className="grid grid-cols-3 sm:grid-cols-6 xl:grid-cols-12 gap-3">
      {services.map((service, index) => (
        <button
          key={`service-item-${index}`}
          className="col-span-1 flex flex-col items-center text-center cursor-pointer"
          onClick={() => navigate(`/transaction/${service.service_code}`)}
        >
          <div className="w-full aspect-square flex items-center justify-center">
            <img
              src={service.service_icon}
              alt={service.service_code}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <span className="text-xs w-full">
            {service.service_name}
          </span>
        </button>
      ))}
    </section>
  )
}


