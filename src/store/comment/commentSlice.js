import { createSlice } from '@reduxjs/toolkit';

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isSaving: false,
    loadingAllComments: true,
    loadingComments: false,
    messageSaved: '',
    comments: [],
    activeComments: [],
    active: null,
  },
  reducers: {
    addNewComment: (state, actions) => {
      state.comments.push(actions.payload);
      state.isSaving = false;
      state.messageSaved = 'Comentario sumado correctamente';
      state.active = null;
    },
    setComments: (state, actions) => {
      state.activeComments = actions.payload;
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
      state.activeComments = [];
      state.isSaving = false;
      state.messageSaved = '';
      state.loadingAllComments = true;
      state.loadingComments = false;
      state.active = null;
    },
    setLikes: (state, actions) => { 
      state.comments.map((comment) => {
        if (comment.commentId === actions.payload.commentId) {
          comment.likes = actions.payload.commentLikeArray;
        }
      })
    },
    setBestComment: (state, actions) => {
      state.comments.map((comment) => {

        if ( comment.best === true ) {
          comment.best = false;
        }

        if (comment.commentId === actions.payload.commentId) {
          comment.best = true;
        }
      })
    }
  },
});

// Actions creators are generated for each case reducer function
export const {
  addNewComment,
  setComments,
  setSaving,
  setAllComments,
  setClearLogoutComments,
  setLikes,
  setBestComment,
} = commentSlice.actions;
