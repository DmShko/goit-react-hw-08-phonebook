import { createSlice } from "@reduxjs/toolkit";

import Notiflix from 'notiflix';


import { currentUser } from '../API/currentUserAPI';

const logOutInitialState = {userData: '', error: null};

const logOutSlice = createSlice(
    {
        name: 'currentUser',
        initialState: logOutInitialState,
        
        extraReducers:  
            builder => {
                builder.addCase(currentUser.pending, (state) => {
                   
                    state.error = null;

                });
            
                builder.addCase(currentUser.fulfilled, (state, action) => {
                
                    state.userData = action.payload;

                    if(action.payload.status === 200) Notiflix.Notify.success('User information found.', {width: '450px', position: 'center-top', fontSize: '24px',});
                    // some actions with 'action'...
                });
            
                 builder.addCase(currentUser.rejected, (state, action) => {

                    state.error = action.payload;

                    switch(state.error) {
                        case 400:
                            Notiflix.Notify.warning('Missing header with authorization token.', {width: '450px', position: 'center-top', fontSize: '24px',});
                        break;
                        default:;
                    };
                });
            },
            
    }
    
);


export const {change} = logOutSlice.actions;
export default logOutSlice.reducer;