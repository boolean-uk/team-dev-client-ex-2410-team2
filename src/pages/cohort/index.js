import './style.css';
const Cohort = () => {
  return (
    <div className="cohort-page">
      <div className="cohort-container">
        <h3>My cohort</h3>
        <span className="separator" />
      </div>
      <div className="teachers-container">
        <h3>Teachers</h3>
        <span className="separator" />
      </div>
      <div className="exercise-container">
        <h3>My Exercises</h3>
        <span className="separator" />
      </div>
    </div>
  );
};

export default Cohort;
