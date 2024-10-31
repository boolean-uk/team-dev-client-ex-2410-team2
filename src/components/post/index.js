import { useState } from 'react';
import useModal from '../../hooks/useModal';
import Card from '../card';
import Comment from '../comment';
import DeletePostModal from '../deletePostModal';
import EditDecisionModal from '../editDecisionModal';
import EditPostModal from '../editPostModal';
import ProfileCircle from '../profileCircle';
import './style.css';
import FilledHeartIcon from '../../assets/icons/filledHeartIcon';
import FilledCommentIcon from '../../assets/icons/filledCommentIcon';
import UnfilledHeartIcon from '../../assets/icons/unfilledHeartIcon';
import UnfilledCommentIcon from '../../assets/icons/unfilledCommentIcon';
import PostIcon from '../../assets/icons/postIcon';

const Post = ({ name, date, content, comments = [], likes = 0, isLoggedIn = false, userRole }) => {
  const { openModal, setModal } = useModal();
  const [menuOptionOpen, setMenuOptionOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState(comments);

  const userInitials = name.match(/\b(\w)/g);
  const modalsMap = {
    'Edit post': <EditPostModal />,
    'Delete post?': <DeletePostModal />
  };
  const canEditPost = isLoggedIn || userRole === 'TEACHER';

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
  const handleCommentSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    setPostComments((prevComments) => [...prevComments, newComment]);
    setNewComment(''); // Clear the input after submitting
  };

  return (
    <Card>
      <article className="post">
        <section className="post-details">
          <ProfileCircle initials={userInitials} />

          <div className="post-user-name">
            <p>{name}</p>
            <small>{date}</small>
          </div>
          {canEditPost && (
            <div className="edit-icon" onClick={openMenuOptions}>
              <p>...</p>
              {menuOptionOpen && <EditDecisionModal onClick={handleDecisionClick} />}
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
        <section>
          <form className="comment-input" onSubmit={handleCommentSubmit}>
            <ProfileCircle initials={userInitials} />
            <div className="input-container">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="comment-field"
                required
              />
              <button type="submit">
                <PostIcon />
              </button>
            </div>
          </form>
        </section>
      </article>
    </Card>
  );
};

export default Post;
