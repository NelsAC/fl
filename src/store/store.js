import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { learningSlice } from './learning'
import { commentSlice } from './comment'
import { userSlice } from './user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    learning: learningSlice.reducer,
    comment: commentSlice.reducer,
    user: userSlice.reducer,
  },
})