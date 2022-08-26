import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { currentStroke } from "./features/currentStroke/slice";
import { strokes } from "./features/strokes/slice";

export const store = configureStore({
    reducer: {
        currentStroke,
        strokes 
    },
    devTools: true,
})

//Types the specific dispatch we expect from our store
export type AppDispatch = typeof store.dispatch;
