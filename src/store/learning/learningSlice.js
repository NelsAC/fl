import { createSlice } from '@reduxjs/toolkit';

export const learningSlice = createSlice({
    name: 'learning',
    initialState: {
        isSaving: false,
        messageSaved: '',
        posts: [],
        active: null,
        // active : {
        //     id: 'AB1',
        //     course: '',
        //     title: '',
        //     body: '',
        //     date: 12345,
        //     user: {
        //         id: null,
        //         name: '',
        //     }
        // }
    },
    reducers: {
        addNewEmptyPost: (state, actions) => {
            state.posts.push( actions.payload );
            state.isSaving = false;
        },
        setActivePost: (state, actions) => {
            state.active = actions.payload;
        },
        setPosts: (state, actions) => {
            
        },
        setSaving: (state, actions) => {

        },
        deletePostById: (state, actions) => {
        
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyPost,
    setActivePost,
    setPosts,
    setSaving,
    deletePostById,
} = learningSlice.actions;