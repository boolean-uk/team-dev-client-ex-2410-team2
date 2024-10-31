import ProfileCircle from '../../profileCircle';
import useModal from '../../../hooks/useModal';
import UserListModal from '../../cohortListModal';

const UserListItem = ({ user }) => {
  const { openModal, setModal } = useModal();

  const showModal = () => {
    setModal(<UserListModal />);
    openModal();
  };

  return (
    <section className="cohort-list-user" key={user.id}>
      <ProfileCircle
        userData={user}
        initials={(user.firstName && user.firstName[0]) + (user.lastName && user.lastName[0])}
      />
      <div className="cohort-list-details">
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div className="edit-icon">
        <p onClick={showModal}>...</p>
      </div>
    </section>
  );
};

export default UserListItem;
