import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import styles from '../profile-forms/form.module.css';
import spinner from '../../layout/Spinner';
import Date from '../../../utils/Date';

const FilterOrders = ({ orders: { allorders, loading }, setAlert, match }) => {
  const data = match.params.data;
  const displayOrders = (orders) => {
    orders = orders.filter(
      (order) => order.status === data || order.deliveryOption === data,
    );

    if (orders.length === 0) {
      setAlert('No orders to display', 'danger');
    }

    return orders.map((order) => {
      return (
        <div className='tile is-ancestor'>
          <div class='tile is-parent is-4'>
            <article class='tile is-child box has-background-link-light'>
              <p class='title is-4 has-text-black'>{order.item}</p>
              <p class='title is-5 has-text-danger-dark'>
                {order.restaurant.name} [{order.deliveryOption}]
              </p>
              <p class='subtitle'>{order.status}</p>
              <p class='date-order'>
                Order placed on: <Date date={order.date.substring(0, 10)} />
              </p>
            </article>
          </div>
        </div>
      );
    });
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className='container'>
        <h1 className={styles.form_title}>Orders Placed By You</h1>
        <hr />
        <h1 className={styles.title}>{data} Orders</h1>
        {displayOrders(allorders)}
        <br />
        <br />
        <Link to='/customer/orders' className={styles.top_btn}>
          Back to All Orders
        </Link>
      </div>
    </Fragment>
  );
};

FilterOrders.propTypes = {
  setAlert: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.cusOrder,
});

export default connect(mapStateToProps, { setAlert })(FilterOrders);
