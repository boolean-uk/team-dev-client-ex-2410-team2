import React from 'react';
import './style.css';
import CheckmarkIcon from '../../assets/icons/checkmarkIcon';

const NotificationPopup = ({ message, actionText, className, onAction, variant = 'success' }) => {
  return (
    <div className="snackbar-page-wrapper">
      <div className={`snackbar ${className}`}>
        <div className="snackbar-left">
          <div className="snackbar-icon">{variant === 'success' && <CheckmarkIcon />}</div>
          <span className="snackbar-message">{message}</span>
        </div>
        {actionText && (
          <a onClick={onAction} className="snackbar-action">
            {actionText}
          </a>
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
