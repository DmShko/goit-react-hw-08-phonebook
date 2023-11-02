import { createSlice } from "@reduxjs/toolkit";

// import Notiflix from 'notiflix';
// import { nanoid } from 'nanoid';

import { outAPI } from '../API/addUserAPI';

const logOutInitialState = {filter: '', isLoading: false, error: null, token: null, logOutData: null};

const logInSlice = createSlice(
    {
        name: 'logOut',
        initialState: logOutInitialState,
        reducers:{
            
            change(state, action) {
                
                state.logOutData = action.payload;
               
            },
        },
        extraReducers:  
            builder => {
                builder.addCase(outAPI.pending, (state) => {
                    state.isLoading = true; state.error = null;
                });
            
                builder.addCase(outAPI.fulfilled, (state, action) => {
                    state.isLoading = false;
                
                    state.token = action.payload.token;
                    // some actions with 'action'...
                });
            
                 builder.addCase(outAPI.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });
            },
            
    }
    
);


export const {change} = logInSlice.actions;
export default logInSlice.reducer;