import React, { Fragment } from 'react';
import Date from '../../../utils/Date';

const OrdersCard = ({ orders }) => {
  const displayOrders = () => {
    return orders.map((order) => {
      return (
        <div className='tile is-ancestor'>
          <div class='tile is-parent is-4'>
            <article class='tile is-child box has-background-link-light'>
              <p class='title is-4 has-text-black'>{order.item}</p>
              <p class='title is-5 has-text-danger-dark'>
                {order.restaurant.name} [{order.deliveryOption}]
              </p>
              <p class='subtitle has-text-black'>
                Current order status: {order.status}
              </p>
              <p class='date-order'>
                Order placed on: <Date date={order.date.substring(0, 10)} />
              </p>
            </article>
          </div>
        </div>
      );
    });
  };
  return <Fragment>{displayOrders()}</Fragment>;
};

export default OrdersCard;
