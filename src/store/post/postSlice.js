import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    isSaving: false,
    loading: true, 
    messageSaved: '',
    posts: [],
    active: null,
    currentUserPosts: null,
  },
  reducers: {
    addNewEmptyPost: (state, actions) => {
      state.posts.push(actions.payload);
      state.isSaving = false;
      state.messageSaved = 'Post Creado Correctamente';
      state.active = null;
    },
    setActivePost: (state, actions) => {
      state.active = actions.payload;
      state.messageSaved = '';
    },
    setPosts: (state, actions) => {
      state.posts = actions.payload;
      state.loading = false;
    },
    setSaving: (state, actions) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updatePost: (state, actions) => {
      state.isSaving = false;
      state.posts = state.posts.map((post) => {
        if (post.id === actions.payload.id) {
          return actions.payload;
        }
        return post;
      });
    },
    deletePostById: (state, actions) => {},
    setCurrentUserPosts: (state, actions) => {
      state.currentUserPosts = actions.payload;
    },
    unsetCurrentUsersPosts: (state, actions) => {
      state.currentUserPosts = null;
    },
    setClearLogoutPosts: (state) => {
      state.posts = [];
      state.isSaving = false;
      state.messageSaved = '';
      state.loading = true;
      state.active = null;
      state.currentUserPosts = null;
    }
  },
});

// Actions creators are generated for each case reducer function
export const {
  addNewEmptyPost,
  setActivePost,
  setPosts,
  setSaving,
  deletePostById,
  updatePost,
  setCurrentUserPosts,
  unsetCurrentUsersPosts,
  setClearLogoutPosts,
} = postSlice.actions;
