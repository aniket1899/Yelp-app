/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const { checkAuth } = require('../../middleware/resAuth');
const checkObjectId = require('../../middleware/checkParams');

// const Restaurant = require('../../models/RestaurantModel');
// const User = require('../../models/UserModel');

// Connect to kafka
const kafka = require('../../kafka/client');

// @route  GET yelp/restaurant/profile/all
// @desc   Get all restaurant profile details
// @access Public
router.get('/all', async (req, res) => {
  // try {
  //   const restaurants = await Restaurant.find().select('-password');
  //   if (!restaurants) {
  //     return res
  //       .status(400)
  //       .json({ errors: [{ msg: 'No restaurants found' }] });
  //   }
  //   res.status(200).json(restaurants);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }
  const payload = {
    topic: 'allRestaurants',
  };
  kafka.make_request('restaurantProfile', payload, (err, results) => {
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

// @route  GET yelp/restaurant/profile
// @desc   Get current restaurant profile details
// @access Private
router.get('/', checkAuth, async (req, res) => {
  // try {
  //   const restaurant = await Restaurant.findById(req.user.id).select(
  //     '-password',
  //   );
  //   if (!restaurant) {
  //     return res.status(400).json({ errors: [{ msg: 'No restaurant found' }] });
  //   }
  //   res.status(200).json(restaurant);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }
  const payload = {
    topic: 'getCurrentRestaurant',
    user: req.user,
  };
  kafka.make_request('restaurantProfile', payload, (err, results) => {
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

// @route  GET yelp/restaurant/profile/res_id
// @desc   Get restaurant profile details using restaurant id
// @access Public
router.get('/:res_id', checkObjectId('res_id'), async (req, res) => {
  // const resId = req.params.res_id;
  // try {
  //   const restaurant = await Restaurant.findById(resId).select('-password');
  //   if (!restaurant) {
  //     return res.status(400).json({ errors: [{ msg: 'No restaurant found' }] });
  //   }
  //   res.status(200).json(restaurant);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }
  const payload = {
    topic: 'getRestaurantById',
    resId: req.params.res_id,
  };
  kafka.make_request('restaurantProfile', payload, (err, results) => {
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

// @route  Update yelp/restaurant/profile/basic
// @desc   Update current restaurant basic details
// @access Private
router.post(
  '/basic',
  [
    checkAuth,
    [
      check('name', 'Restaurant name is required').notEmpty(),
      check('email', 'Restaurant email is required').isEmail().notEmpty(),
      check('location', 'Restaurant location is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const resId = req.user.id;
    // const {
    //   name,
    //   email,
    //   location,
    //   phone,
    //   description,
    //   timings,
    //   delivery,
    //   cuisine,
    // } = req.body;

    // try {
    //   const restaurant = await Restaurant.findById(resId).select('-password');
    //   restaurant.name = name;
    //   restaurant.email = email;
    //   restaurant.location = location;
    //   restaurant.phone = phone;
    //   restaurant.description = description;
    //   restaurant.timings = timings;
    //   restaurant.deliveryMethod = delivery;
    //   restaurant.cuisine = cuisine;
    //   // restaurant.deliveryMethod = delivery
    //   //   .split(',')
    //   //   .map((each) => each.trim());
    //   // restaurant.cuisine = cuisine.split(',').map((each) => each.trim());

    //   await restaurant.save();

    //   res.status(200).send('Restaurant details updated');
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).send('Server Error');
    // }

    const payload = {
      topic: 'updateBasics',
      body: req.body,
      user: req.user,
    };
    kafka.make_request('restaurantProfile', payload, (err, results) => {
      console.log('in result');
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

// @route  POST yelp/restaurant/profile/contact
// @desc   Update current restaurant contact information
// @access Private
router.post(
  '/contact',
  [
    checkAuth,
    [check('email', 'Restaurant email is required.').notEmpty().isEmail()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const resId = req.user.id;
    // const { email, phone } = req.body;

    // try {
    //   const restaurant = await Restaurant.findById(resId).select('-password');
    //   restaurant.email = email;
    //   restaurant.phone = phone;

    //   await restaurant.save();

    //   res.status(200).send('Restaurant details updated');
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).send('Server Error');
    // }

    const payload = {
      topic: 'updateContact',
      body: req.body,
      user: req.user,
    };
    kafka.make_request('restaurantProfile', payload, (err, results) => {
      console.log('in result');
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

// @route  POST yelp/restaurant/profile/menu
// @desc   Insert current restaurant menu item
// @access Private
router.post(
  '/menu',
  [
    checkAuth,
    [
      check('name', 'Dish name is required').notEmpty(),
      check('ingredients', 'Dish main ingredients are required').notEmpty(),
      check('category', 'Dish category is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const resId = req.user.id;
    // const { name, ingredients, price, description, category } = req.body;

    // try {
    //   const restaurant = await Restaurant.findById(resId).select('-password');
    //   const newItem = { name, ingredients, price, description, category };
    //   restaurant.menu.push(newItem);
    //   await restaurant.save();

    //   res.status(200).send('Menu item added.');
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).send('Server Error');
    // }

    const payload = {
      topic: 'addMenuItem',
      body: req.body,
      user: req.user,
    };
    kafka.make_request('restaurantProfile', payload, (err, results) => {
      console.log('in result', payload.topic);
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

// @route  PUT yelp/restaurant/profile/menu/item_id
// @desc   Update current restaurant menu item
// @access Private
router.put(
  '/menu/:item_id',
  [
    checkAuth,
    checkObjectId('item_id'),
    [
      check('name', 'Dish name is required').notEmpty(),
      check('ingredients', 'Dish main ingredients are required').notEmpty(),
      check('category', 'Dish category is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const itemId = req.params.item_id;
    // const resId = req.user.id;

    // const { name, ingredients, price, description, category } = req.body;

    // try {
    //   const restaurant = await Restaurant.findById(resId).select('-password');

    //   restaurant.menu.forEach((item) => {
    //     if (item._id.toString() === itemId) {
    //       item.name = name;
    //       item.ingredients = ingredients;
    //       item.price = price;
    //       item.description = description;
    //       item.category = category;
    //     }
    //   });

    //   await restaurant.save();

    //   res.status(200).json(restaurant);
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).send('Server Error');
    // }

    const payload = {
      topic: 'updateMenuItem',
      body: req.body,
      itemId: req.params.item_id,
      resId: req.user.id,
    };
    kafka.make_request('restaurantProfile', payload, (err, results) => {
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

// @route  GET yelp/reviews/restaurant/profile/reviews/all/:resId
// @desc   Get all reviews for a restaurant
// @access Private
router.get('/reviews/all/:res_id', async (req, res) => {
  // const resId = req.params.res_id;
  // try {
  //   const customers = await User.find({ 'reviews.restaurant': resId }).select(
  //     'name reviews',
  //   );
  //   if (customers.length === 0) {
  //     return res.status(400).json({ errors: [{ msg: 'No reviews added' }] });
  //   }
  //   res.status(200).json(customers);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }

  const payload = {
    topic: 'getRestaurantReviews',
    resId: req.params.res_id,
  };
  kafka.make_request('restaurantProfile', payload, (err, results) => {
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
      res.status(200).send(results.message);
    }
  });
});

module.exports = router;
