import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { getUserFromStorage } from '../../lib/utils'
import type { TUserSchema } from './auth-schema'

export type TAuthState = {
  user: TUserSchema | null
}

const initialState: TAuthState = {
  user: getUserFromStorage(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUserSchema | null>) => {
      state.user = action.payload
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload))
      } else {
        localStorage.removeItem('user')
      }
    },
    logout: state => {
      state.user = null
      localStorage.removeItem('user')
    },
    updateUser: (state, action: PayloadAction<Partial<TUserSchema>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
  },
})

export const { setUser, logout, updateUser } = authSlice.actions
export default authSlice.reducer
