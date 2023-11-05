
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const deleteContact = createAsyncThunk(
    'deleteContact/deleteContactAPI',
    async function(arg, {rejectWithValue}) {
        const options = {
            method: 'DELETE',
            url: `https://connections-api.herokuapp.com/contacts/${arg.id}`,
            headers: {
                Authorization: `Bearer ${arg.token}`,
            }
        };
      
        return await axios.request(options).then(response => {
           
            return response.status;
        }).catch(error =>  {
            return rejectWithValue(error.response.status);
        });
           
    }
);