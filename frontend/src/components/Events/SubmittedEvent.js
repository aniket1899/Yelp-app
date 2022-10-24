import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './event.module.css';
import { getSubmittedEvents } from '../../actions/event';
import Pagination from 'react-js-pagination';

const SubmittedEvent = ({
  getSubmittedEvents,
  event: { submitted, loading },
}) => {
  useEffect(() => {
    getSubmittedEvents();
  }, []);

  const [activePage, setactivePage] = useState(1);

  // // Logic for displaying current orders
  // const indexOfLast = activePage * 2;
  // const indexOfFirst = indexOfLast - 2;
  // const currentEvents = submitted.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
  };

  const listSubmittedEvents = () => {
    // Logic for displaying current orders
    const indexOfLast = activePage * 2;
    const indexOfFirst = indexOfLast - 2;
    const currentEvents = submitted.slice(indexOfFirst, indexOfLast);
    return currentEvents.map((event) => {
      return (
        <div className={styles.event_card}>
          <Link to={`/event/details/${event.name}`} className={styles.title}>
            {event.name}
          </Link>
          <br /> <br />
          <p>
            <i class='fas fa-calendar-day'></i> {event.date.substring(0, 10)},{' '}
            {event.time}
          </p>
          <p>
            <i class='fas fa-map-marker-alt'></i> {event.location}
          </p>
          <p className={styles.event_description}>{event.description}</p>
          <p className={styles.event_hashtags}>{event.hashtags}</p>
          <Link
            className={styles.color_white}
            to={{
              pathname: '/event/attendeelist',
              state: { customers: event.customer, name: event.name },
            }}
          >
            View Attendees
          </Link>
        </div>
      );
    });
  };
  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.heading}>Your Submitted Events</h1>
        <div>{listSubmittedEvents()}</div>

        <hr />
        <div className='page-width'>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={2}
            totalItemsCount={submitted.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
        <br />
      </div>
      <Link to='/event' className='btn'>
        Back
      </Link>
    </Fragment>
  );
};

SubmittedEvent.propTypes = {
  getSubmittedEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});
export default connect(mapStateToProps, { getSubmittedEvents })(SubmittedEvent);
