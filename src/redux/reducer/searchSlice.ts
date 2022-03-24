import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GetMovieListResponse, omdbAPI} from '../../apis';
import {AppDispatch, RootState} from '../store';

type Status = 'idle' | 'loading' | 'failed';
interface SearchParams {
  title: string;
  pageIndex: number;
}

interface SearchState {
  searchParams: SearchParams;
  status: Status;
  isEnded: boolean;
  responses: GetMovieListResponse[];
}

const initialState: SearchState = {
  searchParams: {title: '', pageIndex: 1},
  status: 'idle',
  responses: [],
  isEnded: false,
};

/**
 * thunks
 */
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setIsEndle(state, action: PayloadAction<boolean>) {
      state.isEnded = action.payload;
    },
    setSearchParams(state, action: PayloadAction<SearchParams>) {
      state.searchParams = action.payload;
    },
    setResponses(state, action: PayloadAction<GetMovieListResponse[]>) {
      state.responses = action.payload;
    },
    addNewResponse(state, action: PayloadAction<GetMovieListResponse>) {
      state.responses.push(action.payload);
    },
  },
});

/**
 * Used when start with new keyword search
 * @param searchParams
 * @returns
 */
export const searchThunk = (searchParams: Omit<SearchParams, 'pageIndex'>) => {
  return async (dispatch: AppDispatch) => {
    dispatch(searchSlice.actions.setIsEndle(false));
    dispatch(searchSlice.actions.setStatus('loading'));
    let response: GetMovieListResponse | null = null;

    try {
      response = await omdbAPI.getMovieList({
        keyword: searchParams.title,
        pageIndex: 1,
      });
    } catch (error) {
      dispatch(searchSlice.actions.setStatus('failed'));
      return;
    }

    dispatch(
      searchSlice.actions.setSearchParams({
        ...searchParams,
        pageIndex: 1,
      }),
    );
    dispatch(searchSlice.actions.setStatus('idle'));
    dispatch(searchSlice.actions.setResponses([response]));
  };
};

/**
 * Used for query next page for existing search
 */
export const nextPageThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const searchParams = getState().search.searchParams;
    let response: GetMovieListResponse | null = null;
    const nextPageIndex = searchParams.pageIndex + 1;

    dispatch(searchSlice.actions.setStatus('loading'));
    try {
      response = await omdbAPI.getMovieList({
        keyword: searchParams.title,
        pageIndex: nextPageIndex,
      });
    } catch (error) {
      dispatch(searchSlice.actions.setStatus('failed'));
      return;
    }

    dispatch(
      searchSlice.actions.setSearchParams({
        ...searchParams,
        pageIndex: nextPageIndex,
      }),
    );
    dispatch(searchSlice.actions.setStatus('idle'));
    if (response.Search.length === 0) {
      dispatch(searchSlice.actions.setIsEndle(true));
    } else {
      dispatch(searchSlice.actions.addNewResponse(response));
    }
  };
};
