import { useState } from 'react'
import { BaseModal } from '../ui/base-modal'
import { ImageLogo } from '../ui/image-logo'
import { Button } from '../ui/button'
import { IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { useAppDispatch } from '@/lib/hooks/use-app-dispatch'
import { closeModal } from '@/lib/features/ui/ui-slice'
import { useNavigate } from 'react-router'
import { useAppSelector } from '@/lib/hooks/use-app-selector'
import { formatCurrency } from '@/lib/format'
import { topUpBalance } from '@/lib/features/topup/topup-service'
import type { TopUpSchemaType } from '@/lib/schemas/topup-schema'
import { fetchBalance } from '@/lib/features/balance/balance-slice'
import type { ErrorPayload } from '@/lib/types/api-type'
import { toast } from 'sonner'

export function ModalTopUp() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { topUp } = useAppSelector((state) => state.ui.modals)
  const [status, setStatus] = useState<'confirm' | 'success' | 'cancel'>('confirm')

  const successHandler = async () => {
    const result = await dispatch(topUpBalance(topUp.props as TopUpSchemaType))
    if (topUpBalance.fulfilled.match(result)) {
      dispatch(fetchBalance())
    } else {
      const error = result.payload as ErrorPayload
      if (error.status === 401) {
        toast.error('Unauthorized')
        setStatus('cancel')
        return
      }
      toast.error(error.message)
      setStatus('cancel')
      return
    }
    setStatus('success')
  }

  const cancelHandler = () => {
    setStatus('cancel')
  }

  const backToHomeHandler = () => {
    dispatch(closeModal('topUp'))
    navigate('/')
  }

  return (
    <BaseModal isOpen={topUp.isOpen}>
      {
        status === 'confirm' && (
          <section className='flex flex-col items-center py-6 gap-6'>
            <ImageLogo />
            <div className='text-center text-sm'>
              <span>Anda yakin mau top up sebesar</span>
              <h1 className='text-2xl font-semibold'>{formatCurrency(topUp.props?.top_up_amount ?? 0)} ?</h1>
            </div>
            <div className='grid w-full gap-1'>
              <Button variant={'ghost'} className='text-primary hover:text-primary/85' onClick={successHandler}>Ya, lanjutkan Top Up</Button>
              <Button variant={'ghost'} className='text-muted-foreground/50 hover:text-muted-foreground/85' onClick={cancelHandler}>Batalkan</Button>
            </div>
          </section>
        )
      }
      {
        status === 'success' && (
          <section className='flex flex-col items-center py-6 gap-6'>
            <div className='w-12 h-12 bg-emerald-400 rounded-full flex justify-center items-center'>
              <IoMdCheckmark className='text-3xl text-white' />
            </div>
            <div className='text-center grid gap-1 text-sm'>
              <span>Top Up sebesar</span>
              <h1 className='text-2xl font-semibold'>{formatCurrency(topUp.props?.top_up_amount ?? 0)}</h1>
              <span>Berhasil</span>
            </div>
            <div className='grid w-full gap-1'>
              <Button variant={'ghost'} className='text-primary hover:text-primary/85' onClick={backToHomeHandler}>Kembali ke beranda</Button>
            </div>
          </section>
        )
      }
      {
        status === 'cancel' && (
          <section className='flex flex-col items-center py-6 gap-6'>
            <div className='w-12 h-12 bg-primary rounded-full flex justify-center items-center'>
              <IoMdClose className='text-3xl text-white' />
            </div>
            <div className='text-center grid gap-1 text-sm'>
              <span>Top Up sebesar</span>
              <h1 className='text-2xl font-semibold'>{formatCurrency(topUp.props?.top_up_amount ?? 0)}</h1>
              <span>gagal</span>
            </div>
            <div className='grid w-full gap-1'>
              <Button variant={'ghost'} className='text-primary hover:text-primary/85' onClick={backToHomeHandler}>Kembali ke beranda</Button>
            </div>
          </section>
        )
      }
    </BaseModal>
  )
}
