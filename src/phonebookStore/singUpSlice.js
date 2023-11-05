import { createSlice } from "@reduxjs/toolkit";

import Notiflix from 'notiflix';

import { addAPI } from '../API/addUserAPI';

const singUpInitialState = {error: null, token: null, sinUpData: {}, status: {success: false, rejected: false}};

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

                    if(action.payload === 201) Notiflix.Notify.success('User created.', {width: '450px', position: 'center-top', fontSize: '24px',});
                    // some actions with 'action'...
                });
            
                 builder.addCase(addAPI.rejected, (state, action) => {
                    
                    state.isLoading = false;
                    state.error = action.payload;
                  
                    switch(state.error) {
                        case 400:
                            Notiflix.Notify.warning('User creation error.', {width: '450px', position: 'center-top', fontSize: '24px',});
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


export const {change} = singUpSlice.actions;
export default singUpSlice.reducer;