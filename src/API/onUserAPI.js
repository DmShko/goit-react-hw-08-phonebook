import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const URL = 'https://connections-api.herokuapp.com';

export const onAPI = createAsyncThunk(
    'logIn/onUserAPI',
    async function(arg, {rejectWithValue}) {
        
        return await axios.post(`${URL}/users/login`, arg).then(responce => {
            console.log(responce);
            return responce.data;
        }).catch(error =>  {
            return rejectWithValue(error.message);
        });
           
    }
);