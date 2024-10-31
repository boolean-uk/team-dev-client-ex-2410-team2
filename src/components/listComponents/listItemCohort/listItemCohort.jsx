import SquareBracketsIcon from '../../../assets/icons/squareBracketsIcon';
import './listItemCohort.css';

const UserListItemCohort = ({ cohort }) => {
  // TODO change the cohort to align with the backend
  return (
    <section className="cohort-list-user" key={cohort.id}>
      <div className="cohort-green-circle">
        <SquareBracketsIcon />
      </div>
      <div className="cohort-list-details">
        <p className="cohort-list-name">Software development</p>
        <p className="cohort-list-number">{'Cohort ' + cohort.id}</p>
      </div>
    </section>
  );
};

export default UserListItemCohort;
