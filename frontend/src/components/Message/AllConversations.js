import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../Restaurant/Dashboard-forms/form.module.css';
import { getAllConversations } from '../../actions/message';
import Date from '../../utils/Date';

const AllConversations = ({
  getAllConversations,
  message: { conversations, loading },
}) => {
  useEffect(() => {
    getAllConversations();
  }, []);

  const displayConversations = () => {
    return conversations.map((each) => {
      return (
        <Fragment>
          <article class='message is-info'>
            <div class='message-body'>
              <p>
                <strong>
                  Conversation with {each.restaurant.name} Restaurant.
                </strong>
              </p>
              <em className='is-small'>
                Started on <Date date={each.date} />
              </em>
              <br />
              <br />
              <Link
                className='button is-link is-small'
                to={`/customer/messages/${each._id}`}
              >
                View full conversation
              </Link>
            </div>
          </article>
        </Fragment>
      );
    });
  };
  return (
    <Fragment>
      <h1 className={styles.form_title}>All Conversations</h1>
      <hr />
      <div className='message-container'>{displayConversations()}</div>
    </Fragment>
  );
};

AllConversations.propTypes = {
  getAllConversations: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps, { getAllConversations })(
  AllConversations,
);
