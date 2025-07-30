import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '@/lib/features/auth/auth-slice'
import serviceReducer from '@/lib/features/service/service-slice'
import bannerReducer from '@/lib/features/banner/banner-slice'
import topUpReducer from '@/lib/features/topup/topup-service'
import balanceReducer from '@/lib/features/balance/balance-slice'

const rootReducer = combineReducers({
  auth: authReducer,
  service: serviceReducer,
  banner: bannerReducer,
  topup: topUpReducer,
  balance: balanceReducer
})

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  whitelist: ['auth']
}, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


