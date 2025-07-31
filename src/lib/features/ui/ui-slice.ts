import type { TopUpSchemaType } from "@/lib/schemas/topup-schema"
import type { ServiceType } from "@/lib/types/service-type"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type ModalName = 'topUp' | 'payment'

type ModalPropsMap = {
  topUp: TopUpSchemaType,
  payment: ServiceType
}

type InitialStateType = {
  isBalanceHidden: boolean
  modals: {
    [K in ModalName]: {
      isOpen: boolean
      props: ModalPropsMap[K] | null
    }
  }
}

const initialState: InitialStateType = {
  isBalanceHidden: false,
  modals: {
    topUp: { isOpen: false, props: null },
    payment: { isOpen: false, props: null }
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleHiddenBalance: (state) => {
      state.isBalanceHidden = !state.isBalanceHidden
    },
    openModal: (state, action: PayloadAction<{ name: ModalName, props: ModalPropsMap['topUp'] | ModalPropsMap['payment'] }>) => {
      const { name, props } = action.payload
      state.modals[name].isOpen = true
      state.modals[name].props = props
    },
    closeModal: (state, action: PayloadAction<ModalName>) => {
      const name = action.payload
      state.modals[name].isOpen = false
      state.modals[name].props = null
    }
  },
})

export const { toggleHiddenBalance, openModal, closeModal } = uiSlice.actions

export default uiSlice.reducer


