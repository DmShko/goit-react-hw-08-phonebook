
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
      
        return await axios.request(options).then(responce => {
            console.log(responce);
            return responce.data;
        }).catch(error =>  {
            return rejectWithValue(error.message);
        });
           
    }
);