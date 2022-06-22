import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { learningSlice } from './learning'
import { commentSlice } from './comment'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    learning: learningSlice.reducer,
    comment: commentSlice.reducer,
  },
})