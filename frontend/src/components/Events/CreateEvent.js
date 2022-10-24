import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../Restaurant/Dashboard-forms/form.module.css';
import { createEvent } from '../../actions/event';

const CreateEvent = ({ createEvent, history }) => {
  const [formData, setformData] = useState({
    name: '',
    description: '',
    time: '',
    date: '',
    location: '',
    hashtags: '',
  });

  const { name, description, time, date, location, hashtags } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createEvent(formData, history);
  };

  return (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Create an Event</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Share exciting information about your
          event
        </p>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Event name</label>
            <br />
            <small className={styles.form_text}>This field is required.</small>
            <input
              className={styles.my_text}
              type='text'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>
              Description of your event
            </label>
            <br />
            <small className={styles.form_text}>
              Tell us about your event...
            </small>
            <textarea
              className={styles.my_headline}
              maxlength='3000'
              size='30'
              rows='6'
              type='text'
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Date</label>
            <br />
            <small className={styles.form_text}>When is your event???</small>
            <input
              className={styles.my_text}
              type='text'
              name='date'
              value={date}
              onChange={(e) => onChange(e)}
              placeholder='yyyy-mm-dd'
              title='Please enter a valid date in requested format (YYYY-MM-DD)'
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Time</label>
            <br />
            <small className={styles.form_text}>
              At what time is the event???
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='time'
              value={time}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Location</label>
            <br />
            <small className={styles.form_text}>Tell us your venue...</small>
            <input
              className={styles.my_text}
              type='text'
              name='location'
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Hashtags</label>
            <br />
            <small className={styles.form_text}>
              #music #cooking #food #fashion #arts
            </small>
            <input
              className={styles.my_text}
              type='text'
              name='hashtags'
              value={hashtags}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' value='Create Event' className={styles.btn} />
          <div className={styles.btn_grey}>
            <Link to='/event'>Cancel</Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

CreateEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
};

export default connect(null, {
  createEvent,
})(withRouter(CreateEvent));
