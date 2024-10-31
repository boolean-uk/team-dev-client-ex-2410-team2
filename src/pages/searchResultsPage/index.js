import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/card';
import SearchPageList from '../../components/searchList/searchPageList';
import { getUsers } from '../../service/apiClient';
import TextInput from '../../components/form/textInput';
import SearchIcon from '../../assets/icons/searchIcon';
import './style.css';

const SearchResultsPage = ({ isSearchPage, setIsSearchPage }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchVal, setSearchVal] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  useEffect(() => {
    setIsListVisible(!isListVisible);
  }, []);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  }, [searchVal, users]);

  const handlePrev = () => {
    setIsSearchPage(false);
    navigate('/dashboard');
  };

  return (
    <>
      <section className="search-results-page">
        <div className="search-page-header">
          <p onClick={handlePrev}>&lt;-</p>
          <h2>Seach Results</h2>
        </div>
        <div className="search-page-results">
          <Card>
            <form onSubmit={(e) => e.preventDefault()}>
              <TextInput
                type="search"
                icon={<SearchIcon />}
                value={searchVal}
                name="Search"
                onChange={onChange}
                placeholder="Search for people"
              />
            </form>
          </Card>
          <Card>
            {isListVisible && (
              <SearchPageList
                users={filteredUsers}
                isSearchPage={isSearchPage}
                setIsSearchPage={setIsSearchPage}
              />
            )}
          </Card>
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
