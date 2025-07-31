
import { cn } from '@/lib/utils'
import { Dialog, DialogContent } from './dialog'
import type { ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  children: ReactNode
  className?: string
  onClose?: () => void
}

export function BaseModal({
  children,
  isOpen,
  onClose,
  className,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn('overflow-y-auto sm:max-w-xs p-0 px-3', className)}
        showCloseButton={false}
      >
        <div className='flex justify-center flex-col items-center'>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}