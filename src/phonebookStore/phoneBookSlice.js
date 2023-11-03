import { createSlice } from "@reduxjs/toolkit";

import Notiflix from 'notiflix';
// import { nanoid } from 'nanoid';

import { getUserAPI } from '../API/getUserAPI';
import { addContact } from '../API/addContactAPI';
import { deleteContact } from '../API/delContactAPI';

const phonebookInitialState = {items: [], filter: '', isLoading: false, error: null, changeMode: false};

const phonebookSlice = createSlice(
    {
        name: 'phonebook',
        initialState: phonebookInitialState,
        reducers:{
            add(state, action) {
                
                //find repeat contact
                if (
                    state.items.find(
                    element => element.name === [action.payload.name, action.payload.number].join(' ')
                    ) !== undefined
                ) {
                    Notiflix.Notify.warning(`"${action.payload.name}" is already in contacts!`, {position: 'center-top', fontSize: '24px',});
                    return state;
                } 
                //add new contact with save current value state
                state.items.push({name: [action.payload.name, action.payload.number].join(' '), id: action.payload.value.payload.id, active: state.changeMode});
               
            },
            // delete contact
            deluser(state, action) {
                
                state.items = state.items.filter(element => element.id !== action.payload);
            },
            // delete/change contacts render filter 
            changeFilter(state, action) {
                state.filter = action.payload;
            },

            // delete/change contacts render filter 
            changeButtonActive(state, action) {
                
                state.changeMode = !state.changeMode;

                if(state.items.length !== 0) {
                  
                     state.items.map(
                     element => {return element.id === action.payload} 
                    ).active = !state.changeMode;
                }
            },
        },
        extraReducers:

            builder => {
                builder.addCase(getUserAPI.pending, (state) => {
                    state.isLoading = true; 
                    state.error = null;
                });
                
                builder.addCase(getUserAPI.fulfilled, (state, action) => {
                    state.isLoading = false;
                
                    if(state.items.length
                     !== action.payload.length
                    ) {
                    action.payload.map(value => 

                    { return state.items.push({name: [value.name, value.number].join(' '), id: value.id, active: state.changeMode})});
                }
                // some actions with 'action'...
                    // some actions with 'action'...
                });
                
                builder.addCase(getUserAPI.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });
                builder.addCase(addContact.pending, (state) => {
                    state.isLoading = true; 
                    state.error = null;
                });
                
                builder.addCase(addContact.fulfilled, (state, action) => {
                    state.isLoading = false;
                    
                
                    // state.token = action.payload.token;
                    // some actions with 'action'...
                });
                
                builder.addCase(addContact.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });

                builder.addCase(deleteContact.pending, (state) => {
                    state.isLoading = true; 
                    state.error = null;
                });
                
                builder.addCase(deleteContact.fulfilled, (state, action) => {
                    state.isLoading = false;
                    
                
                    // state.token = action.payload.token;
                    // some actions with 'action'...
                });
                
                builder.addCase(deleteContact.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                });
            },
    }
);

export const {add, deluser, changeFilter, changeButtonActive} = phonebookSlice.actions;
export default phonebookSlice.reducer;