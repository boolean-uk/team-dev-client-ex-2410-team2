import UserListItemSpecialism from '../../userListComponents/userListItemSpecialism/UserListItemSpecialism';
import './style.css';

const SearchList = ({ users, setIsSearchPage, isSearchPage }) => {
  const isExpanded = users.length > 10;
  const isMinimized = users.length > 0 && users.length < 10;

  const handleSearchPage = () => {
    setIsSearchPage(!isSearchPage);
  };

  return (
    <article className="search-list">
      <section className="search-list-header border-bottom">
        <p>People</p>
      </section>
      <section className="search-list-results">
        {isExpanded && users.map((user) => <UserListItemSpecialism user={user} key={user.id} />)}

        {isMinimized &&
          users
            .slice(0, isExpanded ? users.length : 3)
            .map((user) => <UserListItemSpecialism user={user} key={user.id} />)}

        {users.length > 0 && <button onClick={handleSearchPage}>All results</button>}

        {users.length === 0 && (
          <div className="search-list-no-results">
            <p>Sorry, no results found.</p>
            <p>Try changing your search term.</p>
            {/* Must add button functionality  */}
            <button>Edit search</button>
          </div>
        )}
      </section>
    </article>
  );
};

export default SearchList;
