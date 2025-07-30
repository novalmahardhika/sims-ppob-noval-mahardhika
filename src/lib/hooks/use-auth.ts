import { useAppSelector } from "./use-app-selector";

export function useAuth() {
  const { token, user, isLoading } = useAppSelector((state) => state.auth)
  const isAuthenticated = !!token && !!user

  return { token, user, isLoading, isAuthenticated }
}