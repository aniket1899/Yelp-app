import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard-forms/form.module.css';
import ImageCard from './ImageCard';
import Pagination from 'react-js-pagination';

const Menu = ({ location }) => {
  const menu = location.state.menu;

  const [activePage, setactivePage] = useState(1);

  // Logic for displaying current menu items
  const indexOfLast = activePage * 3;
  const indexOfFirst = indexOfLast - 3;
  const currentMenu = menu.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
  };

  const displayCategory = (type) => {
    const itemType = currentMenu.filter((each) => each.category === type);
    if (itemType.length === 0) {
      return '';
    }
    return itemType.map((item) => {
      // console.log('here: ', item.images[0]);
      return (
        <Fragment>
          <h2 className={styles['menu-subheading']}>{type}</h2>
          <div class='tile is-ancestor'>
            <div class='tile is-parent is-7'>
              <article class='tile is-child box'>
                <div className='columns'>
                  {item.images && item.images.length > 0 && (
                    <div className='column is-3'>
                      <ImageCard images={item.images} />
                    </div>
                  )}
                  <div className='column is-9'>
                    <p class={styles['item-title']}>{item.name}</p>
                    <p class={styles['item-ingredients']}>
                      {item.ingredients} <br /> $ {item.price}
                    </p>
                    <p class={styles['item-description']}>{item.description}</p>
                  </div>
                </div>
                {localStorage.usertype === 'restaurant' && (
                  <Link
                    className={styles['update-btn']}
                    to={{
                      pathname: '/restaurant/item/update',
                      state: { itemId: item._id },
                    }}
                  >
                    Update item
                  </Link>
                )}
                {item.images.length > 1 && (
                  <Link
                    className={styles['update-btn']}
                    style={{ marginLeft: '2%' }}
                    to={{
                      pathname: '/restaurant/item/images',
                      state: { images: item.images },
                    }}
                  >
                    View Images
                  </Link>
                )}
              </article>
            </div>
          </div>
        </Fragment>
      );
    });
  };
  return (
    <div>
      <h1 className={styles.form_title}>Menu</h1>
      {displayCategory('Appetizer')}
      {displayCategory('Salads')}
      {displayCategory('Main Course')}
      {displayCategory('Beverages')}
      {displayCategory('Desserts')}
      <hr />
      <div className='page-width'>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={3}
          totalItemsCount={menu.length}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Menu;
