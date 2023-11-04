
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getUserAPI = createAsyncThunk(
    'phonebook/GetUserAPI',
    async function(arg, {rejectWithValue}) {
        const options = {
            method: 'GET',
            url: 'https://connections-api.herokuapp.com/contacts',
            headers: {
                Authorization: `Bearer ${arg}`,
            }
        };
      
        return await axios.request(options).then(responce => {
            
            return responce.data;
        }).catch(error =>  {
            return rejectWithValue(error.message);
        });
           
    }
);