import React, { useState, Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../Restaurant/Dashboard-forms/form.module.css';
import spinner from '../layout/Spinner';
import { RestaurantSendMessage, getConversation } from '../../actions/message';
import { getCurrentDashboard } from '../../actions/dashboard';
import Conversation from './Conversation';

const SendMessage = ({
  match,
  getCurrentDashboard,
  getConversation,
  RestaurantSendMessage,
  dashboard: { profile, loading },
  message: { conversation, loading: mesloading },
}) => {
  const customerId = match.params.id;

  const [text, settext] = useState('');

  useEffect(() => {
    getCurrentDashboard();
    if (!loading) {
      getConversation(profile._id, customerId);
    }
  }, [loading]);

  const onSubmit = (e) => {
    e.preventDefault();
    RestaurantSendMessage(text, customerId);
    settext('');
  };

  return loading ? (
    spinner
  ) : !conversation ? (
    <Fragment>
      {' '}
      <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
        <div className={styles.form_group}>
          <label className={styles.form_label}>Message text</label>
          <br />
          <textarea
            className={styles.my_headline}
            maxlength='2000'
            size='30'
            rows='6'
            type='text'
            name='text'
            value={text}
            onChange={(e) => settext(e.target.value)}
          ></textarea>
        </div>
        <input type='submit' value='Send Message' className={styles.btn} />
      </form>
    </Fragment>
  ) : (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Your Conversation</h1>
        <hr />
        {conversation && <Conversation data={conversation} />}
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Message text</label>
            <br />
            <textarea
              className={styles.my_headline}
              maxlength='2000'
              size='30'
              rows='6'
              type='text'
              name='text'
              value={text}
              onChange={(e) => settext(e.target.value)}
            ></textarea>
          </div>
          <input type='submit' value='Send Message' className={styles.btn} />
        </form>
      </div>
    </Fragment>
  );
};

SendMessage.propTypes = {
  getCurrentDashboard: PropTypes.func.isRequired,
  RestaurantSendMessage: PropTypes.func.isRequired,
  getConversation: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  message: state.message,
});

export default connect(mapStateToProps, {
  getCurrentDashboard,
  RestaurantSendMessage,
  getConversation,
})(withRouter(SendMessage));
