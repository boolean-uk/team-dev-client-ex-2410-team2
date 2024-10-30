import AddIcon from '../../assets/icons/addIcon';
import DeleteIcon from '../../assets/icons/deleteIcon';
import './style.css';

const EditDecisionModal = ({ onClick }) => {
  return (
    <section className="edit-decision-container">
      <div className="decision-icon-container" onClick={() => onClick('Edit post')}>
        {/* Using add icon since I cant find the edit icon in assets/icons. */}
        <AddIcon />
        <p>Edit post</p>
      </div>
      <div className="decision-icon-container" onClick={() => onClick('Delete post?')}>
        <DeleteIcon />
        <p>Delete post</p>
      </div>
    </section>
  );
};

export default EditDecisionModal;
