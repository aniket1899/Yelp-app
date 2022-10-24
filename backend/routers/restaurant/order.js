const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../middleware/resAuth');

// const User = require('../../models/UserModel');
// const Order = require('../../models/OrdersModel');
const kafka = require('../../kafka/client');

// @route  Get yelp/restaurant/orders
// @desc   restaurant get all orders route
// @access Private
router.get('/', checkAuth, async (req, res) => {
  // const resId = req.user.id;
  // try {
  //   const orders = await Order.find({ restaurant: resId })
  //     .sort({ date: -1 })
  //     .populate({
  //       path: 'customer',
  //       select: 'name',
  //       model: User,
  //     });
  //   if (!orders) {
  //     return res
  //       .status(400)
  //       .json({ errors: [{ msg: 'No orders to display' }] });
  //   }
  //   res.status(200).json(orders);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }

  const payload = {
    topic: 'getAllOrders',
    user: req.user,
  };
  kafka.make_request('restaurantOrder', payload, (err, results) => {
    if (err) {
      console.log('Inside err');
      res.status(500).send('System Error, Try Again.');
    } else {
      if (results.status === 400) {
        return res.status(400).json({ errors: [{ msg: results.message }] });
      }
      if (results.status === 500) {
        return res.status(500).send('Server Error');
      }
      res.status(200).json(results.message);
    }
  });
});

// @route  Update yelp/restaurant/orders/status/1
// @desc   restaurant update to the status route
// @access Private
router.post(
  '/status/:orderId',
  [checkAuth, [check('status', 'Order status is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const { orderId } = req.params;
    // const { status } = req.body;
    // try {
    //   let orderType = '';
    //   if (status === 'Pickedup' || status === 'Delivered') {
    //     orderType = 'Completed';
    //   }
    //   const order = await Order.findById(orderId);
    //   order.status = status;
    //   order.type = orderType;
    //   await order.save();

    //   res.status(200).send('Status updated');
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).send('Server Error');
    // }

    const payload = {
      topic: 'updateOrderStatus',
      orderId: req.params.orderId,
      body: req.body,
    };
    kafka.make_request('restaurantOrder', payload, (err, results) => {
      if (err) {
        console.log('Inside err');
        res.status(500).send('System Error, Try Again.');
      } else {
        if (results.status === 500) {
          return res.status(500).send('Server Error');
        }
        res.status(200).send(results.message);
      }
    });
  },
);

// @route  Get yelp/restaurant/orders/cancelorder
// @desc   restaurant update to recieved route
// @access Private
router.post('/cancelorder/:order_id', checkAuth, async (req, res) => {
  // const orderId = req.params.order_id;
  // try {
  //   const order = await Order.findById(orderId);
  //   order.status = 'Cancelled';
  //   order.type = 'Cancelled';
  //   await order.save();

  //   res.status(200).send('Order has been cancelled');
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }
  const payload = {
    topic: 'cancelOrder',
    orderId: req.params.order_id,
  };
  kafka.make_request('restaurantOrder', payload, (err, results) => {
    if (err) {
      console.log('Inside err');
      res.status(500).send('System Error, Try Again.');
    } else {
      if (results.status === 500) {
        return res.status(500).send('Server Error');
      }
      res.status(200).send(results.message);
    }
  });
});

module.exports = router;
