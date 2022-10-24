/* eslint-disable operator-linebreak */
const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/auth');

// const User = require('../../models/UserModel');
const kafka = require('../../kafka/client');

// @route  GET yelp/customer/users/:data
// @desc   Get users based on search data
// @access Private
router.get('/:data', checkAuth, async (req, res) => {
  // const { data } = req.params;
  // const customerId = req.user.id;
  // try {
  //   const users = await User.find({
  //     $or: [{ name: data }, { 'about.nickname': data }, { 'about.city': data }],
  //     _id: { $ne: customerId },
  //   }).select('-password');

  //   if (!users) {
  //     return res
  //       .status(400)
  //       .json({ errors: [{ msg: 'No users found with that name/nickname' }] });
  //   }

  //   res.status(200).json(users);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }

  const payload = {
    topic: 'searchUser',
    user: req.user,
    params: req.params,
  };
  kafka.make_request('users', payload, (err, results) => {
    console.log('in result');
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

// @route  POST yelp/customer/users/:id
// @desc   Follow an user
// @access Private
router.post('/:id', checkAuth, async (req, res) => {
  // const { id } = req.params;
  // const customerId = req.user.id;
  // try {
  //   const customer = await User.findById(customerId);

  //   if (customer.following.includes(id)) {
  //     return res
  //       .status(400)
  //       .json({ errors: [{ msg: 'You are already following the user' }] });
  //   }

  //   customer.following.push(id);

  //   await customer.save();
  //   res.status(200).send('Successfully added to followers');
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }

  const payload = {
    topic: 'followUser',
    user: req.user,
    params: req.params,
  };
  kafka.make_request('users', payload, (err, results) => {
    console.log('in result');
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

// @route  GET yelp/customer/users/following/all
// @desc   Get all following users for current customer
// @access Private
router.get('/following/all', checkAuth, async (req, res) => {
  // const customerId = req.user.id;
  // try {
  //   const data = await User.findById(customerId).select('following');
  //   console.log(data);
  //   const users = await User.find({ _id: { $in: data.following } });
  //   if (!users) {
  //     return res
  //       .status(400)
  //       .json({ errors: [{ msg: 'You are not following anyone.' }] });
  //   }

  //   res.status(200).json(users);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }
  const payload = {
    topic: 'followingList',
    user: req.user,
  };
  kafka.make_request('users', payload, (err, results) => {
    console.log('in result');
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
module.exports = router;
