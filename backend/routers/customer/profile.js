const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../middleware/auth');

// const User = require('../../models/UserModel');
const kafka = require('../../kafka/client');

// @route  GET yelp/customer/profile/all
// @desc   Get all customer profile details
// @access Public
router.get('/all', checkAuth, async (req, res) => {
  // const customerId = req.user.id;
  // try {
  //   const customers = await User.find({ _id: { $ne: customerId } });
  //   if (!customers) {
  //     return res.status(400).json({ errors: [{ msg: 'User not found' }] });
  //   }
  //   res.status(200).json(customers);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }

  const payload = {
    topic: 'allUsers',
    user: req.user,
  };
  kafka.make_request('customerProfile', payload, (err, results) => {
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

// @route  GET yelp/customer/profile
// @desc   Get current customer profile details
// @access Private
router.get('/', checkAuth, async (req, res) => {
  // try {
  //   const customer = await User.findById(req.user.id).select('-password');

  //   if (!customer) {
  //     return res.status(400).json({ errors: [{ msg: 'User not found' }] });
  //   }

  //   res.status(200).json(customer);
  // } catch (err) {
  //   console.log(err.message);
  //   res.status(500).send('Server Error');
  // }

  const payload = {
    topic: 'currentUserProfile',
    user: req.user,
  };
  kafka.make_request('customerProfile', payload, (err, results) => {
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

// @route  GET yelp/customer/profile/customer_id
// @desc   Get customer profile details using customer id
// @access Public
router.get('/display/:customer_id', async (req, res) => {
  // const customerId = req.params.customer_id;

  // try {
  //   const customer = await User.findById(customerId).select('-password');

  //   if (!customer) {
  //     return res.status(400).json({ errors: [{ msg: 'User not found' }] });
  //   }

  //   res.status(200).json(customer);
  // } catch (err) {
  //   console.log(err.message);
  //   res.status(500).send('Server Error');
  // }

  const payload = {
    topic: 'userProfileById',
    customerId: req.params.customer_id,
  };
  kafka.make_request('customerProfile', payload, (err, results) => {
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

// @route  Update yelp/customer/profile/basic
// @desc   Update current user basic details
// @access Private
router.post(
  '/basic',
  [checkAuth, [check('name', 'Customer name is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const customerId = req.user.id;
    // const {
    //   name,
    //   dateOfBirth,
    //   city,
    //   state,
    //   country,
    //   nickName,
    //   headline,
    // } = req.body;

    // try {
    //   const customer = await User.findById(customerId).select('-password');
    //   customer.name = name;
    //   customer.about.dob = dateOfBirth;
    //   customer.about.city = city;
    //   customer.about.state = state;
    //   customer.about.country = country;
    //   customer.about.nickname = nickName;
    //   customer.about.headline = headline;

    //   await customer.save();

    //   res.json(customer);
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).send('Server Error');
    // }

    const payload = {
      topic: 'updateCustomerBasics',
      body: req.body,
      user: req.user,
    };
    kafka.make_request('customerProfile', payload, (err, results) => {
      console.log('in result');
      if (err) {
        console.log('Inside err');
        res.status(500).send('System Error, Try Again.');
      } else {
        if (results.status === 500) {
          return res.status(500).send('Server Error');
        }
        res.status(200).json(results.message);
      }
    });
  },
);

// @route  Update yelp/customer/profile/about
// @desc   Update current user about details
// @access Private
router.post('/about', checkAuth, async (req, res) => {
  // const customerId = req.user.id;
  // const {
  //   thingsILove,
  //   findMeIn,
  //   myBlog,
  //   whenNotYelping,
  //   whyReadMyReviews,
  //   recentDiscovery,
  // } = req.body;

  // try {
  //   const customer = await User.findById(customerId).select('-password');
  //   customer.about.thingsILove = thingsILove;
  //   customer.about.findMeIn = findMeIn;
  //   customer.about.myBlog = myBlog;
  //   customer.about.notYelping = whenNotYelping;
  //   customer.about.whyMyReviews = whyReadMyReviews;
  //   customer.about.discovery = recentDiscovery;

  //   await customer.save();

  //   res.json(customer);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }

  const payload = {
    topic: 'updateAbout',
    body: req.body,
    user: req.user,
  };
  kafka.make_request('customerProfile', payload, (err, results) => {
    console.log('in result');
    if (err) {
      console.log('Inside err');
      res.status(500).send('System Error, Try Again.');
    } else {
      if (results.status === 500) {
        return res.status(500).send('Server Error');
      }
      res.status(200).json(results.message);
    }
  });
});

// @route  Update yelp/customer/profile/contact
// @desc   Update current user contact details
// @access Private
router.post(
  '/contact',
  [checkAuth, check('email', 'Email is required').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const customerId = req.user.id;
    // const { email, phone } = req.body;

    // try {
    //   const customer = await User.findById(customerId).select('-password');
    //   customer.email = email;
    //   customer.phone = phone;

    //   await customer.save();

    //   res.json(customer);
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).send('Server Error');
    // }

    const payload = {
      topic: 'updateContact',
      body: req.body,
      user: req.user,
    };
    kafka.make_request('customerProfile', payload, (err, results) => {
      console.log('in result');
      if (err) {
        console.log('Inside err');
        res.status(500).send('System Error, Try Again.');
      } else {
        if (results.status === 500) {
          return res.status(500).send('Server Error');
        }
        res.status(200).json(results.message);
      }
    });
  },
);

// @route  Update yelp/customer/profile/reviews/:res_id
// @desc   Add a review to a restaurant
// @access Private
router.post(
  '/reviews/:res_id',
  [
    checkAuth,
    [
      check('rating', 'Rating is required').notEmpty(),
      check('text', 'Review is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const customerId = req.user.id;
    // const restaurant = req.params.res_id;
    // const { rating, text } = req.body;

    // try {
    //   const customer = await User.findById(customerId).select('-password');
    //   const newReview = {
    //     restaurant,
    //     rating,
    //     text,
    //   };

    //   customer.reviews.unshift(newReview);

    //   await customer.save();

    //   res.json(customer);
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).send('Server Error');
    // }

    const payload = {
      topic: 'addReview',
      customerId: req.user.id,
      restaurant: req.params.res_id,
      body: req.body,
    };
    kafka.make_request('customerProfile', payload, (err, results) => {
      console.log('in result');
      if (err) {
        console.log('Inside err');
        res.status(500).send('System Error, Try Again.');
      } else {
        if (results.status === 500) {
          return res.status(500).send('Server Error');
        }
        res.status(200).json(results.message);
      }
    });
  },
);

// @route  Update yelp/customer/profile/events/:event_id
// @desc   Register for an event
// @access Private
router.post('/events/:event_id', checkAuth, async (req, res) => {
  // const customerId = req.user.id;
  // const eventId = req.params.event_id;

  // try {
  //   const customer = await User.findById(customerId).select('-password');
  //   if (
  //     customer.events.filter((event) => event.toString() === eventId).length > 0
  //   ) {
  //     return res
  //       .status(400)
  //       .json({ errors: [{ msg: 'Event already registered' }] });
  //   }

  //   const newEvent = { eventId };

  //   customer.events.unshift(newEvent);

  //   await customer.save();

  //   res.json(customer);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }

  const payload = {
    topic: 'registerEvent',
    customerId: req.user.id,
    eventId: req.params.event_id,
  };
  kafka.make_request('customerProfile', payload, (err, results) => {
    console.log('in result');
    if (err) {
      console.log('Inside err');
      res.status(500).send('System Error, Try Again.');
    } else {
      if (results.status === 500) {
        return res.status(500).send('Server Error');
      }
      if (results.status === 400) {
        return res.status(400).send(results.message);
      }
      res.status(200).json(results.message);
    }
  });
});

module.exports = router;
