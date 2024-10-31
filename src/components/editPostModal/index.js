import { useState } from 'react';
import { patch } from '../../service/apiClient';
import useModal from '../../hooks/useModal';
import './style.css';
import Button from '../button';
import { transformUsernameToInitials } from '../../service/utils';

const EditPostModal = ({ username, postId, exisitingContent }) => {
  const { closeModal } = useModal();
  const [message, setMessage] = useState(null);
  const [text, setText] = useState(exisitingContent);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await patch(`posts/${postId}`, { content: text });

      if (response.status === 'fail') {
        throw new Error(response.message || 'Failed to update post');
      }

      setMessage('Post updated successfully!');
      setTimeout(() => {
        setMessage(null);
        closeModal();
      }, 2000);
    } catch (error) {
      setMessage('Error updating post: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="create-post-user-details">
        <div className="profile-icon">
          <p>{transformUsernameToInitials(username)}</p>
        </div>
        <div className="post-user-name">
          <p>{username}</p>
        </div>
      </section>

      <section>
        <textarea onChange={onChange} value={text} placeholder="Edit your post"></textarea>
      </section>

      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text={isLoading ? 'Posting...' : 'Post'}
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default EditPostModal;
