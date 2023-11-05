import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import singUpReducer from "./singUpSlice";
import logInReducer from "./logInSlice";
import phonebookReducer from "./phoneBookSlice";
import addContactReducer from "./phoneBookSlice";
import logOutReducer from "./logOutSlice";

const rootReducer = combineReducers(
    {
        singUp: singUpReducer,
        logIn: logInReducer,
        logOut: logOutReducer,
        phonebook: phonebookReducer,
        addContact: addContactReducer,
        //...or more redusers
    }
)

const persistConfig = {
    // 'key' is indeficate of one or more storage
    key: 'root',
    storage,
    // whitelist: ['persist:root.logIn', 'persist:root.phonebook'],
}

// basic reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    }
);

export const persistor = persistStore(store);