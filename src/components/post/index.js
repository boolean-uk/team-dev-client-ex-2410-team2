import { useState, useRef, useEffect } from 'react';
import useModal from '../../hooks/useModal';
import Card from '../card';
import Comment from '../comment';
import DeletePostModal from '../deletePostModal';
import EditDecisionModal from '../editDecisionModal';
import EditPostModal from '../editPostModal';
import ProfileCircle from '../profileCircle';
import NotificationPopup from '../notificationPopup';
import { formatDate, transformUsernameToInitials } from '../../service/utils';
import './style.css';

const Post = ({
  postId,
  name,
  date,
  content,
  comments = [],
  likes = 0,
  isLoggedIn = false,
  userRole
}) => {
  const { openModal, setModal } = useModal();
  const [menuOptionOpen, setMenuOptionOpen] = useState(false);
  const userInitials = transformUsernameToInitials(name);
  const [notification, setNotification] = useState(null);
  const modalsMap = {
    'Edit post': <EditPostModal username={name} postId={postId} exisitingContent={content} />,
    'Delete post?': <DeletePostModal postId={postId} setNotification={setNotification} />
  };
  const canEditPost = isLoggedIn || userRole === 'TEACHER';
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOptionOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOptionOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOptionOpen]);

  const handleDecisionClick = (decision) => {
    setModal(decision, modalsMap[decision]);
    openModal();
    setMenuOptionOpen(false);
  };

  const openMenuOptions = () => {
    setMenuOptionOpen(!menuOptionOpen);
  };

  return (
    <>
      <Card>
        <article className="post">
          <section className="post-details">
            <ProfileCircle initials={userInitials} />

            <div className="post-user-name">
              <p>{name}</p>
              <small>{formatDate(date).replace(',', '')}</small>
            </div>
            {canEditPost && (
              <div className="edit-icon" ref={buttonRef} onClick={openMenuOptions}>
                <p>...</p>
                {menuOptionOpen && (
                  <div ref={modalRef}>
                    <EditDecisionModal
                      onClick={handleDecisionClick}
                      onClose={() => setMenuOptionOpen(false)}
                    />
                  </div>
                )}
              </div>
            )}
          </section>
          <section className="post-content">
            <p>{content}</p>
          </section>

          <section
            className={`post-interactions-container border-top ${comments.length ? 'border-bottom' : null}`}
          >
            <div className="post-interactions">
              <div>Like</div>
              <div>Comment</div>
            </div>

            <p>{!likes && 'Be the first to like this'}</p>
          </section>

          <section>
            {comments.map((comment) => (
              <Comment key={comment.id} name={comment.name} content={comment.content} />
            ))}
          </section>
        </article>
        <div className="notification-container">
          {notification && (
            <NotificationPopup
              actionText="Undo"
              message={notification}
              className="delete-notification"
            />
          )}
        </div>
      </Card>
    </>
  );
};

export default Post;
