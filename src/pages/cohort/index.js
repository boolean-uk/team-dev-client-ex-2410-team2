// import { useState, useEffect } from 'react';
import ProfileCircle from '../../components/profileCircle';
import { transformUsernameToInitials } from '../../service/utils';
// import { getUsers } from '../../service/apiClient';
import SquareBracketsIcon from '../../assets/icons/squareBracketsIcon';

import './style.css';
const Cohort = () => {
  // const [users, setUsers] = useState([]);
  // const [cohort, setCohort] = useState([]);

  /*
  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);
  */

  /*
  useEffect(() => {
    get('cohorts').then((cohorts) => setCohort(cohorts.data.cohorts));
  }, []);
  */

  const dummyUsers = [
    { id: 1, firstName: 'John', lastName: 'Smith', hexColor: '#6B8FAB' },
    { id: 2, firstName: 'Emma', lastName: 'Johnson', hexColor: '#7BA88D' },
    { id: 3, firstName: 'Michael', lastName: 'Williams', hexColor: '#8BA6C1' },
    { id: 4, firstName: 'Sophia', lastName: 'Brown', hexColor: '#89B8A1' },
    { id: 5, firstName: 'James', lastName: 'Jones', hexColor: '#9BAAB8' },
    { id: 6, firstName: 'Olivia', lastName: 'Garcia', hexColor: '#7D9BAF' },
    { id: 7, firstName: 'William', lastName: 'Miller', hexColor: '#8CAA97' },
    { id: 8, firstName: 'Ava', lastName: 'Davis', hexColor: '#6D95B5' },
    { id: 9, firstName: 'Alexander', lastName: 'Rodriguez', hexColor: '#79A898' },
    { id: 10, firstName: 'Isabella', lastName: 'Martinez', hexColor: '#A8B5C1' },
    { id: 11, firstName: 'Daniel', lastName: 'Anderson', hexColor: '#7F9DB1' },
    { id: 12, firstName: 'Mia', lastName: 'Taylor', hexColor: '#88B5A3' },
    { id: 13, firstName: 'David', lastName: 'Thomas', hexColor: '#92ACC2' },
    { id: 14, firstName: 'Charlotte', lastName: 'Moore', hexColor: '#86A699' },
    { id: 15, firstName: 'Joseph', lastName: 'Jackson', hexColor: '#95B1C3' },
    { id: 16, firstName: 'Amelia', lastName: 'Martin', hexColor: '#7EA494' },
    { id: 17, firstName: 'Andrew', lastName: 'Lee', hexColor: '#89A7B9' },
    { id: 18, firstName: 'Harper', lastName: 'Perez', hexColor: '#8BB4A6' },
    { id: 19, firstName: 'Lucas', lastName: 'Thompson', hexColor: '#93AFC5' },
    { id: 20, firstName: 'Evelyn', lastName: 'White', hexColor: '#84A89B' },
    { id: 21, firstName: 'Gabriel', lastName: 'Harris', hexColor: '#7B9BB0' },
    { id: 22, firstName: 'Victoria', lastName: 'Clark', hexColor: '#8AB3A5' },
    { id: 23, firstName: 'Benjamin', lastName: 'Lewis', hexColor: '#96B2C7' },
    { id: 24, firstName: 'Sofia', lastName: 'Walker', hexColor: '#82A79A' }
  ];

  const dummyTeachers = [
    {
      id: 1,
      firstName: 'David',
      lastName: 'Anderson',
      role: 'Lead Instructor',
      hexColor: '#6B8FAB'
    },
    { id: 2, firstName: 'Sarah', lastName: 'Chen', role: 'Backend Developer', hexColor: '#7BA88D' },
    {
      id: 3,
      firstName: 'Marcus',
      lastName: 'Peterson',
      role: 'Frontend Specialist',
      hexColor: '#8BA6C1'
    },
    {
      id: 4,
      firstName: 'Elena',
      lastName: 'Rodriguez',
      role: 'DevOps Engineer',
      hexColor: '#89B8A1'
    },
    { id: 5, firstName: 'Thomas', lastName: 'Berg', role: 'Database Expert', hexColor: '#9BAAB8' },
    { id: 6, firstName: 'Anna', lastName: 'Wilson', role: 'UX Designer', hexColor: '#7D9BAF' }
  ];
  return (
    <div className="cohort-page">
      <div className="cohort-container">
        <h3>My cohort</h3>
        <div className="cohort-info-container">
          <div className="web-icon-background">
            <SquareBracketsIcon />
          </div>
          <div className="title-info-contianer">
            <h4>Software Development, cohort 4</h4>
            <p>January 2023 - June 2023</p>
          </div>
        </div>
        <div className="person-grid">
          {dummyUsers.map((person) => (
            <div key={person.id} className="person-container">
              <ProfileCircle
                initials={transformUsernameToInitials(person.firstName + ' ' + person.lastName)}
                colorCode={person.hexColor}
              />
              <div className="person-name">{person.firstName + ' ' + person.lastName}</div>
              <div className="dots-background">
                <p className="dots">...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="teachers-container">
        <h3>Teachers</h3>
        <span className="separator" />
        {dummyTeachers.map((person) => (
          <div key={person.id} className="person-container teacher">
            <ProfileCircle
              initials={transformUsernameToInitials(person.firstName + ' ' + person.lastName)}
              colorCode={person.hexColor}
            />
            <div className="teacher-name-role-container">
              <div className="person-name">{person.firstName + ' ' + person.lastName}</div>
              <div className="teacher-role">{person.role}</div>
            </div>
            <div className="dots-background">
              <p className="dots">...</p>
            </div>
          </div>
        ))}
      </div>
      <div className="exercise-container">
        <h3>My Exercises</h3>
        <span className="separator" />
        <div className="module-container">
          <p>Modules: 2/7 completed</p>
          <p>Units: 4/10 completed</p>
          <p>Exercises: 34/58 completed</p>
        </div>
        <button>See Exercise</button>
      </div>
    </div>
  );
};

export default Cohort;
