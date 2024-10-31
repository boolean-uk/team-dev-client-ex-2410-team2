import ProfileCircle from '../../profileCircle';
import useModal from '../../../hooks/useModal';
import UserListModal from '../../cohortListModal';
import './style.css';

const SearchPageListItem = ({ user }) => {
  const { openModal, setModal } = useModal();

  const showModal = () => {
    setModal(<UserListModal />);
    openModal();
    console.log(user);
  };

  return (
    <section className="cohort-list-user" key={user.id}>
      <ProfileCircle
        initials={(user.firstName && user.firstName[0]) + (user.lastName && user.lastName[0])}
      />
      <div className="cohort-list-details">
        <p className="cohort-list-name">
          {user.firstName} {user.lastName}
        </p>
        <p className="cohort-list-specialism">{user.specialism}</p>
      </div>
      <div className="buttons">
        <button>Profile</button>
        <button>Add note</button>
        <button>Move to cohort</button>
        <p onClick={showModal}>...</p>
      </div>
    </section>
  );
};

export default SearchPageListItem;
