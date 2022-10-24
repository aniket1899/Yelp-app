import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './restaurant.module.css';
import { getAllRestaurants } from '../../actions/restaurants';
import DisplayAll from './DisplayRestaurants';
import Pagination from 'react-js-pagination';

const AllRestaurants = ({
  getAllRestaurants,
  restaurant: { restaurants, loading },
}) => {
  useEffect(() => {
    getAllRestaurants();
  }, []);

  const [activePage, setactivePage] = useState(1);

  // Logic for displaying current restaurants
  const indexOfLast = activePage * 2;
  const indexOfFirst = indexOfLast - 2;
  const currentRestaurants = restaurants.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
  };

  let mapsInput = '';
  console.log(mapsInput);
  const displayMaps = () => {
    currentRestaurants.forEach((res) => {
      mapsInput = mapsInput + '|' + res.location;
    });
    return (
      <img
        className='main-map'
        src={`https://maps.googleapis.com/maps/api/staticmap?&size=512x512&maptype=roadmap\&markers=size:mid%7Ccolor:red%20${mapsInput}&key=AIzaSyCKDg7Z_A4RDYYz0Sv1qCWnXX28XyDONCk`}
        alt='maps-locations'
      ></img>
    );
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className='columns'>
        <div className='column is-7' style={{ padding: '2%' }}>
          {' '}
          <h1 className={styles.form_title}>All Restaurants</h1>
          <DisplayAll restaurants={currentRestaurants} filters='' />
          <div className='page-width'>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={2}
              totalItemsCount={restaurants.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
        </div>
        <div className='column is-5'>{displayMaps()}</div>
      </div>
    </Fragment>
  );
};

AllRestaurants.propTypes = {
  getAllRestaurants: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, { getAllRestaurants })(AllRestaurants);
