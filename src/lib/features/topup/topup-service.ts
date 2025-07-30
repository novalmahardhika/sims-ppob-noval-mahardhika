import { api } from "@/lib/api"
import type { TopUpSchemaType } from "@/lib/schemas/topup-schema"
import type { ApiResponse } from "@/lib/types/api-type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { AxiosError } from "axios"


type InitialStateType = {
  isLoading: boolean
}

const initialState: InitialStateType = {
  isLoading: false
}

export const topUpBalance = createAsyncThunk('/topup', async (data: TopUpSchemaType, { rejectWithValue }) => {
  try {
    const res = await api.post<ApiResponse<{ balance: number }>>('/topup', data)
    return res.data.data
  } catch (e: unknown) {
    const error = e as AxiosError<ApiResponse>
    return rejectWithValue({
      status: error.response?.status || 500,
      message: error.response?.data.message || 'Terjadi kesalahan, silahkan coba lagi!'
    })
  }
})

const topUpSlice = createSlice({
  name: 'topup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topUpBalance.pending, (state) => {
        state.isLoading = true
      })
      .addCase(topUpBalance.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(topUpBalance.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export default topUpSlice.reducer