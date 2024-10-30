import React, { useRef } from 'react';
import Button from '../button';
import './style.css';
import useModal from '../../hooks/useModal';

const UploadPhotoModal = ({ setPhotoData }) => {
  const { closeModal } = useModal();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoData(e.target.result);
        closeModal();
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Please select an image file.');
    }
  };

  return (
    <>
      <p>Choose a file to upload for your headshot</p>
      <div className="upload-photo-buttons">
        <Button onClick={closeModal} text="Cancel" classes={`offwhite width-full`} />
        <Button onClick={handleButtonClick} text="Choose file" classes={`blue width-full`} />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </>
  );
};

export default UploadPhotoModal;
