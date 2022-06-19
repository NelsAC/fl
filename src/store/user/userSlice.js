import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isSaving: false,
        messageSaved: '',
    },
    reducers: {
        updateUser: (state, {payload} ) => { // payload: user
            state.isSaving = payload.isSaving;
            state.messageSaved = payload.messageSaved;
            state.nameUser = payload.nameUser;
        },

    }
});


// Action creators are generated for each case reducer function
export const {
    updateUser,
} = userSlice.actions;