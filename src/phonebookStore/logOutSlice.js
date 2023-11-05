import { createSlice } from "@reduxjs/toolkit";

import Notiflix from 'notiflix';


import { outAPI } from '../API/outUserAPI';

const logOutInitialState = {filter: '', isLoading: false, error: null, token: null, logOutData: null};

const logOutSlice = createSlice(
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

                    if(action.payload.status === 200) Notiflix.Notify.success('The user is logged out.', {width: '450px', position: 'center-top', fontSize: '24px',});
                    // some actions with 'action'...
                });
            
                 builder.addCase(outAPI.rejected, (state, action) => {

                    state.isLoading = false;

                    switch(action.state.error) {
                        case 401:
                            Notiflix.Notify.warning('Missing header with authorization token.', {width: '450px', position: 'center-top', fontSize: '24px',});
                        break;
                        case 500:
                            Notiflix.Notify.warning('Server error.', {width: '450px', position: 'center-top', fontSize: '24px',});
                        break;
                        default:;
                    };
                });
            },
            
    }
    
);


export const {change} = logOutSlice.actions;
export default logOutSlice.reducer;