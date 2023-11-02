import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const outAPI = createAsyncThunk(
    'logOut/outUserAPI',
    async function(arg, {rejectWithValue}) {
        const options = {
            method: 'POST',
            url: 'https://connections-api.herokuapp.com/users/logout',
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