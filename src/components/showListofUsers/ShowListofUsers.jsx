import UserListItemSpecialism from '../userListComponents/userListItemSpecialism/UserListItemSpecialism';
import './ShowListofUsers.css';
import Button from '../button';

const ShowListofUsers = ({ users }) => {
  const user = users[0];
  return (
    <>
      <article className="user-list-container">
        <section className="user-list-header">
          <h4>{user.role}</h4>
        </section>
        <section className="user-list border-top">
          {users.map((user) => (
            <UserListItemSpecialism user={user} key={user.id} />
          ))}
        </section>
        {user.role === 'STUDENT' && <Button text="All students" classes="user-list-button" />}
      </article>
    </>
  );
};

export default ShowListofUsers;
