import { api } from "@/lib/api"
import type { ApiResponse } from "@/lib/types/api-type"
import type { ServiceType } from "@/lib/types/service-type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { AxiosError } from "axios"

type InitialStateType = {
  services: ServiceType[]
  isLoading: boolean
}

const initialState: InitialStateType = {
  services: [],
  isLoading: false
}

export const fetchService = createAsyncThunk('/services', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<ApiResponse<ServiceType[]>>('/services')
    return res.data.data
  } catch (e: unknown) {
    const error = e as AxiosError<ApiResponse>
    return rejectWithValue({
      status: error.response?.status || 500,
      message: error.response?.data.message || 'Terjadi kesalahan, silahkan coba lagi!'
    })
  }
})

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.isLoading = false
        state.services = action.payload
      })
      .addCase(fetchService.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export default serviceSlice.reducer