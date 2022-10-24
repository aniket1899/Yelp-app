const express = require('express');

const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');
const { auth } = require('../../middleware/auth');

const router = express.Router();

//  Get the User mongoose model
// const User = require('../../models/UserModel');
const kafka = require('../../kafka/client');

auth();

// @route  POST yelp/customer/login
// @desc   Customer Login route
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email.').isEmail().notEmpty(),
    check('password', 'Password is required.').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const { email, password } = req.body;

    // try {
    //   // 1. See if user exists
    //   const user = await User.findOne({ email });

    //   if (!user) {
    //     return res
    //       .status(400)
    //       .json({ errors: [{ msg: 'Invalid Credentials' }] });
    //   }

    //   // 2. Match user's password matches
    //   const isMatch = await bcrypt.compare(password, user.password);

    //   if (!isMatch) {
    //     return res
    //       .status(400)
    //       .json({ errors: [{ msg: 'Invalid Credentials' }] });
    //   }

    //   // 3. return jsonWebToken
    //   const payload = {
    //     user: {
    //       id: user.id,
    //       name: user.name,
    //       email: user.email,
    //       usertype: 'customer',
    //     },
    //   };

    //   jwt.sign(
    //     payload,
    //     config.get('jwtSecret'),
    //     { expiresIn: '10 hours' },
    //     (err, token) => {
    //       if (err) throw err;
    //       res.json({
    //         token,
    //         id: user.id,
    //         name: user.name,
    //         email: user.email,
    //       });
    //     },
    //   );
    // } catch (err) {
    //   console.log(err.message);
    //   res.send(500).send('Server Error');
    // }

    const payload = {
      topic: 'customerSignin',
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
