import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import spinner from '../../layout/Spinner';
import {
  getAllCustomers,
  getSearchResutls,
  getFollowers,
} from '../../../actions/users';
import styles from '../../Events/event.module.css';
import Date from '../../../utils/Date';
import Pagination from 'react-js-pagination';

const Users = ({
  getAllCustomers,
  getSearchResutls,
  getFollowers,
  users: { customers, loading },
}) => {
  useEffect(() => {
    getAllCustomers();
  }, []);

  const [searchData, setsearchData] = useState('');

  const [activePage, setactivePage] = useState(1);

  // Logic for displaying current customers
  const indexOfLast = activePage * 3;
  const indexOfFirst = indexOfLast - 3;
  const currentCustomers = customers.slice(indexOfFirst, indexOfLast);

  const handleSearch = (e) => {
    getSearchResutls(searchData);
    setsearchData('');
  };

  const handleFollowing = (e) => {
    getFollowers();
  };

  const handleAllUsers = (e) => {
    getAllCustomers();
  };

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
  };

  const displayAllCustomers = () => {
    return currentCustomers.map((customer) => {
      return (
        <Fragment>
          <div class='tile is-ancestor'>
            <div class='tile is-4 is-parent'>
              <article class='tile is-child box has-background-info-light'>
                <Link
                  to={`/customer/details/${customer._id}`}
                  className={styles.title}
                >
                  {customer.name}
                </Link>
                <p>
                  <i class='fas fa-calendar-day'></i> Yelping since{' '}
                  <Date date={customer.date.substring(0, 10)} />
                </p>
                {customer.location && (
                  <p>
                    <i class='fas fa-map-marker-alt'></i> {customer.location}
                  </p>
                )}
              </article>
            </div>
          </div>
        </Fragment>
      );
    });
  };
  return loading && !customers ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <div className='columns'>
          <div className='column is-12'>
            <h1 className={styles.heading}>Official Yelp Users</h1>
            <div className={styles.display}>
              <input
                className='field request search_bar'
                type='text'
                placeholder='Search by User Name/Nickname/City'
                name='searchData'
                value={searchData}
                onChange={(e) => setsearchData(e.target.value)}
              />
              <button
                className={styles['search-btn']}
                onClick={(e) => handleSearch(e)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <button
          className={styles['search-btn']}
          onClick={(e) => handleAllUsers(e)}
        >
          All users
        </button>
        <button
          className={styles['search-btn']}
          onClick={(e) => handleFollowing(e)}
        >
          Following
        </button>
        <br />
        <br />
        <hr />
        {displayAllCustomers()}
        <div className='page-width'>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={3}
            totalItemsCount={customers.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

Users.propTypes = {
  getAllCustomers: PropTypes.func.isRequired,
  getSearchResutls: PropTypes.func.isRequired,
  getFollowers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, {
  getAllCustomers,
  getSearchResutls,
  getFollowers,
})(Users);
