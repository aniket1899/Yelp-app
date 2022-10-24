import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../Dashboard-forms/form.module.css';
import Date from '../../../utils/Date';

const OrdersNew = ({ order: { allOrders }, setAlert, match }) => {
  let data = match.params.data;

  if (data === 'Pickedup' || data === 'Delivered') {
    data = 'Completed';
  }

  const displayOrders = (orders) => {
    return orders.map((order) => {
      return (
        <Fragment>
          <div className='tile is-ancestor'>
            <div class='tile is-parent is-5'>
              <article class='tile is-child box has-background-link-light'>
                <span className='title is-5 has-text-black'>
                  Order placed by{' '}
                  <Link
                    className={styles.display_name}
                    to={`/customer/details/${order.customer._id}`}
                  >
                    {order.customer.name}
                  </Link>
                </span>
                <p class='title is-4 has-text-black'>{order.item}</p>
                <p class='title is-5 has-text-danger-dark'>
                  Delivery Option: {order.deliveryOption}
                </p>
                <p class='title is-5 has-text-danger-dark'>
                  Current Delivery Status: {order.status}
                </p>
                {order.type && (
                  <p class='title is-5 has-text-black'>
                    {order.type === 'Completed' && <i class='fas fa-check'></i>}{' '}
                    {order.type === 'New' && <i class='fas fa-times'></i>}{' '}
                    {order.type === 'Cancelled' && <i class='fas fa-plus'></i>}{' '}
                    {order.type} Order
                  </p>
                )}
                <p class='date-order'>
                  Order placed on: <Date date={order.date.substring(0, 10)} />
                </p>
              </article>
            </div>
          </div>
        </Fragment>
      );
    });
  };

  let filterOrders = allOrders.filter((order) => order.type === data);

  if (filterOrders.length === 0) {
    setAlert('None to display', 'danger');
    return <Redirect to='/restaurant/orders' />;
  }

  return (
    <Fragment>
      <div className='container'>
        <h1 className={styles.order_title}>
          {data} Orders placed by customers
        </h1>
        {displayOrders(filterOrders)}
        <br /> <br />
        <Link to='/restaurant/orders' className={styles.top_btn}>
          Back
        </Link>
      </div>
    </Fragment>
  );
};

OrdersNew.propTypes = {
  setAlert: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.resOrder,
});

export default connect(mapStateToProps, { setAlert })(OrdersNew);
