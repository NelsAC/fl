import { createSlice } from "@reduxjs/toolkit";


export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        posts: [],
        courses: [],
        loadingUsers: true,
        loadingPosts: true,
        loadingCourses: true,
    },
    reducers: {
        setUsers: (state, actions) => {
            state.loadingUsers = false;
            state.users = actions.payload;
        },
        setPosts: (state, actions) => {
            state.loadingPosts = false;
            state.posts = actions.payload;
        },
        setCourses: (state, actions) => {
            state.loadingCourses = false;
            state.courses = actions.payload;
        }

    }
});

export const { 
    setUsers,
    setPosts,
    setCourses
} = adminSlice.actions;
