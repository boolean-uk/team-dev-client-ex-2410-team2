import { useState } from 'react';
import Button from '../button';
import './style.css';

const DeletePostModal = () => {
  const [activeBtn, setActiveBtn] = useState('Cancel');

  return (
    <section className="delete-post-container">
      <p className="delete-post-text">Are you sure you want to delete this post?</p>
      <div className="button-container">
        <Button
          text={'Cancel'}
          classes={`btn ${activeBtn === 'Cancel' ? 'active-btn' : ''}`}
          onClick={() => setActiveBtn('Cancel')}
        />
        <Button
          text={'Delete post'}
          classes={`btn ${activeBtn === 'Delete' ? 'active-btn' : ''}`}
          onClick={() => setActiveBtn('Delete')}
        />
      </div>
    </section>
  );
};

export default DeletePostModal;
