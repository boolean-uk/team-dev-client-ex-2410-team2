import { useContext, useState } from 'react';
import AddIcon from '../../assets/icons/addIcon';
import CohortIcon from '../../assets/icons/cohortIcon';
import CohortIconFill from '../../assets/icons/cohortIcon-fill';
import DeleteIcon from '../../assets/icons/deleteIcon';
import MonitorIcon from '../../assets/icons/monitorIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import SquareBracketsIcon from '../../assets/icons/squareBracketsIcon';
import Menu from '../menu';
import MenuItem from '../menu/menuItem';
import './style.css';
import { UserContext } from '../../pages/dashboard';

const ProfileCircle = ({ userData, initials }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { user } = useContext(UserContext);
  return (
    <div className="profile-circle" onClick={() => setIsMenuVisible(!isMenuVisible)}>
      {isMenuVisible && (
        <> {user.role === 'TEACHER' && <CascadingMenu userData={userData} initials={initials} />}</>
      )}
      {isMenuVisible && (
        <>
          {user.role === 'STUDENT' && <StudentViewMenu userData={userData} initials={initials} />}
        </>
      )}
      <div className="profile-icon">
        <p>{initials}</p>
      </div>
    </div>
  );
};

const StudentViewMenu = ({ userData, initials }) => {
  return (
    <Menu className="profile-circle-menu">
      <div className="profile-header">
        <div className="profile-icon profile-icon-bigger">
          <p>{initials}</p>
        </div>
        <div className="profile-header-info">
          <h3>
            {userData.firstName} {userData.lastName}
          </h3>
          <p>
            {userData.role}, Cohort {userData.cohort_id}
          </p>
        </div>
      </div>

      <MenuItem linkTo={`/profile/${userData.id}`} icon={<ProfileIcon />} text="Profile" />
    </Menu>
  );
};

const CascadingMenu = ({ userData, initials }) => {
  return (
    <Menu className="profile-circle-menu">
      <div className="profile-header">
        <div className="profile-icon profile-icon-bigger">
          <p>{initials}</p>
        </div>
        <div className="profile-header-info">
          <h3>
            {userData.firstName} {userData.lastName}
          </h3>
          <p>
            {userData.role}, Cohort {userData.cohort_id}
          </p>
        </div>
      </div>
      <MenuItem linkTo={`/profile/${userData.id}`} icon={<ProfileIcon />} text="Profile" />
      <MenuItem icon={<AddIcon />} text="Add note" />

      <MenuItem icon={<CohortIcon />} text="Move to cohort">
        <MenuItem icon={<SquareBracketsIcon />} text="Software Development">
          <MenuItem icon={<CohortIconFill />} text="Cohort 1" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 2" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 3" />
        </MenuItem>

        <MenuItem icon={<MonitorIcon />} text="Frontend Development">
          <MenuItem icon={<CohortIconFill />} text="Cohort 1" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 2" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 3" />
        </MenuItem>
      </MenuItem>

      <MenuItem icon={<DeleteIcon />} text="Delete student" />
    </Menu>
  );
};

export default ProfileCircle;
