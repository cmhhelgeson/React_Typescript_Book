import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from './utils/types';
import { AppDispatch } from './store';


// Use throughout your app instead of plain `useDispatch` and `useSelector`
//Get the exact dispatch function we expect
export const useAppDispatch = () => useDispatch<AppDispatch>();
//
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;