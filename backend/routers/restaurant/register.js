/* eslint-disable object-curly-newline */
const express = require('express');

const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');
const { auth } = require('../../middleware/resAuth');
const kafka = require('../../kafka/client');

const router = express.Router();

//  Get the User mongoose model
// const Restaurant = require('../../models/RestaurantModel');

auth();

// @route  POST yelp/restaurant/register
// @desc   Restaurant SIGNUP route
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required.').notEmpty(),
    check('email', 'Please include a valid email.').isEmail().notEmpty(),
    check('password', 'Password must be 8 characters long.').isLength({
      min: 4,
    }),
    check('location', 'Please include restaurant location.').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const { name, email, password, location } = req.body;

    // try {
    //   //  1. Query to check if customer exists
    //   let restaurant = await Restaurant.findOne({ email });

    //   if (restaurant) {
    //     return res
    //       .status(400)
    //       .json({ errors: [{ msg: 'restaurant already exits' }] });
    //   }

    //   //  3. Create restaurant
    //   restaurant = new Restaurant({
    //     name,
    //     email,
    //     password,
    //     location,
    //   });

    //   //  2. If restaurant does not exist, hash the password
    //   const salt = await bcrypt.genSalt(10);
    //   restaurant.password = await bcrypt.hash(password, salt);

    //   //  4. save to database
    //   await restaurant.save();

    //   //  5. Pass the jsonwebtoken for that restaurant
    //   const payload = {
    //     user: {
    //       id: restaurant.id,
    //       name: restaurant.name,
    //       email: restaurant.email,
    //       usertype: 'restaurant',
    //     },
    //   };

    //   jwt.sign(
    //     payload,
    //     config.get('jwtSecret'),
    //     { expiresIn: 6000000 },
    //     (err, token) => {
    //       if (err) throw err;
    //       res.json({
    //         token,
    //         id: restaurant.id,
    //         name: restaurant.name,
    //         email: restaurant.email,
    //       });
    //     },
    //   );
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).send('Server Error');
    // }

    const payload = {
      topic: 'restaurantSignup',
      body: req.body,
    };

    kafka.make_request('authorization', payload, (err, results) => {
      console.log('in result');
      console.log('Results: ', results);
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
  },
);

module.exports = router;
