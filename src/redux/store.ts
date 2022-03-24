import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {authSlice} from './reducer/authSlice';
import {searchSlice} from './reducer/searchSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: searchSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => {
  const dispatch: AppDispatch = useDispatch();
  return dispatch;
};

export const useRootState = () => {
  const rootState = useSelector<RootState, RootState>(state => state);
  return rootState;
};

export default store;
