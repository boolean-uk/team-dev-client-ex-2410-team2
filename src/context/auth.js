import { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/header';
import Modal from '../components/modal';
import Navigation from '../components/navigation';
import useAuth from '../hooks/useAuth';
import { createProfile, login, register } from '../service/apiClient';

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      console.log(location.state?.from);
      navigate(location || '/'); // This does work but it is probably not the intended way of doing this.
      // navigate(location.state?.from?.pathname || '/'); //This does not work due to state not being defined.
    }
  }, [location.state?.from?.pathname, navigate]);

  const handleLogin = async (email, password, rememberMe) => {
    try {
      const res = await login(email, password);

      if (!res.data.token) {
        throw new Error('Invalid credentials, please try again.');
      }

      localStorage.setItem('token', res.data.token);
      setToken(res.token);

      if (rememberMe) {
        // TODO: Implement remember me functionality, extend token expiration.
      }

      navigate(location.state?.from?.pathname || '/');
    } catch (error) {
      return error.message;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleRegister = async (email, password) => {
    const res = await register(email, password).then(function (response) {
      return response;
    });

    if (res.status === 'fail') {
      return res;
    }

    setToken(res.data.token);
    navigate('/verification', { state: { email: email, password: password } });
  };

  const handleCreateProfile = async (
    firstName,
    lastName,
    userName,
    githubUrl,
    bio,
    email,
    mobile,
    password,
    photo
  ) => {
    const { userId } = jwt_decode(token);

    await createProfile(userId, firstName, lastName, userName, githubUrl, bio, photo, mobile);

    localStorage.setItem('token', token);
    navigate('/');
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onCreateProfile: handleCreateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute: token', token); // Debugging line

  if (!token) {
    console.log('ProtectedRoute: No token, redirecting to login'); // Debugging line
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Modal />
      {children}
    </div>
  );
};

export { AuthContext, AuthProvider, ProtectedRoute };
