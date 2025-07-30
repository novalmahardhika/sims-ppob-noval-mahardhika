import { api } from "@/lib/api"
import type { ApiResponse } from "@/lib/types/api-type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { AxiosError } from "axios"

type InitialStateType = {
  balance: number
  isLoading: boolean
}

const initialState: InitialStateType = {
  balance: 0,
  isLoading: false
}

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

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  }
})

export default balanceSlice.reducer