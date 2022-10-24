import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './form.module.css';
import { addDish } from '../../../actions/dashboard';

const AddDish = ({ addDish, history }) => {
  const [formData, setformData] = useState({
    name: '',
    ingredients: '',
    price: '',
    description: '',
    category: '',
  });

  const { name, ingredients, price, description, category } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addDish(formData, history);
  };

  return (
    <Fragment>
      <div className='container profile-title'>
        {' '}
        <h1 className={styles.form_title}>Add a Dish</h1>
        <p className='lead'>
          <i class='fas fa-utensils'></i> List your amazing dishes here...
        </p>
        <form className={styles.yform} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Dish Name</label>
            <br />
            <small className={styles.form_text}>This field is required.</small>
            <input
              className={styles.my_text}
              type='text'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Main Ingredients</label>
            <br />
            <small className={styles.form_text}>This field is required.</small>
            <input
              className={styles.my_text}
              type='text'
              name='ingredients'
              value={ingredients}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Price</label>
            <br />
            <small className={styles.form_text}>12.50, 32.54</small>
            <input
              className={styles.my_text}
              type='text'
              name='price'
              value={price}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Description</label>
            <br />
            <small className={styles.form_text}>
              We sell continental, Italian...
            </small>
            {/* <input
              className={styles.my_text}
              type='text'
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
            /> */}
            <textarea
              className={styles.my_headline}
              maxlength='1024'
              size='30'
              rows='6'
              type='text'
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Category</label>
            <br />
            <small className={styles.form_text}>
              Appetizer, Salads, Main Course , Desserts, Beverages
            </small>
            <small className={styles.form_text}>This field is required.</small>
          </div>
          <select
            className='select-css'
            name='category'
            onChange={(e) => onChange(e)}
            required
          >
            <option>Select option</option>
            <option value='Appetizer'>Appetizer</option>
            <option value='Salads'>Salads</option>
            <option value='Main Course'>Main Course</option>
            <option value='Desserts'>Desserts</option>
            <option value='Beverages'>Beverages</option>
          </select>
          <br />
          <br />
          <input type='submit' value='Add Dish' className={styles.btn} />
          <div className={styles.btn_grey}>
            <Link to='/restaurant/profile'>Cancel</Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

AddDish.propTypes = {
  addDish: PropTypes.func.isRequired,
  //   uploadDishImage: PropTypes.func.isRequired,
};

export default connect(null, {
  addDish,
})(withRouter(AddDish));
