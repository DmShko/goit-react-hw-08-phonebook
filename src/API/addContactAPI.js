
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const addContact = createAsyncThunk(
    'addContact/addContactAPI',
    async function(arg, {rejectWithValue}) {
        const options = {
            method: 'POST',
            url: 'https://connections-api.herokuapp.com/contacts',
            data: arg.data,
            headers: {
                Authorization: `Bearer ${arg.token}`,
            }
        };
      
        return await axios.request(options).then(response => {
            
            return {id: response.data.id, status: response.status}
        }).catch(error =>  {
            return rejectWithValue(error.response.status);
        });
           
    }
);