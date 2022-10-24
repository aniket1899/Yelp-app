/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { checkAuth } = require('../../middleware/resAuth');

const Restaurant = require('../../models/RestaurantModel');
const kafka = require('../../kafka/client');

const resstorage = multer.diskStorage({
  destination: `${path.join(__dirname, '../..')}/public/uploads/restaurants`,
  filename: (req, file, cb) => {
    cb(
      null,
      `restaurant${req.user.id}-${Date.now()}${path.extname(
        file.originalname,
      )}`,
    );
  },
});

const resuploads = multer({
  storage: resstorage,
  limits: { fileSize: 100000000 },
}).single('image');

// @route  POST yelp/images/restaurant
// @desc   Upload profile picture of the restaurant
// @access Private
router.post('/restaurant', checkAuth, async (req, res) => {
  resuploads(req, res, async (err) => {
    if (!err) {
      // try {
      //   const restaurant = await Restaurant.findById(req.user.id);
      //   restaurant.image = req.file.filename;

      //   await restaurant.save();

      //   res.status(200).json(restaurant);
      // } catch (error) {
      //   console.log(error);
      //   res.status(500).send('Server Error');
      // }
      const payload = {
        topic: 'uploadRestaurantImage',
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

// @route  GET yelp/images/restaurant/:restaurant_image
// @desc   View the restaurant profile picture
// @access Public
router.get('/restaurant/:restaurant_image', (req, res) => {
  const image = `${path.join(__dirname, '../..')}/public/uploads/restaurants/${
    req.params.restaurant_image
  }`;
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(
      `${path.join(
        __dirname,
        '../..',
      )}/public/uploads/restaurants/placeholderimg.jpg`,
    );
  }
});

const dishstorage = multer.diskStorage({
  destination: `${path.join(__dirname, '../..')}/public/uploads/dishes`,
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.user.id}-dish${req.params.dish_id}-${Date.now()}${path.extname(
        file.originalname,
      )}`,
    );
  },
});

const dishuploads = multer({
  storage: dishstorage,
  limits: { fileSize: 100000000 },
}).single('image');

// @route  POST yelp/images/dish/:dish_id
// @desc   Upload pictures of the dish
// @access Private
router.post('/dish/:dish_id', checkAuth, async (req, res) => {
  dishuploads(req, res, async (err) => {
    if (!err) {
      try {
        const restaurant = await Restaurant.findById(req.user.id);
        restaurant.menu.forEach((item) => {
          if (item._id.toString() === req.params.dish_id) {
            item.images.push(req.file.filename);
          }
        });
        await restaurant.save();

        res.status(200).json(restaurant);
      } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
      }

      // const payload = {
      //   topic: 'uploadDishImage',
      //   user: req.user,
      //   file: req.file,
      //   params: req.params,
      // };
      // kafka.make_request('images', payload, (error, results) => {
      //   console.log('in result');
      //   if (error) {
      //     console.log('Inside err');
      //     res.status(500).send('System Error, Try Again.');
      //   } else {
      //     if (results.status === 500) {
      //       return res.status(500).send('Server Error');
      //     }
      //     res.status(200).json(results.message);
      //   }
      // });
    } else {
      console.log('Error!', err);
    }
  });
});

// @route  GET yelp/images/dish/:dish_image
// @desc   View the restaurant profile picture
// @access Public
router.get('/dish/:dish_image', (req, res) => {
  const image = `${path.join(__dirname, '../..')}/public/uploads/dishes/${
    req.params.dish_image
  }`;
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(
      `${path.join(
        __dirname,
        '../..',
      )}/public/uploads/dishes/placeholderimg.png`,
    );
  }
});

// @route  GET yelp/restaurant/image/all/:res_id
// @desc   View the restaurant dish images
// @access Public
router.get('/all/:res_id', async (req, res) => {
  const resId = req.params.res_id;
  try {
    const results = await Restaurant.findById(resId).select('menu.images');
    if (!results) {
      return res.status(400).json({ errors: [{ msg: 'No images found' }] });
    }
    let images = [];
    results.menu.forEach((each) => {
      images = [...images, ...each.images];
    });

    res.status(200).json(images);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }

  // const payload = {
  //   topic: 'getAllImages',
  //   params: req.params,
  // };
  // kafka.make_request('images', payload, (err, results) => {
  //   if (err) {
  //     console.log('Inside err');
  //     res.status(500).send('System Error, Try Again.');
  //   } else {
  //     if (results.status === 400) {
  //       return res.status(400).json({ errors: [{ msg: results.message }] });
  //     }
  //     if (results.status === 500) {
  //       return res.status(500).send('Server Error');
  //     }
  //     console.log(results.message);
  //     res.status(200).json(results.message);
  //   }
  // });
});

module.exports = router;
