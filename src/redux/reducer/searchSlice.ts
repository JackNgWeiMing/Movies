import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  GetMovieListResponse,
  GetMovieListSuccessResponse,
  omdbAPI,
} from '../../apis';
import {AppDispatch, RootState} from '../store';

type Status = 'idle' | 'loading' | 'failed';
interface SearchParams {
  title: string;
  pageIndex: number;
}

interface SearchState {
  searchParams: SearchParams;
  status: Status;
  errorMessage: string;
  isEnded: boolean;
  responses: GetMovieListSuccessResponse[];
}

const initialState: SearchState = {
  errorMessage: '', // error message to be displayed
  searchParams: {title: '', pageIndex: 1}, // used for search
  status: 'idle', // search request status
  responses: [], // all the success response , used for pagination
  isEnded: false, // is the result list reach the end ?
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
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    setSearchParams(state, action: PayloadAction<SearchParams>) {
      state.searchParams = action.payload;
    },
    setResponses(state, action: PayloadAction<GetMovieListSuccessResponse[]>) {
      state.responses = action.payload;
    },
    addNewResponse(state, action: PayloadAction<GetMovieListSuccessResponse>) {
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
    /**
     * Reset state
     */
    dispatch(searchSlice.actions.setIsEndle(false));
    dispatch(searchSlice.actions.setStatus('loading'));
    dispatch(searchSlice.actions.setErrorMessage(''));
    let response: GetMovieListResponse | null = null;

    try {
      response = await omdbAPI.getMovieList({
        keyword: searchParams.title,
        pageIndex: 1,
      });
    } catch (error) {
      /**
       * Error Case
       */
      dispatch(searchSlice.actions.setStatus('failed'));
      dispatch(searchSlice.actions.setErrorMessage('Error Detected'));
      return Promise.reject();
    }

    if (response.Response === 'False') {
      /**
       * Error Case
       */
      dispatch(searchSlice.actions.setStatus('failed'));
      dispatch(searchSlice.actions.setErrorMessage(response.Error));
      return Promise.reject();
    }

    /**
     * Success case
     */
    dispatch(
      searchSlice.actions.setSearchParams({
        ...searchParams,
        pageIndex: 1,
      }),
    );
    dispatch(searchSlice.actions.setStatus('idle'));

    /**
     * Check if reach last page
     */
    if (response.Search.length === 0) {
      dispatch(searchSlice.actions.setIsEndle(true));
    } else {
      dispatch(searchSlice.actions.setResponses([response]));
    }
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

    /**
     * Reset state
     */
    dispatch(searchSlice.actions.setErrorMessage(''));
    dispatch(searchSlice.actions.setStatus('loading'));
    try {
      response = await omdbAPI.getMovieList({
        keyword: searchParams.title,
        pageIndex: nextPageIndex,
      });
    } catch (error) {
      /**
       * Error Case
       */
      dispatch(searchSlice.actions.setStatus('failed'));
      let message = 'Error Detected, Try again later';
      dispatch(searchSlice.actions.setErrorMessage(message));
      return Promise.reject(message);
    }

    if (response.Response === 'False') {
      /**
       * Error handling
       */
      dispatch(searchSlice.actions.setStatus('failed'));
      dispatch(searchSlice.actions.setErrorMessage(response.Response));
      return Promise.reject(response.Response);
    }

    /**
     * Success case
     */
    dispatch(
      searchSlice.actions.setSearchParams({
        ...searchParams,
        pageIndex: nextPageIndex,
      }),
    );
    dispatch(searchSlice.actions.setStatus('idle'));

    /**
     * Check if reach last page
     */
    if (response.Search.length === 0) {
      dispatch(searchSlice.actions.setIsEndle(true));
    } else {
      dispatch(searchSlice.actions.addNewResponse(response));
    }
  };
};
