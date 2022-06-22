import { createSlice } from '@reduxjs/toolkit';

export const learningSlice = createSlice({
  name: 'learning',
  initialState: {
    isSaving: false,
    loading: true, 
    messageSaved: '',
    posts: [],
    active: null,
  },
  reducers: {
    addNewEmptyPost: (state, actions) => {
      state.posts.push(actions.payload);
      state.isSaving = false;
      state.messageSaved = 'Post creado correctamente';
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
} = learningSlice.actions;
