import { createAsyncThunk } from '@reduxjs/toolkit';

import { octokit } from '../../../utils/helpers';

const searchResultsAsyncThunk = createAsyncThunk(
  'github/searchResults',
  async ({ query }, { rejectWithValue, fulfillWithValue }) => {
    try {
      if (!query) return fulfillWithValue([]);

      const response = await octokit.request('GET /search/users', {
        q: query,
      });

      const items = response.data.items;

      return fulfillWithValue(items);
    } catch (error) {
      console.log('search results error', error);
      return rejectWithValue(error);
    }
  }
);

const reducers = {
  [searchResultsAsyncThunk.fulfilled]: (state, action) => {
    state.value.searchResults = action.payload;
    state.errorSearchResults = null;
    state.loadingSearchResults = false;
  },
  [searchResultsAsyncThunk.pending]: state => {
    state.errorSearchResults = null;
    state.loadingSearchResults = true;
  },
  [searchResultsAsyncThunk.rejected]: (state, action) => {
    state.errorSearchResults = action.payload;
    state.loadingSearchResults = false;
  },
};

export { reducers, searchResultsAsyncThunk };
