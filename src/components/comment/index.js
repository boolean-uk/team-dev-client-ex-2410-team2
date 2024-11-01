import ProfileCircle from '../profileCircle';
import useModal from '../../hooks/useModal';
import UserListModal from '../cohortListModal';
import './style.css';

const Comment = ({ name, content, userInitials, author }) => {
  const { openModal, setModal } = useModal();

  const showModal = () => {
    setModal(<UserListModal />);
    openModal();
  };

  return (
    <div className="comment-wrapper">
      <div className="profile-circle-container">
        <ProfileCircle userData={author} initials={userInitials} />
      </div>
      <div className="comment-container">
        <div className="comment-content">
          <h6 className="comment-author">{name}</h6>
          <p className="comment-text">{content}</p>
        </div>
        <div className="edit-icon" onClick={showModal}>
          <p>...</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
