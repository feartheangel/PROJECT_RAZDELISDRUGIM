import React, { useState } from 'react';
import './PrivateProfile.css';
import { Header, Footer } from '../../components/index';
import MyData from './MyGlobalData/MyGlobalData';
import MyItems from './MyItems/MyItems';
import Requests from '../../http/axios-requests';
import { setItems, setItemsLoaded, setItemsLoading } from '../../redux/actions/items';
import { setAdresses, setQueryStarted, setQueryDone } from '../../redux/actions/userData';
import { useSelector, useDispatch } from 'react-redux';
import { NumberSubmittionModule, EmailSubmittionModule } from '../../components/index';

const PrivateProfile = () => {
  const dispatch = useDispatch();
  const { subjects } = useSelector(({ userData }) => userData);

  // ХРАНЕНИЕ ДАННЫХ ИЗ ПОЛЕЙ

  const [activeForm, setActiveForm] = React.useState('myProfile');
  const [modalActiveEmail, setModalActiveEmail] = React.useState(false);
  const [modalActiveNumber, setModalActiveNumber] = React.useState(false);

  return (
    <div>
      <Header />
      <div className="privateProfile">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <p
              onClick={() => setActiveForm('myItems')}
              className={activeForm === 'myItems' && 'conteiner_shapka_myProfile'}>
              Я сдаю <span> {subjects.length} </span>
            </p>
            <p>
              Я беру <span> 1 </span>
            </p>
            <p>
              Мои сообщения <span> 2 </span>
            </p>
            <p className={activeForm === 'favorites' && 'privateProfile_container_favorites'}>
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
              setModalActiveEmail={setModalActiveEmail}
              setModalActiveNumber={setModalActiveNumber}
            />
          )}

          {activeForm === 'myItems' && <MyItems />}
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
    </div>
  );
};

export default PrivateProfile;
