import { useEffect, useState } from 'react';
import { getUsers } from '../../../service/apiClient';
import './style.css';
import UserListItemCohort from '../../listComponents/listItemCohort/listItemCohort';

const ListOfCohorts = () => {
  // TODO: get the cohorts from the backend
  const [cohort, setCohort] = useState([]);
  useEffect(() => {
    getUsers().then(setCohort([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]));
  }, []);

  return (
    <article className="cohort">
      <section className="cohort-header">
        <h3>Cohorts</h3>
      </section>
      <section className="cohort-list">
        {cohort.map((cohort, i) => (
          <UserListItemCohort cohort={cohort} key={i} />
        ))}
      </section>
    </article>
  );
};

export default { ListOfCohorts };
