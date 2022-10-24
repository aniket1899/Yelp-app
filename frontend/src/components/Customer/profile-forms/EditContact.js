import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './form.module.css';
import {
  updateContactProfile,
  getCurrentProfile,
} from '../../../actions/profile';

const EditContact = ({
  profile: { profile, loading },
  updateContactProfile,
  history,
  getCurrentProfile,
}) => {
  const [formData, setformData] = useState({
    email: '',
    phone: '',
  });

  useEffect(() => {
    getCurrentProfile();

    setformData({
      email: loading || !profile.email ? '' : profile.email,
      phone: loading || !profile.phone ? '' : profile.phone,
    });
  }, [loading]);

  const { email, phone } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateContactProfile(formData, history);
  };

  return (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Update Contact</h1>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Email</label>
            <br />
            <small className={styles.form_text}>This field is required.</small>
            <input
              className={styles.my_headline}
              type='email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Phone</label>
            <br />
            <input
              className={styles.my_headline}
              type='text'
              name='phone'
              value={phone}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' value='Save Changes' className={styles.btn} />
          <div className={styles.btn_grey}>
            <Link to='/profile'>Cancel</Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

EditContact.propTypes = {
  updateContactProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  updateContactProfile,
  getCurrentProfile,
})(withRouter(EditContact));
