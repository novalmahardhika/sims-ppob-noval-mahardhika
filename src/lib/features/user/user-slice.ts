import { api } from "@/lib/api"
import type { UpdateProfileSchemaType } from "@/lib/schemas/user-schema"
import type { ApiResponse } from "@/lib/types/api-type"
import type { UserType } from "@/lib/types/user-type"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { AxiosError } from "axios"

type InitialStateType = {
  isLoading: boolean
}

const initialState: InitialStateType = {
  isLoading: false
}

export const updateProfile = createAsyncThunk('/profile/update', async (data: UpdateProfileSchemaType, { rejectWithValue }) => {
  try {
    let uploadedImageUrl: string | null = null

    const { profile_image, ...values } = data

    if (profile_image) {
      const formData = new FormData()
      formData.append('file', profile_image)
      const { data } = await api.put<ApiResponse<UserType>>('/profile/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      uploadedImageUrl = data.data.profile_image
    }

    const payload = {
      ...values,
      ...(uploadedImageUrl && { profile_image: uploadedImageUrl }),
    }

    const res = await api.put<ApiResponse<UserType>>('/profile/update', payload)
    return res.data.data
  } catch (e: unknown) {
    const error = e as AxiosError<ApiResponse>
    return rejectWithValue({
      status: error.response?.status || 500,
      message: error.response?.data.message || 'Terjadi kesalahan, silahkan coba lagi!'
    })
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export default userSlice.reducer


