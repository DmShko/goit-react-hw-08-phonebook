import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const onAPI = createAsyncThunk(
    'logIn/onUserAPI',
    async function(arg, {rejectWithValue}) {
            const options = {
                method: 'POST',
                url: 'https://connections-api.herokuapp.com/users/login',
                data: arg,
            };
        
        return await axios.request(options).then(response => {
          
            return {data: response.data, status: response.status, StTx: response.statusText,};
        }).catch(error =>  {
            return rejectWithValue(error.response.status);
        });
           
    }
    
);