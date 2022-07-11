import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // not-authenticated, checking, authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
        updatedMessage: null,
        updatedMessageNameAndEmail: null,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated'; // not-authenticated, checking, authenticated
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated'; // not-authenticated, checking, authenticated
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
        setUpdatePhoto: (state, {payload}) => {
            state.updatedMessage = payload.updatedMessage;
            state.photoURL = payload.photoURL;
        },
        setUpdateNameAndEmail: (state, {payload}) => {
            state.displayName = payload?.displayName;
            state.email = payload?.email;
            state.updatedMessageNameAndEmail = payload.updatedMessageNameAndEmail;
        }
    }
});

export const { 
    login, 
    logout, 
    checkingCredentials,
    setUpdatePhoto,
    setUpdateNameAndEmail
} = authSlice.actions;
