import {createSlice} from '@reduxjs/toolkit';

interface AuthState {}
const initialState: AuthState = {};

export const matchingSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});
