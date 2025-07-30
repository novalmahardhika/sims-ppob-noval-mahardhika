import { useEffect } from "react"
import { fetchService } from "@/lib/features/service/service-slice"
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch"
import { useAppSelector } from "@/lib/hooks/use-app-selector"
import { ServiceSkeleton } from "./skeletons/service-skeleton"

export function ServiceSection() {
  const dispatch = useAppDispatch()
  const { isLoading, services } = useAppSelector((state) => state.service)

  useEffect(() => {
    dispatch(fetchService())
  }, [dispatch])


  if (isLoading) {
    return (
      <section className="grid grid-cols-12 gap-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <ServiceSkeleton key={`service-load-${index}`} />
        ))}
      </section>
    )
  }

  return (
    <section className="grid grid-cols-12 gap-3">
      {services.map((service, index) => (
        <div
          key={`service-item-${index}`}
          className="col-span-1 flex flex-col items-center text-center "
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
        </div>
      ))}
    </section>
  )
}


