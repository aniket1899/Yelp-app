import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../profile-forms/form.module.css';
import spinner from '../../layout/Spinner';
import { getAllOrders } from '../../../actions/cusOrder';
import Pagination from 'react-js-pagination';
import OrdersCard from './OrdersCard';

const Orders = ({ getAllOrders, orders: { allorders, loading } }) => {
  const [sortType, setsortType] = useState('Acsending');
  const [orders, setorders] = useState([]);

  const [activePage, setactivePage] = useState(1);

  // Logic for displaying current orders
  const indexOfLast = activePage * 2;
  const indexOfFirst = indexOfLast - 2;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    if (!loading) {
      setorders(allorders.reverse());
    }
  }, [loading, sortType]);

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <div className='container'>
        <h1 className={styles.form_title}>Orders Placed By You</h1>
        <Link
          to={`/customer/orders/filter/Received`}
          className={styles.top_btn}
        >
          Received
        </Link>
        <Link to='/customer/orders/filter/Preparing' className={styles.top_btn}>
          Preparing
        </Link>
        <Link to='/customer/orders/filter/Delivery' className={styles.top_btn}>
          Delivery
        </Link>
        <Link to='/customer/orders/filter/Pickup' className={styles.top_btn}>
          Pickup
        </Link>
        <br />
        <hr />
        <select
          className='select-css'
          name='orders'
          onChange={(e) => setsortType(e.target.value)}
        >
          <option>Sort by...</option>
          <option>Acsending</option>
          <option>Descending</option>
        </select>
        <br />
        <h1 className={styles.title}>All Orders</h1>
        <OrdersCard orders={currentOrders} />
        <div className='page-width'>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={2}
            totalItemsCount={orders.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

Orders.propTypes = {
  getAllOrders: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.cusOrder,
});

export default connect(mapStateToProps, { getAllOrders })(Orders);
