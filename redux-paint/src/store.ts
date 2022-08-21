import { rootReducer } from "./drawReducer";
import { devToolsEnhancer } from "redux-devtools-extension";
import {createStore} from "redux"
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        rootReducer
    },
    devTools: true,
})

//Types the specific dispatch we expect from our store
export type AppDispatch = typeof store.dispatch;
//Type the specific state we get from our store
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;