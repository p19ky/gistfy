import { createSlice } from '@reduxjs/toolkit';

import { reducers as searchResultsAsyncThunkReducers } from './async/searchResultsAsyncThunk';

const initialState = {
  value: {
    currentUser: null,
    searchResults: [],
  },
  errorSearchResults: null,
  loadingSearchResults: false,
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    updateCurrentUser: (state, { payload }) => {
      state.value.currentUser = payload;
    },
    updateSearchResults: (state, { payload }) => {
      state.value.searchResults = payload;
    },
    resetGithubValue: state => {
      state.value = initialState;
    },
  },
  extraReducers: {
    ...searchResultsAsyncThunkReducers
  },
});

// export state reducers
export const { updateCurrentUser, updateSearchResults, resetGithubValue } =
  githubSlice.actions;

export default githubSlice.reducer;
