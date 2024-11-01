import { useState, useRef, useEffect } from 'react';
import useModal from '../../hooks/useModal';
import Card from '../card';
import DeletePostModal from '../deletePostModal';
import EditDecisionModal from '../editDecisionModal';
import EditPostModal from '../editPostModal';
import ProfileCircle from '../profileCircle';
import NotificationPopup from '../notificationPopup';
import { formatDate, transformUsernameToInitials } from '../../service/utils';
import './style.css';
import FilledHeartIcon from '../../assets/icons/filledHeartIcon';
import FilledCommentIcon from '../../assets/icons/filledCommentIcon';
import UnfilledHeartIcon from '../../assets/icons/unfilledHeartIcon';
import UnfilledCommentIcon from '../../assets/icons/unfilledCommentIcon';
import PostIcon from '../../assets/icons/postIcon';
import { createComment } from '../../service/apiClient';

const Post = ({
  postId,
  name,
  date,
  content,
  comments = [],
  likes = 0,
  isLoggedIn = false,
  userRole,
  author,
  userID
}) => {
  const { openModal, setModal } = useModal();
  const [menuOptionOpen, setMenuOptionOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState(comments);
  const [showAllComments, setShowAllComments] = useState(false);
  const [toggleShowAllComments, setToggleShowAllComments] = useState(false);
  const [notification, setNotification] = useState(null);

  const userInitials = transformUsernameToInitials(name);
  const canEditPost = isLoggedIn || userRole === 'TEACHER';
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const modalsMap = {
    'Edit post': <EditPostModal username={name} postId={postId} existingContent={content} />,
    'Delete post?': <DeletePostModal postId={postId} setNotification={setNotification} />
  };

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

  const toggleLike = () => {
    setIsLiked((prevLiked) => !prevLiked);
  };

  const toggleComment = () => {
    setIsCommented((prevCommented) => !prevCommented);
    setToggleShowAllComments((prev) => !prev);
    setShowAllComments(false); // Reset to showing only the first few comments initially
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    createComment(newComment, postId, userID);

    setPostComments((prevComments) => [
      ...prevComments,
      {
        content: newComment,
        postId: postId,
        userId: userID
      }
    ]);
    setNewComment('');
  };

  // Show either all comments or just the last 3 based on the state
  const displayedComments = showAllComments ? postComments : postComments.slice(-3);

  return (
    <Card>
      <article className="post">
        <section className="post-details">
          <div className="profile-circle-container">
            <ProfileCircle userData={author} initials={userInitials} />
          </div>
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
          className={`post-interactions-container border-top ${
            comments.length ? 'border-bottom' : ''
          }`}
        >
          <div className="post-interactions">
            <div onClick={toggleLike}>
              {isLiked ? <FilledHeartIcon /> : <UnfilledHeartIcon />}
              <span className="like">Like</span>
            </div>
            <div onClick={toggleComment}>
              {isCommented ? <FilledCommentIcon /> : <UnfilledCommentIcon />}
              <span>Comment</span>
            </div>
          </div>
          <p>{!likes && 'Be the first to like this'}</p>
        </section>

        {toggleShowAllComments && (
          <>
            {postComments.length > 3 && !showAllComments && (
              <div className="see-comments-button" onClick={() => setShowAllComments(true)}>
                See previous comments
              </div>
            )}
            {showAllComments && (
              <div className="see-comments-button" onClick={() => setShowAllComments(false)}>
                Show less
              </div>
            )}

            <section>
              {displayedComments.map((comment, index) => (
                <div className="comment-wrapper" key={index}>
                  <div className="profile-circle">
                    <ProfileCircle userData={comment.author} initials={userInitials} />
                  </div>
                  <div className="comment-container">
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {/* The comment input section is always displayed */}
        <form onSubmit={handleCommentSubmit}>
          <section className="comment-wrapper new-comment-container">
            <div className="profile-circle-container">
              <ProfileCircle userData={author} initials={userInitials} />
            </div>
            <div className="new-comment-input">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="comment-field"
                required
              />
              <div onClick={handleCommentSubmit} className="post-icon-wrapper">
                <PostIcon />
              </div>
            </div>
          </section>
        </form>
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
  );
};

export default Post;
