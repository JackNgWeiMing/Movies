import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
// import {matchingSlice} from './matchingSlice';

const store = configureStore({
  reducer: {
    // productSRMatching: matchingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => {
  const dispatch: AppDispatch = useDispatch();
  return dispatch;
};

export default store;
