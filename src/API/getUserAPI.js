
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getUser = createAsyncThunk(
    'phonebook/GetUserAPI',
    async function(arg, {rejectWithValue}) {
        const options = {
            method: 'GET',
            url: 'https://connections-api.herokuapp.com/contacts',
            headers: {
                Authorization: `Bearer ${arg}`,
            }
        };
      
        return await axios.request(options).then(response => {
            
            return { data: response.data, status: response.status};
        }).catch(error =>  {
            return rejectWithValue(error.response.status);
        });
           
    }
);