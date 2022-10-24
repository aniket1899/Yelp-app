import React, { useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './event.module.css';
import { getEventByName, registerEvent } from '../../actions/event';

const EventDetails = ({
  match,
  getEventByName,
  registerEvent,
  event: { event, loading },
  history,
}) => {
  const eventName = match.params.event_name;

  useEffect(() => {
    getEventByName(eventName);
  }, []);

  const register = (e, eventId) => {
    e.preventDefault();
    registerEvent(eventId, history);
  };

  return loading || !event ? (
    spinner
  ) : (
    <Fragment>
      <div className={styles.container}>
        <div className='columns'>
          <div className='column is-8'>
            <h1 className='title is-1'>{event.name}</h1>
            <p>
              {' '}
              <i class='fas fa-calendar-check'></i>{' '}
              {event.date && event.date.substring(0, 10)}{' '}
            </p>
            <p>
              {' '}
              <i class='fas fa-clock'></i> {event.time}{' '}
            </p>
            <p>
              {' '}
              <i class='fas fa-map-marker-alt'></i> {event.location}{' '}
            </p>
            <hr />
            <h3 className='event-red'>What/Why</h3>
            <p>{event.description}</p>
            <br />
            <h3 className='event-red'>#hashtags</h3>
            <p>{event.hashtags}</p>
            <br />
          </div>
          <div className='column is-4'>
            {localStorage.usertype === 'customer' ? (
              <Fragment>
                <p className='event-red'>Are you interested?</p>{' '}
                <button
                  type='submit'
                  className={styles.btn}
                  onClick={(e) => register(e, event._id)}
                >
                  RSVP
                </button>
              </Fragment>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <Link to='/event' className={styles.btn} style={{ margin: 30 }}>
        Back to Events
      </Link>
    </Fragment>
  );
};

EventDetails.propTypes = {
  getEventByName: PropTypes.func.isRequired,
  registerEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, { getEventByName, registerEvent })(
  withRouter(EventDetails),
);
