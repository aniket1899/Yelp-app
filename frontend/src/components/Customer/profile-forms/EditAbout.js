import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './form.module.css';
import {
  updateAboutProfile,
  getCurrentProfile,
} from '../../../actions/profile';

const EditAbout = ({
  profile: { profile, loading },
  updateAboutProfile,
  history,
  getCurrentProfile,
}) => {
  const [formData, setformData] = useState({
    thingsILove: '',
    findMeIn: '',
    myBlog: '',
    whenNotYelping: '',
    whyReadMyReviews: '',
    recentDiscovery: '',
  });

  useEffect(() => {
    getCurrentProfile();

    setformData({
      thingsILove:
        loading || !profile.about.thingsILove ? '' : profile.about.thingsILove,
      findMeIn:
        loading || !profile.about.findMeIn ? '' : profile.about.findMeIn,
      myBlog: loading || !profile.about.myBlog ? '' : profile.about.myBlog,
      whenNotYelping:
        loading || !profile.about.notYelping ? '' : profile.about.notYelping,
      whyReadMyReviews:
        loading || !profile.about.whyMyReviews
          ? ''
          : profile.about.whyMyReviews,
      recentDiscovery:
        loading || !profile.about.discovery ? '' : profile.about.discovery,
    });
  }, [loading]);

  const {
    thingsILove,
    findMeIn,
    myBlog,
    whenNotYelping,
    whyReadMyReviews,
    recentDiscovery,
  } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateAboutProfile(formData, history);
  };

  return (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Update About</h1>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>I Love...</label>
            <br />
            <small className={styles.form_text}>
              Comma separated phrases (e.g. sushi, Radiohead, puppies)
            </small>
            <textarea
              className={styles.my_headline}
              maxlength='1024'
              size='30'
              rows='6'
              type='text'
              name='thingsILove'
              value={thingsILove}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Find Me In</label>
            <br />
            <small className={styles.form_text}>
              Nob Hill, the newest brunch spot, a turtleneck
            </small>
            <input
              className={styles.my_headline}
              type='text'
              name='findMeIn'
              value={findMeIn}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>My Blog Or Website</label>
            <br />
            <small className={styles.form_text}>
              www.example.com/myawesomeblog
            </small>
            <input
              className={styles.my_headline}
              type='text'
              name='myBlog'
              value={myBlog}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>When I’m Not Yelping...</label>
            <br />
            <small className={styles.form_text}>
              I’m missing out, I’m working at the art gallery, I’m probably at
              the movies
            </small>
            <input
              className={styles.my_headline}
              type='text'
              name='whenNotYelping'
              value={whenNotYelping}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>
              Why You Should Read My Reviews
            </label>
            <br />
            <small className={styles.form_text}>
              They’re useful, funny, and cool; I tell it like it is; I eat out
              all the time
            </small>
            <input
              className={styles.my_headline}
              type='text'
              name='whyReadMyReviews'
              value={whyReadMyReviews}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Most Recent Discovery</label>
            <br />
            <small className={styles.form_text}>
              Ponies are not baby horses; coconut oil in coffee is actually
              amazing
            </small>
            <input
              className={styles.my_headline}
              type='text'
              name='recentDiscovery'
              value={recentDiscovery}
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

EditAbout.propTypes = {
  updateAboutProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  updateAboutProfile,
  getCurrentProfile,
})(withRouter(EditAbout));
