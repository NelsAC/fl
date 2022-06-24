import { createSlice } from '@reduxjs/toolkit';

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isSaving: false,
    loadingAllComments: true,
    loadingComments: false,
    messageSaved: '',
    comments: [],
    active: null,
  },
  reducers: {
    addNewComment: (state, actions) => {
      state.comments.push(actions.payload);
      state.isSaving = false;
      state.messageSaved = 'Comentario sumado correctamente';
      state.active = null;
    },
    setActiveComments: (state, actions) => {
      state.loadingComments = true;
    },
    setComments: (state, actions) => {
      state.comments = actions.payload;
      state.loadingComments = false;
    },
    setSaving: (state, actions) => {
      state.isSaving = true;
    },
    setAllComments: (state, actions) => {
      state.comments = actions.payload;
      state.loadingAllComments = false;
    },
    setClearLogoutComments: (state) => {
      state.comments = [];
      state.isSaving = false;
      state.messageSaved = '';
      state.loadingAllComments = true;
      state.loadingComments = false;
      state.active = null;
    }
  },
});

// Actions creators are generated for each case reducer function
export const {
  addNewComment,
  setComments,
  setActiveComments,
  setSaving,
  setAllComments,
  setClearLogoutComments,
} = commentSlice.actions;
