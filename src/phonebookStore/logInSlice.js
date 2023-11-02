import { createSlice } from "@reduxjs/toolkit";

// import Notiflix from 'notiflix';
// import { nanoid } from 'nanoid';


import { onAPI } from '../API/onUserAPI';


const logInInitialState = {filter: '', isLoading: false, error: null, token: null};

const logInSlice = createSlice(
    {
        name: 'logIn',
        initialState: logInInitialState,
        reducers:{
            
            change(state, action) {
               
                // state.token = action.payload.token;
               
            },
        },
        extraReducers: 

        builder => {
            builder.addCase(onAPI.pending, (state) => {
                state.isLoading = true; 
                state.error = null;
            });
            
            builder.addCase(onAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                
               
                state.token = action.payload.token;
                // some actions with 'action'...
            });
            
            builder.addCase(onAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        },
    }
);


export const {change} = logInSlice.actions;
export default logInSlice.reducer;