import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Requests from '../../http/axios-requests';
import { reloadData } from '../../redux/actions/userData';
import Shape from '../../img/Shape.png';

const AddressDeleteSubmit = ({ deleteId, setModalActiveSubmit, modalActiveSubmit }) => {
  const dispatch = useDispatch();
  const { reload } = useSelector(({ userData }) => userData);

  //обработчики кнопок

  const noHandler = () => {
    setModalActiveSubmit(false);
  };

  const yesHandler = () => {
    Requests.removeAddress(deleteId)
      .then(() => {
        alert('Адрес удален!');
        dispatch(reloadData(!reload));
        setModalActiveSubmit(false);
        dispatch(reloadData(!reload));
      })
      .catch((e) => alert('Ошибка удаления адреса!'));
  };

  return (
    <div
      className={modalActiveSubmit ? 'reg-auth-wrapper active' : 'reg-auth-wrapper'}
      onClick={() => setModalActiveSubmit(false)}>
      <div className="reg-content">
        <div onClick={(e) => e.stopPropagation()} className="reg-form-wrapper">
          <div style={{ height: '230px' }} className="reg-form-email-verification">
            <img
              onClick={() => setModalActiveSubmit(false)}
              style={{
                marginTop: '25px',
                marginLeft: '485px',
                height: '14px',
                width: '14px',
                cursor: 'pointer',
              }}
              src={Shape}
            />
            <div className="log-form-text-label-p-email__upper">
              <p>Вы уверены, что хотите удалить этот адрес?</p>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}
              className="reg-form-input-area">
              <input
                style={{ marginRight: '20px' }}
                type="button"
                value="Нет"
                className="reg-form-contact-input__delete"
                onClick={noHandler}
              />

              <input
                style={{
                  backgroundColor: 'red',
                  boxShadow: '3px 3px 22px rgba(219, 13, 13, 0.24)',
                }}
                type="button"
                value="Нет"
                className="reg-form-contact-input__delete"
                value="Да"
                onClick={yesHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDeleteSubmit;
