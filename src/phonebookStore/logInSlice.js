import { createSlice } from "@reduxjs/toolkit";

import Notiflix from 'notiflix';


import { onAPI } from '../API/onUserAPI';

const logInInitialState = {filter: '', isLoading: false, error: null, token: null, statusText:''};

const logInSlice = createSlice(
    {
        name: 'logIn',
        initialState: logInInitialState,
        reducers:{
            
            changestatusText(state, action) {
               
                state.statusText = action.payload;
               
            },
            clear(state, action) {
               
                state.token = action.payload.token;
                state.statusText = action.payload.statusText;
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
                
                state.token = action.payload.data.token;
                state.statusText = action.payload.StTx

                if(action.payload.status === 200) Notiflix.Notify.success('User is logged in.', {width: '450px', position: 'center-top', fontSize: '24px',});
                // some actions with 'action'...
            });
            
            builder.addCase(onAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;

                switch(state.error) {
                    case 400:
                        Notiflix.Notify.warning('Login error.', {width: '450px', position: 'center-top', fontSize: '24px',});
                    break;
                    default:;
                };
            });

        },
    }
);


export const {changestatusText, clear} = logInSlice.actions;
export default logInSlice.reducer;