import React, { useState, Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../Restaurant/Dashboard-forms/form.module.css';
import spinner from '../layout/Spinner';
import {
  getCustomerConversation,
  CustomerSendMessage,
} from '../../actions/message';
import Conversation from './Conversation';

const CustomerConv = ({
  match,
  getCustomerConversation,
  CustomerSendMessage,
  history,
  message: { conversation, loading },
}) => {
  const messageId = match.params.id;

  const [text, settext] = useState('');

  useEffect(() => {
    getCustomerConversation(messageId);
  }, [conversation]);

  const onSubmit = (e) => {
    e.preventDefault();
    CustomerSendMessage(text, messageId, history);
    settext('');
  };

  return !conversation || loading ? (
    spinner
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

CustomerConv.propTypes = {
  getCustomerConversation: PropTypes.func.isRequired,
  CustomerSendMessage: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps, {
  getCustomerConversation,
  CustomerSendMessage,
})(withRouter(CustomerConv));
