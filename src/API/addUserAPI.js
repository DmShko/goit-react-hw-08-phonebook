import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const URL = 'https://connections-api.herokuapp.com';

export const addAPI = createAsyncThunk(
    'singUp/addUserAPI',
    async function(arg, {rejectWithValue}) {
        
        return await axios.post(`${URL}/users/signup`, arg).then(responce => {
            console.log(responce);
            return responce.data;
        }).catch(error =>  {
            return rejectWithValue(error.message);
        });
           
    }
);