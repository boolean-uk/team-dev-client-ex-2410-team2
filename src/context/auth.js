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
      navigate(location.state?.from?.pathname || location); // This is probably the intended way of doing this.
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
    navigate('/verification', {
      state: {
        ...res.data.user,
        email: email,
        password: password
      }
    });
  };

  const handleLoggedInUserId = () => {
    const { token } = useAuth();
    return jwt_decode(token).userId;
  };

  const handleCreateProfile = async (
    firstName,
    lastName,
    username,
    githubUrl,
    bio,
    email,
    mobile,
    password,
    profileImage,
    cohortId,
    startDate,
    endDate,
    role,
    specialism
  ) => {
    const { userId } = jwt_decode(token);

    localStorage.setItem('token', token);

    const response = await createProfile(
      userId,
      firstName,
      lastName,
      username,
      githubUrl,
      bio,
      email,
      mobile,
      password,
      profileImage,
      cohortId,
      startDate,
      endDate,
      role,
      specialism
    );
    if (response.status === 'success') {
      setTimeout(() => {
        navigate('/');
      }, 3000);
      return 'success';
    } else {
      return 'fail';
    }
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onCreateProfile: handleCreateProfile,
    getLoggedInUserId: handleLoggedInUserId
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
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
