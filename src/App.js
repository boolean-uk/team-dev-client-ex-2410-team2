import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Loading from './pages/loading';
import Verification from './pages/verification';
import { AuthProvider, ProtectedRoute } from './context/auth';
import { ModalProvider } from './context/modal';
import Welcome from './pages/welcome';
import ForgotPassword from './pages/forgotPassword';
import SearchResultsPage from './pages/searchResultsPage';
import { useState } from 'react';

const App = () => {
  const [isSearchPage, setIsSearchPage] = useState(false);

  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="loading" element={<Loading />} />
            <Route path="verification" element={<Verification />} />
            <Route path="forgot-password" element={<ForgotPassword />} />

            <Route
              index
              element={
                <ProtectedRoute>
                  {isSearchPage ? (
                    <SearchResultsPage
                      isSearchPage={isSearchPage}
                      setIsSearchPage={setIsSearchPage}
                    />
                  ) : (
                    <Dashboard isSearchPage={isSearchPage} setIsSearchPage={setIsSearchPage} />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="welcome"
              element={
                <ProtectedRoute disabledNav={true}>
                  <Welcome />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </>
  );
};

export default App;
