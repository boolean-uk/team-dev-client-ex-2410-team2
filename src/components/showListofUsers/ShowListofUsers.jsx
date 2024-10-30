import { useEffect, useState } from 'react';
import { getUsers } from '../../service/apiClient';
import UserListItemSpecialism from '../userListComponents/userListItemSpecialism/UserListItemSpecialism';
import './ShowListofUsers.css';

const ShowListofUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const teachers = users.filter((user) => user.role === 'TEACHER');
  const students = users.filter((user) => user.role === 'STUDENT');

  return (
    <>
      <article className="user-list-container">
        <section className="user-list-header">
          <h4>Students</h4>
        </section>
        <section className="user-list border-top">
          {students.map((user) => (
            <UserListItemSpecialism user={user} key={user.id} />
          ))}
        </section>
      </article>
      <article>
        <section className="user-list-header">
          <h4>Teachers</h4>
        </section>
        <section className="user-list border-top">
          {teachers.map((user) => (
            <UserListItemSpecialism user={user} key={user.id} />
          ))}
        </section>
      </article>
    </>
  );
};

export default ShowListofUsers;
