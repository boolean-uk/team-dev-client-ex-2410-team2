import React from 'react';
import './style.css';
import CheckmarkIcon from '../../assets/icons/checkmarkIcon';

const NotificationPopup = ({ message, actionText, onAction }) => {
  return (
    <div className="snackbar">
      <div className="snackbar-icon">
        <CheckmarkIcon />
      </div>
      <span className="snackbar-message">{message}</span>
      {actionText && (
        <button onClick={onAction} className="snackbar-action">
          {actionText}
        </button>
      )}
    </div>
  );
};

export default NotificationPopup;
