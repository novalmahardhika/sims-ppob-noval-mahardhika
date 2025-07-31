import { cn } from "@/lib/utils";
import logoImage from '../../assets/images/logo-sims.png'
import { useNavigate } from "react-router";

type LogoProps = {
  size?: 'sm' | 'base'
  href?: string
  className?: string
}

export function Logo({ size = 'base', href = '#', className }: LogoProps) {
  const navigate = useNavigate()
  return (
    <span className={cn('flex gap-1.5 items-center', className)} onClick={() => navigate(href)}>
      <img
        src={logoImage}
        alt="logo"
        className={cn('w-7 aspect-square', size === 'sm' && 'w-6')}
      />
      <h1 className={cn('font-semibold text-xl', size === 'sm' && 'text-lg')}>
        SIMS PPOB
      </h1>
    </span>
  )
}

