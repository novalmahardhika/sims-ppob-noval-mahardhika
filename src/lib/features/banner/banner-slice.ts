import { api } from "@/lib/api"
import type { ApiResponse } from "@/lib/types/api-type"
import type { BannerType } from "@/lib/types/banner-type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { AxiosError } from "axios"

type InitialStateType = {
  banners: BannerType[]
  isLoading: boolean
}

const initialState: InitialStateType = {
  banners: [],
  isLoading: false
}

export const fetchBanner = createAsyncThunk('/banner', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<ApiResponse<BannerType[]>>('/banner')
    return res.data.data
  } catch (e: unknown) {
    const error = e as AxiosError<ApiResponse>
    return rejectWithValue({
      status: error.response?.status || 500,
      message: error.response?.data.message || 'Terjadi kesalahan, silahkan coba lagi!'
    })
  }
})

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.isLoading = false
        state.banners = action.payload
      })
      .addCase(fetchBanner.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export default bannerSlice.reducer