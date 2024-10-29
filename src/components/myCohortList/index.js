import { useEffect, useState } from 'react';
import { getUsers } from '../../service/apiClient';
import UserListItem from '../myCohortListItem';
import './style.css';

const MyCohortList = () => {
  const [cohort, setCohort] = useState([]);

  useEffect(() => {
    getUsers().then(setCohort);
  }, []);

  return (
    <article className="cohort">
      <section className="cohort-header">
        <h4>My cohort</h4>
        <p>Software Developer, Cohort 4</p>
      </section>
      <section className="cohort-list border-top">
        {cohort.map((user) => (
          <UserListItem user={user} key={user.id} />
        ))}
      </section>
    </article>
  );
};

export default MyCohortList;
