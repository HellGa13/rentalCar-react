import AppBar from './components/AppBar/AppBar.jsx';

import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const ContactsPage = lazy(() => import('./pages/CatalogPage/CatalogPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.jsx'));

function App() {
    <>
      <AppBar/>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
    </>
}

export default App;