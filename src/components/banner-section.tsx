import { fetchBanner } from "@/lib/features/banner/banner-slice"
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch"
import { useAppSelector } from "@/lib/hooks/use-app-selector"
import { useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export function BannerSection() {
  const dispatch = useAppDispatch()
  const { banners } = useAppSelector((state) => state.banner)

  useEffect(() => {
    dispatch(fetchBanner())
  }, [dispatch])


  return (
    <section className="grid gap-3">
      <h2 className="font-medium">Temukan promo menarik</h2>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true
        }}
        className="w-full"
      >
        <CarouselContent >
          {banners.map((banner, index) => (
            <CarouselItem key={`banner-item-${index}`} className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <img src={banner.banner_image} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
