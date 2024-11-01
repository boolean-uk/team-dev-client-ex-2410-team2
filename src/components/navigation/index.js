import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import CohortIcon from '../../assets/icons/cohortIcon';
import HomeIcon from '../../assets/icons/homeIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import useAuth from '../../hooks/useAuth';
import './style.css';

const Navigation = () => {
  const { token } = useAuth();
  const [activeNav, setActiveNav] = useState('home');

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
