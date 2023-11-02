import { createSlice } from "@reduxjs/toolkit";

// import Notiflix from 'notiflix';
// import { nanoid } from 'nanoid';

import { addAPI } from '../API/addUserAPI';

const singUpInitialState = {isLoading: false, error: null, token: null, sinUpData: {}};

const singUpSlice = createSlice(
    {
        name: 'singUp',
        initialState: singUpInitialState,
        reducers:{
            
            change(state, action) {
                
                state.sinUpData = action.payload.token;
               
            },
        },
        extraReducers:  
            builder => {
                builder.addCase(addAPI.pending, (state) => {
                    state.isLoading = true; state.error = null;
                });
            
                builder.addCase(addAPI.fulfilled, (state, action) => {
                    state.isLoading = false;
                
                    state.token = action.payload.token;
                    // some actions with 'action'...
                });
            
                 builder.addCase(addAPI.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });
            },
            
    }
    
);


export const {change} = singUpSlice.actions;
export default singUpSlice.reducer;