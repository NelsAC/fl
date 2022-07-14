import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { postSlice } from './post'
import { commentSlice } from './comment'
import { userSlice } from './user'
import { adminSlice } from './admin/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    post: postSlice.reducer,
    comment: commentSlice.reducer,
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
})