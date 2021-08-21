import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../../css/CatalogComponent.css';
import { setSearchCategory, setCategoryId, setSearchItems } from '../../redux/actions/search';
import Requests from '../../http/axios-requests';

const CatalogComponent = ({ chapterId }) => {
  const dispatch = useDispatch();
  const { isLoaded, items } = useSelector(({ items }) => items);
  const [redirect, setRedirect] = React.useState();
  let chapterText = '';

  //выделяем разделы
  const chapters = {};
  isLoaded &&
    items.length > 2 &&
    items.map((item, index) => {
      if (!chapters.hasOwnProperty(item.chapter_id.name_chapter)) {
        chapters[item.chapter_id.name_chapter] = [
          item.chapter_id.id,
          item.chapter_id.chapter_image,
          item.chapter_id.chapter_logo,
          item.chapter_id.chapter_description,
          item.chapter_id.name_chapter,
        ];
      }
    });

  //выделяем категории
  const categories = {};
  isLoaded &&
    items.length > 2 &&
    items.map((item, index) => {
      if (item.chapter_id.id === Number(chapterId)) {
        categories[item.name_category] = [item.id];
      }
    });

  //выделяем текст каталога
  [].concat.apply(Object.entries(chapters)).map((chapter, index) => {
    if (chapterId === chapter[1][0]) {
      chapterText = chapter[1][3];
    }
    return;
  });

  const categoryRedirect = (name, id) => {
    dispatch(setSearchCategory(name));
    dispatch(setCategoryId(id));
    Requests.search(false, id).then((res) => {
      dispatch(setSearchItems(res.data));
    });
    setRedirect(<Redirect to="/search" />);
  };
  return (
    <div className="CatalogComponent">
      {/* ШАПКА С ФОТО */}
      <div className="CatalogComponent_shapka">
        <p className="CatalogComponent_shapka_p">
          {[].concat.apply(Object.entries(chapters)).map((chapter, index) => {
            if (chapterId === chapter[1][0]) {
              return chapter[1][4];
            }
          })}{' '}
          {redirect}в аренду
        </p>
        <img
          src={`https://razdelisdrugim.by${[].concat
            .apply(Object.entries(chapters))
            .map((chapter, index) => {
              if (chapterId === chapter[1][0]) {
                return chapter[1][1];
              }
            })}`.replace(/,/g, '')}
          alt=""
          className="CatalogComponent_shapka_img"
        />
      </div>
      {/* СПИСОК КАТЕГОРИЙ В ЦЕНТРЕ*/}
      <div className="CatalogComponent_list">
        <div className="CatalogComponent_list_left">
          {isLoaded &&
            [].concat.apply(Object.entries(categories)).map((category, index) => {
              if (index % 2 === 0) {
                return (
                  <p
                    onClick={() => categoryRedirect(category[0], category[1][0])}
                    style={{ cursor: 'pointer' }}
                    key={index}
                    value={category[1]}>
                    {category[0]}
                  </p>
                );
              }
            })}
        </div>

        <div className="CatalogComponent_list_right">
          {isLoaded &&
            [].concat.apply(Object.entries(categories)).map((category, index) => {
              if (index % 2 === 1) {
                return (
                  <p
                    onClick={() => categoryRedirect(category[0], category[1][0])}
                    style={{ cursor: 'pointer' }}
                    key={index}
                    value={category[1]}>
                    {category[0]}
                  </p>
                );
              }
            })}
        </div>
      </div>

      {/* ТЕКСТ С ИНФОЙ СНИЗУ*/}
      <div className="CatalogComponent_informations">
        <p dangerouslySetInnerHTML={{ __html: chapterText && chapterText }} />
      </div>
    </div>
  );
};

export default CatalogComponent;
