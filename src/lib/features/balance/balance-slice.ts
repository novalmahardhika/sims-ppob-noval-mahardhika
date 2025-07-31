import { api } from "@/lib/api"
import type { PaymentSchemaType } from "@/lib/schemas/payment-schema"
import type { ApiResponse } from "@/lib/types/api-type"
import type { PaymentType, ResponseTransactionType, TransactionType } from "@/lib/types/transaction-type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { AxiosError } from "axios"

type InitialStateType = {
  transactions: TransactionType[]
  balance: number
  isLoading: boolean
  isHidden: boolean
}

const initialState: InitialStateType = {
  transactions: [],
  balance: 0,
  isLoading: false,
  isHidden: false
}

export const paymentService = createAsyncThunk('/payment', async (data: PaymentSchemaType, { rejectWithValue }) => {
  try {
    const { service_code } = data
    const res = await api.post<ApiResponse<PaymentType>>('/transaction', { service_code })
    return res.data.data
  } catch (e: unknown) {
    const error = e as AxiosError<ApiResponse>
    return rejectWithValue({
      status: error.response?.status || 500,
      message: error.response?.data.message || 'Terjadi kesalahan, silahkan coba lagi!'
    })
  }
})


export const fetchBalance = createAsyncThunk('/balance', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<ApiResponse<{ balance: number }>>('/balance')
    return res.data.data
  } catch (e: unknown) {
    const error = e as AxiosError<ApiResponse>
    return rejectWithValue({
      status: error.response?.status || 500,
      message: error.response?.data.message || 'Terjadi kesalahan, silahkan coba lagi!'
    })
  }
})

export const fetchHistoryTransaction = createAsyncThunk('/transaction/history', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<ApiResponse<ResponseTransactionType>>('/transaction/history')
    return res.data.data
  } catch (e: unknown) {
    const error = e as AxiosError<ApiResponse>
    return rejectWithValue({
      status: error.response?.status || 500,
      message: error.response?.data.message || 'Terjadi kesalahan, silahkan coba lagi!'
    })
  }
})

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH BALANCE FLOW
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.isLoading = false
        state.balance = action.payload.balance
      })
      .addCase(fetchBalance.rejected, (state) => {
        state.isLoading = false
      })

    // PAYMENT FLOW
    builder
      .addCase(paymentService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(paymentService.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(paymentService.rejected, (state) => {
        state.isLoading = false
      })

    // FETCH HISTORY TRANSACTION FLOW
    builder
      .addCase(fetchHistoryTransaction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchHistoryTransaction.fulfilled, (state, action) => {
        state.isLoading = false
        state.transactions = action.payload.records
      })
      .addCase(fetchHistoryTransaction.rejected, (state) => {
        state.isLoading = false
      })

  }
})

export default balanceSlice.reducer