import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Requests from '../../http/axios-requests';
import { setSearchCategory, setSearchItems, setCategoryId } from '../../redux/actions/search';

const Categories = () => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = React.useState();

  const categoryRedirect = (name, id) => {
    dispatch(setSearchCategory(name));
    dispatch(setCategoryId(id));
    Requests.search(false, id).then((res) => {
      dispatch(setSearchItems(res.data));
    });
    setRedirect(<Redirect to="/search" />);
  };

  const { items, isLoaded } = useSelector(({ items }) => items);

  const validCategories = [];
  isLoaded &&
    items.forEach((item) => {
      if (item.for_category_footer) {
        validCategories.push(item);
      }
    });

  return (
    <section className="main-sections">
      <div className="main-sections-content">
        <div className="main-sections-first">
          <div className="categories_wrapper">
            <ul className="main-sections-first-ul">
              {isLoaded &&
                validCategories.map((item, index) => {
                  if (item.for_category_footer && index <= 6 && index >= 0) {
                    return (
                      <li
                        onClick={() => categoryRedirect(item.name_category, item.id)}
                        className="main-section-first-li main-li">
                        {isLoaded && item.for_category_footer}
                      </li>
                    );
                  }
                })}
              {redirect}
            </ul>
            <ul className="main-sections-second-ul">
              {isLoaded &&
                validCategories.map((item, index) => {
                  if (item.for_category_footer && index >= 7 && index <= 13) {
                    return (
                      <li
                        onClick={() => categoryRedirect(item.name_category, item.id)}
                        className="main-section-first-li main-li">
                        {isLoaded && item.for_category_footer}
                      </li>
                    );
                  }
                })}
            </ul>

            <ul className="main-sections-third-ul">
              {isLoaded &&
                validCategories.map((item, index) => {
                  if (item.for_category_footer && index >= 13 && index <= 20) {
                    return (
                      <li
                        onClick={() => categoryRedirect(item.name_category, item.id)}
                        className="main-section-first-li main-li">
                        {isLoaded && item.for_category_footer}
                      </li>
                    );
                  }
                })}
            </ul>
          </div>
          <div className="categories_wrapper">
            <ul className="main-sections-first-ul">
              {isLoaded &&
                validCategories.map((item, index) => {
                  if (item.for_category_footer && index >= 21 && index <= 28) {
                    return (
                      <li
                        onClick={() => categoryRedirect(item.name_category, item.id)}
                        className="main-section-first-li main-li">
                        {isLoaded && item.for_category_footer}
                      </li>
                    );
                  }
                })}
            </ul>
            <ul className="main-sections-second-ul">
              {isLoaded &&
                validCategories.map((item, index) => {
                  if (item.for_category_footer && index >= 29 && index <= 36) {
                    return (
                      <li
                        onClick={() => categoryRedirect(item.name_category, item.id)}
                        className="main-section-first-li main-li">
                        {isLoaded && item.for_category_footer}
                      </li>
                    );
                  }
                })}
            </ul>

            <ul className="main-sections-third-ul">
              {isLoaded &&
                validCategories.map((item, index) => {
                  if (item.for_category_footer && index >= 37 && index <= 44) {
                    return (
                      <li
                        onClick={() => categoryRedirect(item.name_category, item.id)}
                        className="main-section-first-li main-li">
                        {isLoaded && item.for_category_footer}
                      </li>
                    );
                  }
                })}
            </ul>
          </div>
        </div>
        <Link style={{ textDecoration: 'none' }} to="/catalog">
          <input type="button" value="Смотреть каталог" className="popular-button" />
        </Link>
      </div>
    </section>
  );
};

export default Categories;
