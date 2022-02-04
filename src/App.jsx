import React from 'react';
import { Routes, Route } from 'react-router-dom';

import GlobalLoading from './components/GlobalLoading';

const Home = React.lazy(() => import('./views/Home'));
const PageNotFound = React.lazy(() => import('./views/PageNotFound'));

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<GlobalLoading />}>
            <Home />
          </React.Suspense>
        }
      />

      <Route
        path="/user/:username"
        element={
          <React.Suspense fallback={<GlobalLoading />}>
            <Home />
          </React.Suspense>
        }
      />

      <Route
        path="*"
        element={
          <React.Suspense fallback={<GlobalLoading />}>
            <PageNotFound />
          </React.Suspense>
        }
      />
    </Routes>
  );
};

export default App;
