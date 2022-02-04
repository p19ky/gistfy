import { createSlice } from '@reduxjs/toolkit';

import { reducers as searchResultsAsyncThunkReducers } from './async/searchResultsAsyncThunk';
import { reducers as currentUserAsyncThunkReducers } from './async/currentUserAsyncThunk';

const initialState = {
  value: {
    currentUser: null,
    searchResults: [],
    latestSearch: ""
  },
  errorSearchResults: null,
  loadingSearchResults: false,
  errorCurrentUser: null,
  loadingCurrentUser: false,
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    updateCurrentUser: (state, { payload }) => {
      state.value.currentUser = payload;
      state.errorCurrentUser = null;
      state.loadingCurrentUser = false;
    },
    updateSearchResults: (state, { payload }) => {
      state.value.searchResults = payload;
    },
    updateLatestSearch: (state, { payload }) => {
      state.value.latestSearch = payload;
    },
  },
  extraReducers: {
    ...searchResultsAsyncThunkReducers,
    ...currentUserAsyncThunkReducers,
  },
});

// export state reducers
export const { updateCurrentUser, updateSearchResults, updateLatestSearch } = githubSlice.actions;

export default githubSlice.reducer;
