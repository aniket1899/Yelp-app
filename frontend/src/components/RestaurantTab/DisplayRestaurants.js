import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './restaurant.module.css';
import { BACKEND_URL } from '../../utils/constants';

const DisplayRestaurants = ({ restaurants, filters }) => {
  return (
    <Fragment>
      {restaurants.map((res) => {
        return (
          <Fragment>
            <div
              class='box border has-background-info-light'
              style={{ color: 'black' }}
            >
              <article class='media'>
                <div class='media-content'>
                  <div class='content'>
                    <div className='columns'>
                      <div className='column is-5'>
                        <img
                          className={styles.img}
                          src={`${BACKEND_URL}/restaurant/images/restaurant/${res.image}`}
                          alt='Restaurant_image'
                        />
                      </div>
                      <div className='column is-7'>
                        <p>
                          <strong>
                            <Link
                              className={styles.rest_name}
                              to={`/restaurant/details/${res._id}`}
                            >
                              {res.name}
                            </Link>
                          </strong>
                          <br />
                        </p>
                        <p>
                          <i
                            class='fas fa-check'
                            style={{ color: 'green' }}
                          ></i>{' '}
                          {res.deliveryMethod}
                        </p>
                        <p>
                          <i class='far fa-envelope-open'></i> {res.email}
                        </p>
                        <p>
                          <i class='fas fa-phone'></i> {res.phone}
                        </p>
                        <p>
                          <i class='fas fa-map-marker-alt'></i> {res.location}
                        </p>
                        <p>
                          <i class='fas fa-clock'></i> {res.timings}
                        </p>
                        <p>{res.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default DisplayRestaurants;
