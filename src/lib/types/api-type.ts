

export type ApiResponse<T = null> = {
  status: number
  message: string
  data: T
}

export type ErrorPayload = {
  status: number
  message: string
}