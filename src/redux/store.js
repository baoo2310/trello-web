import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { activeBoardReducer } from './activeBoard/activeBoardSlice';
import { userReducer } from "./user/userSlice";
import localStorage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const rootPersistConfig = {
    key: 'root',
    storage: localStorage,
    whitelist: ['user'] // slice data allow maintained when f5
};

const reducers = combineReducers({
    activeBoard: activeBoardReducer,
    user: userReducer
});

const persistedReducers = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['confirm-dialog/register', 'confirm-dialog/remove', 'persist/PERSIST'],
                ignoredActionPaths: ['register', 'rehydrate'],
                ignoredPaths: ['confirmDialog']
            }
        })
});