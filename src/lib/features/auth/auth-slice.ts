import { api } from "@/lib/api";
import type { LoginSchemaType } from "@/lib/schemas/login-schema";
import type { RegisterSchemaType } from "@/lib/schemas/register-schema";
import type { ApiResponse } from "@/lib/types/api-type";
import type { UserType } from "@/lib/types/user-type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

type InitialStateType = {
  token: string | null
  user: UserType | null
  isLoading: boolean
}

const initialState: InitialStateType = {
  token: null,
  user: null,
  isLoading: false
}

export const registerUser = createAsyncThunk('/auth/registration', async (data: Omit<RegisterSchemaType, 'confirmation_password'>, { rejectWithValue }) => {
  try {
    const res = await api.post<ApiResponse>('/registration', data)
    return res.data.data
  } catch (e: unknown) {
    const error = e as AxiosError<ApiResponse>
    return rejectWithValue({
      status: error.response?.status || 500,
      message: error.response?.data.message || 'Terjadi kesalahan, silahkan coba lagi!'
    })
  }
})

export const loginUser = createAsyncThunk('/auth/login', async (data: LoginSchemaType, { rejectWithValue }) => {
  try {
    const res = await api.post<ApiResponse<{ token: string }>>('/login', data)
    return res.data.data
  } catch (e: unknown) {
    const error = e as AxiosError<ApiResponse>
    return rejectWithValue({
      status: error.response?.status || 500,
      message: error.response?.data.message || 'Terjadi kesalahan, silahkan coba lagi!'
    })
  }
})

export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<ApiResponse<UserType>>('/profile')
    return res.data.data
  } catch (e: unknown) {
    const error = e as AxiosError<ApiResponse>
    return rejectWithValue({
      status: error.response?.status || 500,
      message: error.response?.data.message || 'Terjadi kesalahan, silahkan coba lagi!'
    })
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.user = null
    }
  },
  extraReducers: (builder) => {
    // LOGIN FLOW
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false
      })

    // REGISTER FLOW
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false
      })

    // GET CURRENT USER FLOW
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer