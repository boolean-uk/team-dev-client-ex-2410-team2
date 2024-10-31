import ProfileCircle from '../../components/profileCircle';
import { transformUsernameToInitials } from '../../service/utils';
import './style.css';
const Cohort = () => {
  const dummyPeople = [
    { id: 1, firstName: 'John', lastName: 'Smith', fullName: 'John Smith' },
    { id: 2, firstName: 'Emma', lastName: 'Johnson', fullName: 'Emma Johnson' },
    { id: 3, firstName: 'Michael', lastName: 'Williams', fullName: 'Michael Williams' },
    { id: 4, firstName: 'Sophia', lastName: 'Brown', fullName: 'Sophia Brown' },
    { id: 5, firstName: 'James', lastName: 'Jones', fullName: 'James Jones' },
    { id: 6, firstName: 'Olivia', lastName: 'Garcia', fullName: 'Olivia Garcia' },
    { id: 7, firstName: 'William', lastName: 'Miller', fullName: 'William Miller' },
    { id: 8, firstName: 'Ava', lastName: 'Davis', fullName: 'Ava Davis' },
    { id: 9, firstName: 'Alexander', lastName: 'Rodriguez', fullName: 'Alexander Rodriguez' },
    { id: 10, firstName: 'Isabella', lastName: 'Martinez', fullName: 'Isabella Martinez' },
    { id: 11, firstName: 'Daniel', lastName: 'Anderson', fullName: 'Daniel Anderson' },
    { id: 12, firstName: 'Mia', lastName: 'Taylor', fullName: 'Mia Taylor' },
    { id: 13, firstName: 'David', lastName: 'Thomas', fullName: 'David Thomas' },
    { id: 14, firstName: 'Charlotte', lastName: 'Moore', fullName: 'Charlotte Moore' },
    { id: 15, firstName: 'Joseph', lastName: 'Jackson', fullName: 'Joseph Jackson' },
    { id: 16, firstName: 'Amelia', lastName: 'Martin', fullName: 'Amelia Martin' },
    { id: 17, firstName: 'Andrew', lastName: 'Lee', fullName: 'Andrew Lee' },
    { id: 18, firstName: 'Harper', lastName: 'Perez', fullName: 'Harper Perez' },
    { id: 19, firstName: 'Lucas', lastName: 'Thompson', fullName: 'Lucas Thompson' },
    { id: 20, firstName: 'Evelyn', lastName: 'White', fullName: 'Evelyn White' },
    { id: 21, firstName: 'Gabriel', lastName: 'Harris', fullName: 'Gabriel Harris' },
    { id: 22, firstName: 'Victoria', lastName: 'Clark', fullName: 'Victoria Clark' },
    { id: 23, firstName: 'Benjamin', lastName: 'Lewis', fullName: 'Benjamin Lewis' },
    { id: 24, firstName: 'Sofia', lastName: 'Walker', fullName: 'Sofia Walker' }
  ];

  return (
    <div className="cohort-page">
      <div className="cohort-container">
        <h3>My cohort</h3>
        <span className="separator" />
        <div className="person-grid">
          {dummyPeople.map((person) => (
            <div key={person.id} className="person-container">
              <ProfileCircle initials={transformUsernameToInitials(person.fullName)} />
              <div className="person-name">{person.fullName}</div>
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
      </div>
      <div className="exercise-container">
        <h3>My Exercises</h3>
        <span className="separator" />
      </div>
    </div>
  );
};

export default Cohort;
