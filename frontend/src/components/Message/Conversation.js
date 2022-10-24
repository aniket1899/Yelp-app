import React, { Fragment } from 'react';
import Date from '../../utils/Date';

const Conversation = ({ data }) => {
  const restName = data.restaurant.name;
  const custName = data.customer.name;
  const displayMessages = () => {
    return data.messages.map((each) => {
      return (
        <Fragment>
          <article class='message is-medium'>
            <div
              className='message-header is-size-7'
              style={{ backgroundColor: '#d32323' }}
            >
              {each.usertype === 'restaurant' ? (
                localStorage.usertype === 'restaurant' ? (
                  <p>You</p>
                ) : (
                  <p>{restName}</p>
                )
              ) : localStorage.usertype === 'customer' ? (
                <p>You</p>
              ) : (
                <p>{custName}</p>
              )}
              <div className='is-italic is-size-7'>
                <Date date={each.date} />
              </div>
            </div>
            <div class='message-body'>{each.text}</div>
          </article>
        </Fragment>
      );
    });
  };
  return (
    <Fragment>
      <div className='message-container'>{displayMessages()}</div>
    </Fragment>
  );
};

export default Conversation;
