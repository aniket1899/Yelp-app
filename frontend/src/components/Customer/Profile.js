import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import spinner from '../layout/Spinner';
import Date from '../../utils/Date';
import '../css/profile.css';
import { BACKEND_URL } from '../../utils/constants';
import { getRegisteredEvents } from '../../actions/event';

const Profile = ({
  getCurrentProfile,
  profile: { profile, loading },
  getRegisteredEvents,
  event: { registered, loading: loading_event },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getRegisteredEvents();
  }, []);

  let imgSrc;
  if (profile) {
    imgSrc = `${BACKEND_URL}/customer/images/${profile.image}`;
  }

  const displayEvents = () => {
    return registered.map((event) => {
      return (
        <Fragment>
          <div class='box' style={{ color: 'black' }}>
            <article class='media'>
              <div class='media-content'>
                <div class='content'>
                  <p>
                    You registered for{' '}
                    <strong>
                      <Link
                        to={`/event/details/${event.name}`}
                        // className={styles.title1}
                      >
                        {event.name}
                      </Link>
                    </strong>{' '}
                    <small>@{event.location}</small>
                    <br />
                    <small>
                      {event.date && event.date.substring(0, 10)} , {event.time}{' '}
                    </small>
                    <br />
                    {event.description}
                  </p>
                </div>
              </div>
            </article>
          </div>
          <hr />
        </Fragment>
      );
    });
  };

  return loading || profile === null ? (
    spinner
  ) : (
    <Fragment>
      <div className='profile-container'>
        <div className='left-profile'>
          <img src={imgSrc} alt='Profile-pic' />
          <h3 className='profile-title'>{profile.name}'s Profile</h3>
          <h3 className='subheading'>Contact information</h3>
          <h4 className='profile-title'>Email</h4>
          <p>{profile.email}</p>
          <h4 className='profile-title'>Phone</h4>
          <p>{profile.phone}</p>
        </div>
        <div className='middle'>
          <div className='middle-heading'>
            <h1 className='name'>{profile.name}</h1>
            <h3>
              <i class='fas fa-home'></i> {profile.about.city},{' '}
              {profile.about.state}, {profile.about.country}
            </h3>
            {!profile.about.nickname ? (
              ''
            ) : (
              <Fragment>
                <h3>
                  <i class='fas fa-chess-pawn'></i>
                  {'   '} Call me *{profile.about.nickname}*
                </h3>
              </Fragment>
            )}
          </div>
          <hr />
          <h2 className='activity'>Headline</h2>
          {!profile.about.headline ? (
            <Fragment>
              <p>Add your headline...</p>
              <br />
            </Fragment>
          ) : (
            <Fragment>
              <h4 className='headline'>{profile.about.headline}</h4>
            </Fragment>
          )}
          {!profile.about.dob ? (
            ''
          ) : (
            <Fragment>
              <h2 className='activity'>Don't forget to wish me on</h2>
              <h4 className='profile-title'>
                <i class='fas fa-birthday-cake'></i>{' '}
                <Date date={profile.about.dob} />
              </h4>
              <br />
            </Fragment>
          )}
          <h2 className='activity'>Recent Activity</h2>
          {displayEvents()}
        </div>
        <div className='right-profile'>
          <div className='update-links'>
            <Link to='/update/basic' className='btn-update'>
              <i class='fas fa-address-card'></i> Update Basics
            </Link>
            <Link to='/update/about' className='btn-update'>
              <i class='fas fa-user'></i> Update About
            </Link>
            <Link to='/update/contact' className='btn-update'>
              <i class='fas fa-phone-alt'></i> Update Contact
            </Link>
          </div>
          <div>
            <h3 className='subheading'>About {profile.name}</h3>
            <h4 className='profile-title'>Location</h4>
            <p>
              <i class='fas fa-home'></i> {profile.about.city},{' '}
              {profile.about.state}, {profile.about.country}
            </p>
            <h4 className='profile-title'>Yelping Since</h4>
            <p>
              <i class='fas fa-calendar-day'></i> <Date date={profile.date} />
            </p>
            <h4 className='profile-title'>Things I Love</h4>
            {!profile.about.thingsILove ? (
              <p>You haven't told us yet ... do tell!</p>
            ) : (
              <p>
                <i class='fas fa-heart'></i> {profile.about.thingsILove}
              </p>
            )}

            {!profile.about.findMeIn ? (
              ''
            ) : (
              <Fragment>
                <h4 className='profile-title'>Find me in</h4>
                <p>
                  <i class='fas fa-plane-departure'></i>{' '}
                  {profile.about.findMeIn}
                </p>
              </Fragment>
            )}
            {!profile.about.myBlog ? (
              ''
            ) : (
              <Fragment>
                <h4 className='profile-title'>My Blog</h4>
                <p>
                  <i class='fas fa-blog'></i> {profile.about.myBlog}
                </p>
              </Fragment>
            )}
            {!profile.about.notYelping ? (
              ''
            ) : (
              <Fragment>
                <h4 className='profile-title'>When not yelping</h4>
                <p>
                  <i class='fas fa-hourglass-half'></i>{' '}
                  {profile.about.notYelping}
                </p>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getRegisteredEvents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  event: state.event,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getRegisteredEvents,
})(Profile);
