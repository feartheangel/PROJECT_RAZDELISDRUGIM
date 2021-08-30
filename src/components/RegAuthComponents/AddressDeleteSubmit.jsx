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
        console.log('Адрес удален!');
        dispatch(reloadData(!reload));
        setModalActiveSubmit(false);
      })
      .catch((e) => {
        dispatch(reloadData(!reload));
        console.log('Ошибка удаления адреса!');
        setModalActiveSubmit(false);
      });
  };

  return (
    <div>
      <div
        className={modalActiveSubmit ? 'reg-auth-wrapper active' : 'reg-auth-wrapper'}
        id="regform_pk"
        onClick={() => setModalActiveSubmit(false)}>
        <div className="reg-content" style={{display:'flex'}}>
          <div onClick={(e) => e.stopPropagation()} className="reg-form-wrapper">
            <div className="reg-form-email-verification">
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
                  className="reg-form-contact-input__delete"
                  value="Да"
                  onClick={yesHandler}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      
          {/* МОБИЛЬНАЯ ВЕРСИЯ */}

          <div
        className={modalActiveSubmit ? 'reg-auth-wrapper active' : 'reg-auth-wrapper'}
        id="regform_mobile"
        onClick={() => setModalActiveSubmit(false)}>
        <div className="reg-content" style={{display:'flex'}}>
          <div onClick={(e) => e.stopPropagation()} className="reg-form-wrapper">
          <div
            style={{ height: '200px', display:'flex', width:'100%', borderRadius:'0'}}
            className="reg-form-email-verification">
              <div className="div_for_krestik">
              <img 
            onClick={() => setModalActiveSubmit(false)} 
            src={Shape} 
            className="img_krestik"
            style={{display:'flex', marginRight:'15px'}}
             />
              </div>

            <div className="log-form-text-label-p-email__upper">
              <p style={{fontSize:'14px'}}>Вы уверены, что хотите удалить этот адрес?</p>
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
                className="reg-form-contact-input__delete"
                value="Да"
                onClick={yesHandler}
              />
            </div>
          </div>

          </div>
        </div>
      </div>

    </div>
  );
};


export default AddressDeleteSubmit;
