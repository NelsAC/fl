import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { learningSlice } from './learning'
import { userSlice } from './user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    learning: learningSlice.reducer,
    user: userSlice.reducer,
  },
})