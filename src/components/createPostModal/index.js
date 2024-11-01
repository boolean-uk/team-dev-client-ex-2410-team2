import { useState } from 'react';
import { post } from '../../service/apiClient';
import useModal from '../../hooks/useModal';
import './style.css';
import Button from '../button';
import { transformUsernameToInitials } from '../../service/utils';

const CreatePostModal = ({ setNotification, user }) => {
  const { closeModal } = useModal();
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await post('posts', { content: text });

      if (response.status === 'fail') {
        throw new Error(response.message || 'Failed to create post');
      }

      setTimeout(() => {
        closeModal();
        setNotification('Posted');
      }, 2000);
    } catch (error) {
      setNotification(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract user's full name and initials
  const fullName = `${user.firstName} ${user.lastName}`;
  const userInitials = transformUsernameToInitials(fullName);

  return (
    <>
      <section className="create-post-user-details">
        <div className="profile-icon">
          <p>{userInitials}</p>
        </div>
        <div className="post-user-name">
          <p>{fullName}</p>
        </div>
      </section>

      <section>
        <textarea onChange={onChange} value={text} placeholder="What's on your mind?"></textarea>
      </section>

      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text={isLoading ? 'Posting...' : 'Post'}
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        />
      </section>
    </>
  );
};

export default CreatePostModal;
