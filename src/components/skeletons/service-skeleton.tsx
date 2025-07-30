import { Skeleton } from "../ui/skeleton";

export function ServiceSkeleton() {
  return (
    <div className="grid gap-1" >
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="h-6 w-full" />
    </div>

  )
}
