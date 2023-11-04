import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const addAPI = createAsyncThunk(
    'singUp/addUserAPI',
    async function(arg, {rejectWithValue}) {
        const options = {
            method: 'POST',
            url: 'https://connections-api.herokuapp.com/users/signup',
            data: arg,
        };
    
        return await axios.request(options).then(responce => {
            
            return responce.status;
        }).catch(error =>  {
            return rejectWithValue(error.response.status);
        });
           
    }
);