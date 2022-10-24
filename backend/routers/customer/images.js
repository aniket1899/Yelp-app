const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { checkAuth } = require('../../middleware/auth');

// const User = require('../../models/UserModel');
const kafka = require('../../kafka/client');

const customerstorage = multer.diskStorage({
  destination: `${path.join(__dirname, '../..')}/public/uploads/customers`,
  filename: (req, file, cb) => {
    cb(
      null,
      `customer${req.user.id}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const customeruploads = multer({
  storage: customerstorage,
  limits: { fileSize: 100000000 },
}).single('image');

// @route  POST yelp/images/customer
// @desc   Upload profile picture of the customer
// @access Private
router.post('/', checkAuth, async (req, res) => {
  customeruploads(req, res, async (err) => {
    if (!err) {
      // try {
      //   const customer = await User.findById(req.user.id);
      //   customer.image = req.file.filename;

      //   await customer.save();

      //   res.status(200).json(customer);
      // } catch (error) {
      //   console.log(error);
      //   res.status(500).send('Server Error');
      // }
      const payload = {
        topic: 'uploadCustomerImage',
        user: req.user,
        file: req.file,
      };
      kafka.make_request('images', payload, (error, results) => {
        console.log('in result');
        if (error) {
          console.log('Inside err');
          res.status(500).send('System Error, Try Again.');
        } else {
          if (results.status === 500) {
            return res.status(500).send('Server Error');
          }
          res.status(200).json(results.message);
        }
      });
    } else {
      console.log('Error!', err);
    }
  });
});

// @route  GET yelp/customer/images/:customer_image
// @desc   View the customer profile picture
// @access Public
router.get('/:customer_image', (req, res) => {
  console.log('backend: ', req.params.customer_image);
  const image = `${path.join(__dirname, '../..')}/public/uploads/customers/${
    req.params.customer_image
  }`;
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(
      `${path.join(
        __dirname,
        '../..',
      )}/public/uploads/customers/placeholderimg.jpg`,
    );
  }
});

module.exports = router;
