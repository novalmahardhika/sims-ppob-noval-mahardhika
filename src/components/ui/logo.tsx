import { cn } from "@/lib/utils";

type LogoProps = {
  size?: 'sm' | 'base'
}

export function Logo({ size = 'base' }: LogoProps) {
  return (
    <span className='flex gap-1.5 items-center'>
      <img
        src="/src/assets/images/logo-sims.png"
        alt="logo"
        className={cn('w-7 aspect-square', size === 'sm' && 'w-6')}
      />
      <h1
        className={cn('font-semibold text-xl', size === 'sm' && 'text-lg')}
      >
        SIMS PPOB
      </h1>
    </span>
  )
}

