import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../Restaurant/Dashboard-forms/form.module.css';
import { setAlert } from '../../actions/alert';
import { placeorder, getRestaurant } from '../../actions/restaurants';
import ImageCard from '../Restaurant/ImageCard';
import Pagination from 'react-js-pagination';
import spinner from '../layout/Spinner';

const Placeorder = ({
  match,
  placeorder,
  getRestaurant,
  restaurant: { restaurant, loading },
  history,
}) => {
  const restaurantId = match.params.res_id;
  useEffect(() => {
    getRestaurant(match.params.res_id);
  }, []);

  const { menu } = restaurant;

  const [activePage, setactivePage] = useState(1);
  // // Logic for displaying current dishes
  // const indexOfLast = activePage * 2;
  // const indexOfFirst = indexOfLast - 2;
  // const currentMenu = menu.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
  };

  const [deliveryOption, setdeliveryOption] = useState('');
  const [item, setitem] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    placeorder(restaurantId, deliveryOption, item, history);
  };

  const displayItems = () => {
    if (!menu) {
      return '';
    }
    const indexOfLast = activePage * 2;
    const indexOfFirst = indexOfLast - 2;
    const currentMenu = menu.slice(indexOfFirst, indexOfLast);

    return currentMenu.map((item) => {
      return (
        <Fragment>
          <div class='tile is-ancestor'>
            <div class='tile is-parent is-7'>
              <article class='tile is-child box'>
                <div className='columns'>
                  {item.images && (
                    <div className='column is-3'>
                      <ImageCard images={item.images} />
                    </div>
                  )}
                  <div className='column is-9'>
                    <p class={styles['item-title']}>{item.name}</p>
                    <p class={styles['item-ingredients']}>
                      {item.ingredients} <br /> $ {item.price}
                    </p>
                    <p class={styles['item-description']}>{item.description}</p>
                    <br />
                    <div>
                      <label for='forItem' className={styles.form_label}>
                        Select item
                      </label>
                      <input
                        type='checkbox'
                        name='item'
                        value={item}
                        id='forItem'
                        onClick={(e) => setitem(item.name)}
                      />
                    </div>
                    <br />
                    <h1 className={styles.form_label}>
                      Select mode of delivery
                    </h1>
                    <select
                      className='select-css select-orders'
                      // style={{ width: '100px' }}
                      name='deliveryOption'
                      onChange={(e) => setdeliveryOption(e.target.value)}
                    >
                      <option>Select option</option>
                      <option value='Delivery'>Delivery</option>
                      <option value='Pickup'>Pick up</option>
                    </select>
                    <br />
                    <input
                      type='submit'
                      value='Place Order'
                      className='place-order'
                    />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </Fragment>
      );
    });
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Place An Order</h1>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          {/* <h1 className={styles.form_label}>Select an item</h1> */}
          <br />
          {displayItems()}
          <div className='page-width'>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={2}
              totalItemsCount={menu.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
          <Link
            className={styles.btn}
            to={`/restaurant/details/${restaurantId}`}
          >
            Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

Placeorder.propTypes = {
  placeorder: PropTypes.func.isRequired,
  getRestaurant: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.restaurant,
});

export default connect(mapStateToProps, {
  placeorder,
  setAlert,
  getRestaurant,
})(withRouter(Placeorder));
