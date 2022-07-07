import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    updatedPhotoMessage: null,
    loadingUsers: true,
    loadingUserActive: true,
    loadingUpdateProfile: null,
    active: null,
    countBestAnswer: 0,
    courses: [],
  },
  reducers: {
    addNewUser: (state, actions) => {
      state.users.push(actions.payload);
    },
    setActiveUser: (state, actions) => {
      state.active = actions.payload;
      state.loadingUserActive = false;
    },
    setUsers: (state, actions) => {
      state.users = actions.payload;
      state.loadingUsers = false;
    },
    setClearLogoutUser: (state) => {
      state.users = [];
      state.updatedPhotoMessage = null;
      state.loadingUsers = true;
      state.loadingUserActive = true;
      state.active = null;
      state.loadingUpdateProfile = null;
      state.courses = [];
    },
    setCountBestAnswer: (state, actions) => {
      state.countBestAnswer = actions.payload;
    },
    setCourses: (state, actions) => {
      state.courses = actions.payload;
    }
  },
});

// Actions creators are generated for each case reducer function
export const {
    addNewUser,
    setActiveUser,
    setUsers,
    setClearLogoutUser,
    setCountBestAnswer,
    setCourses
} = userSlice.actions;
