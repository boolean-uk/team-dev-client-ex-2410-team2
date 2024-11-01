<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useState, useEffect, createContext } from 'react';
import { getUsers, get } from '../../service/apiClient';

>>>>>>> main
import SearchIcon from '../../assets/icons/searchIcon';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import TextInput from '../../components/form/textInput';
import Posts from '../../components/posts';
import useModal from '../../hooks/useModal';
<<<<<<< HEAD
import ShowListofUsers from '../../components/showListofUsers/ShowListofUsers';
import { getUsers } from '../../service/apiClient';
=======
import NotificationPopup from '../../components/notificationPopup';
import { transformUsernameToInitials } from '../../service/utils';

import SearchList from '../../components/searchList';

import useAuth from '../../hooks/useAuth';

import CohortList from '../../components/lists/cohortList/index';
>>>>>>> main

import './style.css';

export const UserContext = createContext();

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('');
  const [users, setUsers] = useState([]);
<<<<<<< HEAD
  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);
=======
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isListVisible, setIsListVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const { getLoggedInUserId } = useAuth();
  const userId = getLoggedInUserId();

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  }, [searchVal, users]);

  useEffect(() => {
    get(`users/${userId}`).then((response) => setUser(response.data.user));
  }, [userId]);
>>>>>>> main

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  const teachers = users.filter((user) => user.role === 'TEACHER');
  const students = users.filter((user) => user.role === 'STUDENT');

  // Create a function to run on user interaction
  const showModal = () => {
    // Use setModal to set the header of the modal and the component the modal should render
    setModal('Create a post', <CreatePostModal setNotification={setNotification} />); // CreatePostModal is just a standard React component, nothing special

    // Open the modal!
    openModal();
  };

  const renderComponentBasedOnRole = (role) => {
    switch (role) {
      case 'TEACHER': {
        // TODO: Add the correct sidebar items for teachers when component is ready.
        const teacherSidebarItems = ['Cohorts', 'Students', 'Teachers'];
        return (
          <>
            {teacherSidebarItems.map((item) => (
              <Card key={item}>
                <h4>{item}</h4>
              </Card>
            ))}
          </>
        );
      }
      case 'STUDENT':
        return (
          <Card>
            <CohortList />
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <UserContext.Provider value={{ user }}>
        <main>
          <Card>
            <div className="create-post-input">
              <div className="profile-icon">
                <p>{user && transformUsernameToInitials(`${user.firstName} ${user.lastName}`)}</p>
              </div>
              <Button text="What's on your mind?" onClick={showModal} />
            </div>
          </Card>
          <Posts />
          <div className="notification-container">
            {notification && (
              <NotificationPopup
                actionText="Edit"
                message={notification}
                className="delete-notification"
              />
            )}
          </div>
        </main>

        <aside>
          <Card>
            <form
              onClick={() => setIsListVisible(!isListVisible)}
              onSubmit={(e) => e.preventDefault()}
            >
              <TextInput
                type="search"
                icon={<SearchIcon />}
                value={searchVal}
                name="Search"
                onChange={onChange}
                placeholder="Search for people"
              />
            </form>
          </Card>

          {isListVisible && <SearchList users={filteredUsers} />}

<<<<<<< HEAD
        <Card>
          <ShowListofUsers users={students}></ShowListofUsers>
          <ShowListofUsers users={teachers}></ShowListofUsers>
        </Card>
      </aside>
=======
          {renderComponentBasedOnRole(user && user.role)}
        </aside>
      </UserContext.Provider>
>>>>>>> main
    </>
  );
};

export default Dashboard;
