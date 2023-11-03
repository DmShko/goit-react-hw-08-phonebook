import { configureStore } from "@reduxjs/toolkit";

import singUpReducer from "./singUpSlice";
import logInReducer from "./logInSlice";
import phonebookReducer from "./phoneBookSlice";
import addContactReducer from "./phoneBookSlice";

export const store = configureStore({
        reducer: {
            singUp: singUpReducer,
            logIn: logInReducer,
            phonebook: phonebookReducer,
            addContact: addContactReducer,
        },
    }
);