import axios from 'axios';
import {useState, useEffect} from 'react';
import {HiChevronLeft, HiChevronRight} from 'react-icons/hi';

import './App.scss';

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);
  const [viewDetails, setViewDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/users');
    setUsers(data);
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="App">
      <div className='app__container'>
        {currentUsers.map(user => (
          <div key={user.id} className='user'>
            <div className='user__element'>
              <p>{user.company.name}</p>
            </div>
            <div className='user__element'>
              <h5>CONTACT</h5>
              <p>{user.name}</p>
            </div>
            <div className='user__element'>
              <h5>CITY</h5>
              <p>{user.address.city}</p>
            </div>
            <div className='user__element'>
              <h5>STREET</h5>
              <p>{user.address.street}</p>
            </div>
            <button
              className='user__button'
              onClick={() => {viewDetails === user.id ? setViewDetails(null) : setViewDetails(user.id)}}
            >
              {viewDetails === user.id ? "Hide Details" : "View Details"}
            </button>
            
            {viewDetails === user.id &&

              <div className='user__details'>
                
                <div className='user__details__header'>
                  <h5>Catch Phrase</h5>
                  <p>{user.company.catchPhrase}</p>
                </div>

                <div className='user__details__element'>
                  <div>
                    <h5>Contact Person</h5>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <h5>Website</h5>
                    <p>{user.website}</p>
                  </div>
                </div>

                <div className='user__details__element'>
                  <div>
                    <h5>Username</h5>
                    <p>{user.username}</p>
                  </div>
                  <div>
                    <h5>Phone</h5>
                    <p>{user.phone}</p>
                  </div>
                </div>

              </div>

            }

          </div>
        ))}

        <div className='app__footer'>
          <div
            className='app__footer__chervron'
            onClick={() => (
              currentPage === 1 ? setCurrentPage(pageNumbers.length) : setCurrentPage(currentPage - 1)
            )}
          >
            <HiChevronLeft />
          </div>
          <div className='app__footer__button'>
            {pageNumbers.map(number => (
              <button
                key={`Page${number}`}
                onClick={() => {setCurrentPage(number)}}
              >
                {number}
              </button>
            ))}
          </div>
          <div
            className='app__footer__chervron'
            onClick={() => (
              currentPage === pageNumbers.length ? setCurrentPage(1) : setCurrentPage(currentPage + 1)
            )} 
          >
            <HiChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
