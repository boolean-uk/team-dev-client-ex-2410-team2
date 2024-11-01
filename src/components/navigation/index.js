import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CohortIcon from '../../assets/icons/cohortIcon';
import HomeIcon from '../../assets/icons/homeIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import useAuth from '../../hooks/useAuth';
import './style.css';

const Navigation = () => {
  const { token } = useAuth();
  const location = useLocation();

  // Helper function to get active nav from pathname
  const getActiveNav = (pathname) => {
    if (pathname === '/') return 'home';
    return pathname.substring(1); // Remove leading slash
  };

  const [activeNav, setActiveNav] = useState(getActiveNav(location.pathname));

  // Update activeNav when location changes
  useEffect(() => {
    setActiveNav(getActiveNav(location.pathname));
  }, [location.pathname]);

  if (!token) {
    return null;
  }

  return (
    <nav>
      <ul>
        <li className={activeNav === 'home' ? 'active' : ''}>
          <NavLink to="/" onClick={() => setActiveNav('home')}>
            <HomeIcon colour="#000046" />
            <p>Home</p>
          </NavLink>
        </li>
        <li className={activeNav === 'profile' ? 'active' : ''}>
          <NavLink to="/profile" onClick={() => setActiveNav('profile')}>
            <ProfileIcon />
            <p>Profile</p>
          </NavLink>
        </li>
        <li className={activeNav === 'cohort' ? 'active' : ''}>
          <NavLink to="/cohort" onClick={() => setActiveNav('cohort')}>
            <CohortIcon />
            <p>Cohort</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
