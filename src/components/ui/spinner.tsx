import { cn } from "@/lib/utils";
import { ImSpinner8 } from "react-icons/im";

type SpinnerProps = {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <ImSpinner8 className={cn('animate-spin', className)} />
  )
}
