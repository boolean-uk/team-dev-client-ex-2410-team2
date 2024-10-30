import { useEffect, useState } from 'react';
import SearchIcon from '../../assets/icons/searchIcon';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import TextInput from '../../components/form/textInput';
import Posts from '../../components/posts';
import useModal from '../../hooks/useModal';
import CohortList from '../../components/cohortList';
import useAuth from '../../hooks/useAuth';
import { get } from '../../service/apiClient';
import './style.css';

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('');
  const [user, setUser] = useState(null);
  const { getLoggedInUserId } = useAuth();
  const userId = getLoggedInUserId();

  useEffect(() => {
    get(`users/${userId}`).then((response) => setUser(response.data.user));
  }, [userId]);

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  // Create a function to run on user interaction
  const showModal = () => {
    // Use setModal to set the header of the modal and the component the modal should render
    setModal('Create a post', <CreatePostModal />); // CreatePostModal is just a standard React component, nothing special

    // Open the modal!
    openModal();
  };

  const renderComponentBasedOnRole = (role) => {
    switch (role) {
      case 'TEACHER':
        return <div>Components not implemented yet.</div>;
      case 'STUDENT':
        return <CohortList />;
      default:
        return null;
    }
  };

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon">
              <p>AJ</p>
            </div>
            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts />
      </main>

      <aside>
        <Card>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextInput icon={<SearchIcon />} value={searchVal} name="Search" onChange={onChange} />
          </form>
        </Card>

        <Card>{renderComponentBasedOnRole(user && user.role)}</Card>
      </aside>
    </>
  );
};

export default Dashboard;
