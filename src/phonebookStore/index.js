import { configureStore } from "@reduxjs/toolkit";

import singUpReducer from "./singUpSlice";
import logInReducer from "./logInSlice";
import phonebookReducer from "./phoneBookSlice";
import addContactReducer from "./phoneBookSlice";
import logOutReducer from "./logOutSlice";

export const store = configureStore({
        reducer: {
            singUp: singUpReducer,
            logIn: logInReducer,
            logOut: logOutReducer,
            phonebook: phonebookReducer,
            addContact: addContactReducer,
        },
    }
);