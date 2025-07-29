import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string
  logoClassName?: string
  textClassName?: string
}

export function Logo({ className, logoClassName, textClassName }: LogoProps) {
  return (
    <span className={cn('flex gap-2 items-center', className)}>
      <img src="/src/assets/images/logo-sims.png" alt="logo" className={cn('', logoClassName)} />
      <h1 className={cn('font-semibold text-xl', textClassName)}>SIMS PPOB</h1>
    </span>
  )
}
