import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCustomerDetails } from '../../actions/customer';
import { followUser } from '../../actions/users';
import spinner from '../layout/Spinner';
import { BACKEND_URL } from '../../utils/constants';
import Date from '../../utils/Date';
import '../css/profile.css';

const Customer = ({
  getCustomerDetails,
  followUser,
  customer: { customer, loading },
  match,
}) => {
  useEffect(() => {
    getCustomerDetails(match.params.customerId);
  }, []);

  let imgSrc;
  if (customer) {
    imgSrc = `${BACKEND_URL}/customer/images/${customer.image}`;
  }

  const handleFollow = (e) => {
    followUser(customer._id);
  };

  return loading || !customer ? (
    spinner
  ) : (
    <Fragment>
      <div className='profile-container'>
        <div className='left-profile'>
          <img src={imgSrc} alt='Profile-pic' />
          <h3 className='profile-title'>{customer.name}'s Profile</h3>
          <h3 className='subheading'>Contact information</h3>
          <h4 className='profile-title'>Email</h4>
          <p>{customer.email}</p>
          <h4 className='profile-title'>Phone</h4>
          <p>{customer.phone}</p>
        </div>
        <div className='middle'>
          <div className='middle-heading'>
            <h1 className='name'>{customer.name}</h1>
            <h3>
              <i class='fas fa-home'></i> {customer.about.city},{' '}
              {customer.about.state}, {customer.about.country}
            </h3>
            {!customer.about.nickname ? (
              ''
            ) : (
              <Fragment>
                <h3>
                  <i class='fas fa-chess-pawn'></i>
                  {'   '} Call me *{customer.about.nickname}*
                </h3>
              </Fragment>
            )}
          </div>
          <hr />
          <h2 className='activity'>Headline</h2>
          {!customer.about.headline ? (
            <p>Add your headline...</p>
          ) : (
            <Fragment>
              <h4 className='headline'>{customer.about.headline}</h4>
            </Fragment>
          )}
          {!customer.about.dob ? (
            ''
          ) : (
            <Fragment>
              <h2 className='activity'>Don't forget to wish me on</h2>
              <h4 className='profile-title'>
                <i class='fas fa-birthday-cake'></i>{' '}
                <Date date={customer.about.dob} />
              </h4>
              <br />
            </Fragment>
          )}
          <h2 className='activity'>Recent Activity</h2>
          {/* {displayEvents()} */}
        </div>
        <div className='right-profile'>
          <div>
            {localStorage.usertype === 'customer' && (
              <button className='btn' onClick={(e) => handleFollow(e)}>
                Follow
              </button>
            )}
            {localStorage.usertype === 'restaurant' && (
              <Link to={`/restaurant/message/${customer._id}`} className='btn'>
                Message {customer.name}
              </Link>
            )}
          </div>
          <hr />
          <div>
            <h3 className='subheading'>About {customer.name}</h3>
            <h4 className='profile-title'>Location</h4>
            <p>
              <i class='fas fa-home'></i> {customer.about.city},{' '}
              {customer.about.state}, {customer.about.country}
            </p>
            <h4 className='profile-title'>Yelping Since</h4>
            <p>
              <i class='fas fa-calendar-day'></i> <Date date={customer.date} />
            </p>
            <h4 className='profile-title'>Things I Love</h4>
            {!customer.about.thingsILove ? (
              <p>You haven't told us yet ... do tell!</p>
            ) : (
              <p>
                <i class='fas fa-heart'></i> {customer.about.thingsILove}
              </p>
            )}

            {!customer.about.findMeIn ? (
              ''
            ) : (
              <Fragment>
                <h4 className='profile-title'>Find me in</h4>
                <p>
                  <i class='fas fa-plane-departure'></i>{' '}
                  {customer.about.findMeIn}
                </p>
              </Fragment>
            )}
            {!customer.about.myBlog ? (
              ''
            ) : (
              <Fragment>
                <h4 className='profile-title'>My Blog</h4>
                <p>
                  <i class='fas fa-blog'></i> {customer.about.myBlog}
                </p>
              </Fragment>
            )}
            {!customer.about.notYelping ? (
              ''
            ) : (
              <Fragment>
                <h4 className='profile-title'>When not yelping</h4>
                <p>
                  <i class='fas fa-hourglass-half'></i>{' '}
                  {customer.about.notYelping}
                </p>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Customer.propTypes = {
  getCustomerDetails: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  customer: state.customer,
});

export default connect(mapStateToProps, {
  getCustomerDetails,
  followUser,
})(Customer);
