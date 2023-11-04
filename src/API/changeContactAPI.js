
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const changeContact = createAsyncThunk(
    'changeContact/changeContactAPI',
    async function(arg, {rejectWithValue}) {
        const options = {
            method: 'PATCH',
            url: `https://connections-api.herokuapp.com/contacts/${arg.id}`,
            data:{name: arg.name, number: arg.number},
            headers: {
                Authorization: `Bearer ${arg.token}`,
            }
        };
      
        return await axios.request(options).then(responce => {
           
            return responce.data;
        }).catch(error =>  {
            return rejectWithValue(error.message);
        });
           
    }
);