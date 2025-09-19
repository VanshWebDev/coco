import { configureStore } from "@reduxjs/toolkit";
// Import your reducers
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
