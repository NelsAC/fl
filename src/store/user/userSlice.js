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
    addNewCourse: (state, actions) => {
      state.courses.push(actions.payload);
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
    },
    setUpdatePhotoUser: (state, actions) => {
      state.users.forEach((user) => {
        if (user.uid === actions.payload.uid) {
          user.photoURL = actions.payload.photoURL;
        }
      })
    },
    setUpdateNameAndEmailUser: (state, actions) => {
      state.users.forEach((user) => {
        if (user.uid === actions.payload.uid) {
          user.displayName = actions.payload.displayName;
          user.email = actions.payload.email;
        }
      })
    },
    setUpdateStatusUser: (state, actions) => {
      state.users.forEach((user) => {
        if (user.userId === actions.payload) {
          user.status = !user.status;
        }
      })
    },
    setUpdateCourse: (state, actions) => {
      state.courses.forEach((course) => {
        if (course.courseId === actions.payload.courseId) {
          course.name = actions.payload.name;
          course.description = actions.payload.description;
          course.category = actions.payload.category;
        }
      })
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
    setCourses,
    setUpdatePhotoUser,
    setUpdateNameAndEmailUser,
    setUpdateStatusUser,
    addNewCourse,
    setUpdateCourse
} = userSlice.actions;
