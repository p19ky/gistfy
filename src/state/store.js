import { configureStore } from "@reduxjs/toolkit";

import githubReducer from "./github/githubSlice";

export default configureStore({
  reducer: {
    github: githubReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});