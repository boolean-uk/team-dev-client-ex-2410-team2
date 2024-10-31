import UserListItemSpecialism from '../../userListComponents/userListItemSpecialism/UserListItemSpecialism';
import './style.css';

const SearchPageList = ({ users }) => {
  return (
    <article className="search-page-results">
      <section className="search-page-results-header border-bottom">
        <p>People</p>
      </section>
      <section className="search-page-results-list">
        {users.map((user) => (
          <UserListItemSpecialism user={user} key={user.id} />
        ))}
      </section>
      <section className="search-page-noresults">
        {users.length === 0 && (
          <div className="">
            <p>Sorry, no results found.</p>
            <p>Try changing your search term.</p>
            <button>Edit search</button>
          </div>
        )}
      </section>
    </article>
  );
};

export default SearchPageList;
