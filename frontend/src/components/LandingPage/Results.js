import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './Landing.module.css';
import { getQueryResults } from '../../actions/search';
import { setAlert } from '../../actions/alert';
import Geocode from 'react-geocode';
import DisplayAll from '../RestaurantTab/DisplayRestaurants';

const Results = ({
  match,
  setAlert,
  getQueryResults,
  search: { results, loading },
}) => {
  const [filterData, setfilterData] = useState('');
  const searchData = match.params.query;

  useEffect(() => {
    getQueryResults(searchData);
  }, []);

  const [list, setlist] = useState(results);

  const handleDataChange = (e) => {
    const newResults = results.filter(
      (res) =>
        res.deliveryMethod === filterData || res.location.includes(filterData),
    );
    if (newResults.length === 0) {
      setAlert('No results for the query', 'danger');
    }
    setlist(newResults);
  };

  const displayFilters = () => {
    return (
      <Fragment>
        <div className={styles.filters}>
          <select
            className='select-css'
            name='status'
            onChange={(e) => setfilterData(e.target.value)}
          >
            <option>Select delivery option</option>
            <option value='Dine In'>Dine In</option>
            <option value='Delivery'>Yelp Delivery</option>
            <option value='Curbside Pick Up'>Curbside Pick Up</option>
          </select>
          <br />
          <button
            className={styles.submit_btn}
            onClick={(e) => handleDataChange(e)}
          >
            Apply Filters
          </button>
        </div>
        <br />
        <div className={styles.near}>
          <button className={styles.btn} onClick={() => getLocation()}>
            Neighborhoods
          </button>
          <br />
          <button
            className={styles.submit_btn}
            onClick={(e) => handleDataChange(e)}
          >
            Apply
          </button>
        </div>
      </Fragment>
    );
  };

  let lat, lon;

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude.toString();
      lon = position.coords.longitude.toString();
      console.log('Latitude is :', lat);
      console.log('Longitude is :', lon);

      Geocode.setApiKey('AIzaSyDm3j_pnpxldUWSZYWsXolf4PDktU5NiHs');
      Geocode.setLanguage('en');
      Geocode.setRegion('es');
      // Get address from latitude & longitude.
      Geocode.fromLatLng(lat, lon).then(
        (response) => {
          const address = response.results[0].address_components[4].long_name;
          console.log('Geocode: ', address);
          setfilterData(address);
        },
        (error) => {
          console.error(error);
        },
      );
    });
  };

  let mapsInput = '';
  console.log(mapsInput);

  const displayMaps = (data) => {
    if (data.length === 0) {
      return '';
    }

    data.forEach((res) => {
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
        <div
          className='column is-7'
          style={{ padding: '2%', marginLeft: '2%' }}
        >
          {' '}
          <h1 className={styles.form_title1}>Search Results</h1>
          {displayFilters()}
          {filterData ? (
            <DisplayAll restaurants={list} />
          ) : (
            <DisplayAll restaurants={results} />
          )}
          <br />
          <Link to='/' className='btn'>
            Back to Search
          </Link>
        </div>
        <div className='column is-5'>
          {filterData ? displayMaps(list) : displayMaps(results)}
        </div>
      </div>
    </Fragment>
  );
};

Results.propTypes = {
  getQueryResults: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  search: state.search,
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, {
  setAlert,
  getQueryResults,
})(Results);
