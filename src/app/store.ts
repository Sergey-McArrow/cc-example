import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from '../features/auth/auth-slice'
import { postDetailsApi } from '../features/posts/post-details-api'
import { postsApi } from '../features/posts/posts-api'

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [postDetailsApi.reducerPath]: postDetailsApi.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(
      postsApi.middleware,
      postDetailsApi.middleware
    ),
})

setupListeners(store.dispatch)

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export default store
