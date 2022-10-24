import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../Restaurant/Dashboard-forms/form.module.css';
import { writeReview } from '../../actions/restaurants';

const AddReview = ({ match, writeReview, history }) => {
  const [formData, setformData] = useState({
    text: '',
    rating: '',
  });

  const { text, rating } = formData;

  const resId = match.params.res_id;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    writeReview(resId, formData, history);
  };

  return (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Write Your Review</h1>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Your rating (1-5)</label>
            <br />
            <small className={styles.form_text}>Give us a rating</small>
            <input
              className={styles.my_text}
              type='text'
              placeholder='1-5'
              pattern='[1-5]{1}'
              name='rating'
              value={rating}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Review</label>
            <br />
            <small className={styles.form_text}>
              Tell us what you feel about our restaurant...
            </small>
            <textarea
              className={styles.my_headline}
              maxlength='1024'
              size='30'
              rows='6'
              type='text'
              name='text'
              value={text}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <input type='submit' value='Submit Review' className={styles.btn} />
          <div className={styles.btn_grey}>
            <Link to={`/restaurant/details/${resId}`}>Cancel</Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

AddReview.propTypes = {
  writeReview: PropTypes.func.isRequired,
};

export default connect(null, { writeReview })(withRouter(AddReview));
