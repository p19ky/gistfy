import { createAsyncThunk } from '@reduxjs/toolkit';

import { octokit } from '../../../utils/helpers';

const currentUserAsyncThunk = createAsyncThunk(
  'github/currentUser',
  async ({ username }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await octokit.request('GET /users/{username}', {
        username,
      });

      return fulfillWithValue(response.data);
    } catch (error) {
      console.log('get current user error', error);
      return rejectWithValue(error);
    }
  }
);

const reducers = {
  [currentUserAsyncThunk.fulfilled]: (state, action) => {
    state.value.currentUser = action.payload;
    state.errorCurrentUser = null;
    state.loadingCurrentUser = false;
  },
  [currentUserAsyncThunk.pending]: state => {
    state.errorCurrentUser = null;
    state.loadingCurrentUser = true;
  },
  [currentUserAsyncThunk.rejected]: (state, action) => {
    state.errorCurrentUser = action.payload;
    state.loadingCurrentUser = false;
  },
};

export { reducers, currentUserAsyncThunk };
