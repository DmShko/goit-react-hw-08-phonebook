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
        
        return await axios.request(options).then(responce => {
          
            return {data: responce.data, status: responce.status, StTx: responce.statusText,};
        }).catch(error =>  {
            return rejectWithValue(error.response.status);
        });
           
    }
    
);