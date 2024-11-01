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
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          const compressed = canvas.toDataURL('image/jpeg', 0.5);
          setPhotoData(compressed);
          closeModal();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
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
