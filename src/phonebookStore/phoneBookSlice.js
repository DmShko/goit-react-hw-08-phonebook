import { createSlice } from "@reduxjs/toolkit";

import Notiflix from 'notiflix';
// import { nanoid } from 'nanoid';

import { getUserAPI } from '../API/getUserAPI';
// import { addAPI } from '../API/AddContact';
// import { deleteAPI } from '../API/DeleteContact';

const phonebookInitialState = {items: [], filter: '', isLoading: false, error: null,};

const phonebookSlice = createSlice(
    {
        name: 'phonebook',
        initialState: phonebookInitialState,
        reducers:{
            add(state, action) {
                
                //find repeat contact
                if (
                    state.items.find(
                    element => element.name === [action.payload.name, action.payload.phone].join(' ')
                    ) !== undefined
                ) {
                    Notiflix.Notify.warning(`"${action.payload.name}" is already in contacts!`, {position: 'center-top', fontSize: '24px',});
                    return state;
                } 
                //add new contact with save current value state
                state.items.push({name: [action.payload.name, action.payload.phone].join(' '), id: action.payload.value.payload.id,});
               
            },
            // delete contact
            deluser(state, action) {
                
                state.items = state.items.filter(element => element.id !== action.payload);
            },
            // delete/change contacts render filter 
            changeFilter(state, action) {
                state.filter = action.payload;
            },
        },
        extraReducers:{
            [getUserAPI.pending]: (state) => {state.isLoading = true; state.error = null;},
            [getUserAPI.fulfilled]: (state, action) => {
                
                state.isLoading = false;
                
                if(state.items.length
                     !== action.payload.length
                    ) {
                    action.payload.map(value => 

                    { return state.items.push({name: [value.name, value.phone].join(' '), id: value.id,})});
                }
                // some actions with 'action'...
            },
            [getUserAPI.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            },

            // [addAPI.pending]: (state) => {state.isLoading = true; state.error = null;},
            // [addAPI.fulfilled]: (state) => {
            //     state.status = 'resolved';
            //     state.isLoading = false;
            //     // some actions with 'action'...
            // },
            // [addAPI.rejected]: (state, action) => {
            //     state.status = 'rejected';
            //     state.error = action.payload;
            // },
            // [deleteAPI.pending]: (state) => {state.isLoading = true; state.error = null;},
            // [deleteAPI.fulfilled]: (state) => {
            //     state.status = 'resolved';
            //     state.isLoading = false;
            //     // some actions with 'action'...
            // },
            // [deleteAPI.rejected]: (state, action) => {
            //     state.status = 'rejected';
            //     state.error = action.payload;
            // },
        }
    }
);

export const {add, deluser, changeFilter} = phonebookSlice.actions;
export default phonebookSlice.reducer;