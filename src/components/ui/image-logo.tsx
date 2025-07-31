import { cn } from "@/lib/utils"
import logo from "../../assets/images/logo-sims.png"


type ImageLogoProps = {
  className?: string
}

export function ImageLogo({ className }: ImageLogoProps) {
  return (
    <img src={logo} alt="image-logo" className={cn('w-12 h-12 object-cover', className)} />
  )
}
