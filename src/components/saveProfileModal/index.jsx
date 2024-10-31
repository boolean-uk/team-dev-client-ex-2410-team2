import Button from '../button';
import useModal from '../../hooks/useModal';
import './style.css';

const SaveProfileModal = ({ onDontSave, onSave }) => {
  // TODO - make save button call api post request
  const { closeModal } = useModal();

  return (
    <div className="save-profile-modal-container">
      <p>Are you sure you want to save changes?</p>
      <div className="save-profile-modal-buttons">
        <Button text="Don't save" classes="offwhite" onClick={onDontSave} />
        <Button text="Cancel" classes="offwhite" onClick={closeModal} />
        <Button text="Save" classes="blue" onClick={onSave} />
      </div>
    </div>
  );
};

export default SaveProfileModal;
