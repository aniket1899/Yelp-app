import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllRestaurantOrders,
  updateOrderStatus,
  cancelOrder,
} from '../../../actions/resOrder';
import styles from '../Dashboard-forms/form.module.css';
import Date from '../../../utils/Date';
import Pagination from 'react-js-pagination';

const Orders = ({
  order: { allOrders, loading },
  getAllRestaurantOrders,
  updateOrderStatus,
  cancelOrder,
}) => {
  const [orderData, setorderData] = useState({
    status: '',
    id: '',
  });

  const [activePage, setactivePage] = useState(1);

  useEffect(() => {
    getAllRestaurantOrders();
  }, [allOrders]);

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
  };

  const handleStatusChange = (e) => {
    e.preventDefault();
    updateOrderStatus(orderData.id, orderData.status);
  };

  const handleCancelOrder = (e, orderId) => {
    e.preventDefault();
    cancelOrder(orderId);
  };

  const displayOrders = () => {
    // // Logic for displaying current orders
    const indexOfLast = activePage * 3;
    const indexOfFirst = indexOfLast - 3;
    const currentOrders = allOrders.slice(indexOfFirst, indexOfLast);
    return currentOrders.map((order) => {
      return (
        <div>
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
                    {order.type === 'New' && <i class='fas fa-plus'></i>}{' '}
                    {order.type === 'Cancelled' && <i class='fas fa-times'></i>}{' '}
                    {order.type} Order
                  </p>
                )}
                <Fragment>
                  <select
                    className='select-css select-css-width select-orders'
                    name='status'
                    onChange={(e) =>
                      setorderData({
                        status: e.target.value,
                        id: order._id,
                      })
                    }
                  >
                    <option>Select Status</option>
                    <option value='Received'>Order Recieved</option>
                    <option value='Preparing'>Preparing</option>
                    {order.deliveryOption === 'Pickup' ? (
                      <Fragment>
                        {' '}
                        <option value='Pick up ready'>Pick Up Ready</option>
                        <option value='Pickedup'>Picked Up</option>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <option value='On the way'>On The Way</option>
                        <option value='Delivered'>Delivered</option>
                      </Fragment>
                    )}
                  </select>
                  <br />
                  <button
                    className={styles.submit_btn}
                    onClick={(e) => handleStatusChange(e)}
                  >
                    Update Status
                  </button>
                  {'  '}
                  <button
                    className={styles.submit_btn}
                    onClick={(e) => handleCancelOrder(e, order._id)}
                  >
                    Cancel Order
                  </button>
                  <p class='date-order'>
                    Order placed on: <Date date={order.date.substring(0, 10)} />
                  </p>
                </Fragment>
              </article>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div className='container'>
        <h1 className={styles.order_title}>Orders placed by customers</h1>
        <Link to='/restaurant/orders/New' className={styles.top_btn}>
          New Orders
        </Link>
        <Link to='/restaurant/orders/Delivered' className={styles.top_btn}>
          Delivered Orders
        </Link>
        <Link to='/restaurant/orders/Cancelled' className={styles.top_btn}>
          Cancelled Orders
        </Link>
        {displayOrders()}
        <br />
        <br />
        <div className='page-width'>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={3}
            totalItemsCount={allOrders.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

Orders.propTypes = {
  getAllRestaurantOrders: PropTypes.func.isRequired,
  updateOrderStatus: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.resOrder,
});

export default connect(mapStateToProps, {
  getAllRestaurantOrders,
  updateOrderStatus,
  cancelOrder,
})(Orders);
