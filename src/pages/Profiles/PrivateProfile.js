import React, { useState } from 'react';
import './PrivateProfile.css';
import { Header, Footer } from '../../components/index';
import MyData from './MyGlobalData/MyGlobalData';
import { Link } from 'react-router-dom';
import MyItems from './MyItems/MyItems';
import Requests from '../../http/axios-requests';
import { setItems, setItemsLoaded, setItemsLoading } from '../../redux/actions/items';
import { setAdresses, setQueryStarted, setQueryDone } from '../../redux/actions/userData';
import { useSelector, useDispatch } from 'react-redux';
import {
  NumberSubmittionModule,
  EmailSubmittionModule,
  AddressDeleteSubmit,
} from '../../components/index';

const PrivateProfile = () => {
  const dispatch = useDispatch();
  const { subjects } = useSelector(({ userData }) => userData);

  // ХРАНЕНИЕ ДАННЫХ ИЗ ПОЛЕЙ

  const [activeForm, setActiveForm] = React.useState('myProfile');
  const [modalActiveEmail, setModalActiveEmail] = React.useState(false);
  const [modalActiveNumber, setModalActiveNumber] = React.useState(false);

  const [modalActiveSubmit, setModalActiveSubmit] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  return (
    <div>
      <Header />
      <div className="privateProfile">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <Link
              style={{ textDecoration: 'none' }}
              className="conteiner_shapka_myProfile"
              to="/i-rent-out">
              <p>
                Я сдаю <span> {subjects.length} </span>
              </p>
            </Link>
            <p style={{ opacity: '0.4', pointerEvents: 'none' }}>
              Я беру <span> - </span>
            </p>
            <p style={{ opacity: '0.4', pointerEvents: 'none' }}>
              Мои сообщения <span> - </span>
            </p>
            <p
              style={{ opacity: '0.4', pointerEvents: 'none' }}
              className={activeForm === 'favorites' && 'privateProfile_container_favorites'}>
              Избранное
            </p>
            <p
              className={activeForm === 'myProfile' && 'conteiner_shapka_myProfile'}
              onClick={() => setActiveForm('myProfile')}>
              {' '}
              Мой профиль
            </p>
          </div>

          {activeForm === 'myProfile' && (
            <MyData
              setModalActiveSubmit={setModalActiveSubmit}
              setDeleteId={setDeleteId}
              setModalActiveEmail={setModalActiveEmail}
              setModalActiveNumber={setModalActiveNumber}
            />
          )}
        </div>
      </div>
      <NumberSubmittionModule
        modalActiveNumber={modalActiveNumber}
        setModalActiveNumber={setModalActiveNumber}
      />
      <EmailSubmittionModule
        modalActiveEmail={modalActiveEmail}
        setModalActiveEmail={setModalActiveEmail}
      />
      <Footer />
      <AddressDeleteSubmit
        deleteId={deleteId}
        setModalActiveSubmit={setModalActiveSubmit}
        modalActiveSubmit={modalActiveSubmit}
      />
    </div>
  );
};

export default PrivateProfile;
