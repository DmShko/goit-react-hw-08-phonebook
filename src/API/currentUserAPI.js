
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const currentUser = createAsyncThunk(
    'currentUser/currentUserAPI',
    async function(arg, {rejectWithValue}) {
        const options = {
            method: 'GET',
            url: 'https://connections-api.herokuapp.com/users/current',
            headers: {
                Authorization: `Bearer ${arg}`,
            }
        };
      
        return await axios.request(options).then(response => {
          
            return response.data.name;
        }).catch(error =>  {
            return rejectWithValue(error.response.status);
        });
           
    }
);