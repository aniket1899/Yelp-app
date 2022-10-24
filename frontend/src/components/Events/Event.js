import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './event.module.css';
import { getAllEvents, getRegisteredEvents } from '../../actions/event';
import Pagination from 'react-js-pagination';

const Event = ({
  getAllEvents,
  event: { events, registered, loading },
  getRegisteredEvents,
  // history,
}) => {
  const [sortType, setsortType] = useState('Acsending');
  const [allEvents, setallEvents] = useState([]);

  const [activePage, setactivePage] = useState(1);

  // Logic for displaying current orders
  const indexOfLast = activePage * 3;
  const indexOfFirst = indexOfLast - 3;
  let currentEvents = [];
  // if (localStorage.usertype === 'customer') {
  // currentEvents = allEvents.slice(indexOfFirst, indexOfLast);
  // } else {
  currentEvents = events.slice(indexOfFirst, indexOfLast);
  // }

  useEffect(() => {
    getAllEvents();
    if (localStorage.usertype === 'customer') {
      getRegisteredEvents();
    }
    setallEvents(events);
  }, []);

  useEffect(() => {
    if (!loading) {
      setallEvents(events.reverse());
    }
  }, [loading, sortType]);

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
  };

  const [eventSearch, seteventSearch] = useState('');

  const listAllEvents = (list) => {
    return list.map((event) => {
      if (!event) {
        return '';
      }
      return (
        <div className={styles['event_card']}>
          <Link to={`/event/details/${event.name}`} className={styles.title}>
            {event.name}
          </Link>
          <br /> <br />
          <p>
            <i class='fas fa-calendar-day'></i>{' '}
            {event.eventDate && event.eventDate.substring(0, 10)} {event.time}
          </p>
          <p>
            <i class='fas fa-map-marker-alt'></i> {event.location}
          </p>
          <p className={styles.event_description}>{event.description}</p>
          <p className={styles.event_hashtags}>{event.hashtags}</p>
        </div>
      );
    });
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <div className='columns'>
          <div className='column is-12'>
            <h1 className={styles.heading}>Official Yelp Events</h1>
            <div className={styles.display}>
              <input
                className='field request search_bar'
                type='text'
                placeholder='Search by Event Name'
                name='eventSearch'
                value={eventSearch}
                onChange={(e) => seteventSearch(e.target.value)}
              />
              <Link
                to={`/event/details/${eventSearch}`}
                className={styles.btn_update}
              >
                Search
              </Link>
            </div>
          </div>
        </div>
        {localStorage.usertype === 'customer' && (
          <select
            className='select-css'
            name='allEvents'
            onChange={(e) => setsortType(e.target.value)}
          >
            <option>Sort by...</option>
            <option>Acsending</option>
            <option>Descending</option>
          </select>
        )}
        <div>
          <div className={styles.rest_links}>
            {localStorage.usertype === 'restaurant' && (
              <Fragment>
                <br />
                <Link to='/event/create' className={styles.btn_update}>
                  Create Event
                </Link>{' '}
                <Link to='/event/submitted' className={styles.btn_update}>
                  Events Submitted
                </Link>
              </Fragment>
            )}
          </div>
        </div>
        <br />
        {localStorage.usertype === 'restaurant' && (
          <Fragment>
            <br />
            <br />
          </Fragment>
        )}
        <div>
          {localStorage.usertype === 'restaurant' && registered.length === 0 ? (
            ''
          ) : (
            <Fragment>
              {' '}
              <h1 className={styles.heading}>Your Registered Events</h1>
              <hr />
              {listAllEvents(registered)}
            </Fragment>
          )}
        </div>
        <h1 className={styles.heading}>Popular Events</h1>
        <hr />
        {listAllEvents(currentEvents)}
        <hr />
        <div className='page-width'>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={3}
            totalItemsCount={events.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

Event.propTypes = {
  getAllEvents: PropTypes.func.isRequired,
  getRegisteredEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});
export default connect(mapStateToProps, {
  getAllEvents,
  getRegisteredEvents,
})(withRouter(Event));
