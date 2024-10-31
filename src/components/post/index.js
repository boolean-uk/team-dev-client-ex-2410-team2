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
import FilledHeartIcon from '../../assets/icons/filledHeartIcon';
import FilledCommentIcon from '../../assets/icons/filledCommentIcon';
import UnfilledHeartIcon from '../../assets/icons/unfilledHeartIcon';
import UnfilledCommentIcon from '../../assets/icons/unfilledCommentIcon';
import PostIcon from '../../assets/icons/postIcon';

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
  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState(comments);

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

  const toggleLike = () => {
    setIsLiked((prevLiked) => !prevLiked);
  };

  const toggleComment = () => {
    setIsCommented((prevCommented) => !prevCommented);
  };

  // This doenst handle anything with the backend. Comment functionality needs to be implemented first backend.
  const handleCommentSubmit = (event) => {
    event.preventDefault();

    setPostComments((prevComments) => [...prevComments, newComment]);
    setNewComment('');
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

          <section>
            {/* This is only for showing a hardcoded comment. <Comment> </Comment> needs to be removed, and hardcoded values needs to be removed from comments and replaced with dynamic values. */}
            <Comment></Comment>
            {comments.map((comment) =>
              isCommented ? (
                <Comment
                  key={comment.id}
                  name={comment.name}
                  userInitials={userInitials}
                  content={comment.content}
                />
              ) : (
                <></>
              )
            )}
          </section>
          {/* This doesnt handle anything with the backend. Comment functionality needs to be implemented first backend.  */}
          <article className="post">
            <form onSubmit={handleCommentSubmit}>
              <section className="comment-wrapper new-comment-container">
                <div className="profile-circle-container">
                  <ProfileCircle initials={userInitials} />
                </div>
                <div className="comment-container new-comment-input">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="comment-field"
                    required
                  />
                  <div className="post-icon-wrapper">
                    <PostIcon />
                  </div>
                </div>
              </section>
            </form>
          </article>
        </article>
      </Card>
    </>
  );
};

export default Post;
