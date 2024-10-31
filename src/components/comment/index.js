import ProfileCircle from '../profileCircle';
import useModal from '../../hooks/useModal';
import UserListModal from '../cohortListModal';
import './style.css';

const Comment = ({ name, content, userInitials }) => {
  const { openModal, setModal } = useModal();

  const showModal = () => {
    setModal(<UserListModal />);
    openModal();
  };

  return (
    <div className="comment-wrapper">
      <div className="profile-circle-container">
        <ProfileCircle initials={'ØO'} />
      </div>
      <div className="comment-container">
        <div className="comment-content">
          <h6 className="comment-author">{'Øyvind Onarheim'}</h6>
          <p className="comment-text">
            {
              'ipsasidfnakjsdf asdfasdf aasdfasfd  asd asdfjkasjdf jashdgfjagsdfj asjdfg ajsgdfj asdfgjasgdfjgasdjfgjasdgfj '
            }
          </p>
        </div>
        <div className="edit-icon" onClick={showModal}>
          <p>...</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
