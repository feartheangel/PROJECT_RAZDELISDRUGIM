import React, { useState } from 'react';
import './MyGlobalData.css';
import MyDataIndividual from './MyData/MyDataIndividual';
import MyAddresses from './MyAddresses/MyAddresses';
import MyDataBusiness from './MyData/MyDataBusiness';
import { useSelector } from 'react-redux';

const MyGlobalData = ({
  setModalActiveNumber,
  setModalActiveEmail,
  setModalActiveSubmit,
  setDeleteId,
}) => {
  const [activeForm, setActiveForm] = useState('myData');

  const { status } = useSelector(({ userData }) => userData.userData);

  return (
    <div className="container_profile" style={{marginRight:'15px'}}>
      <div  className="container_profile" id="globaldata_pk">
      {/* ЛЕВЫЙ ОПЦИОНАЛ */}
      <div className="container_profile_optional">
        <div className="optional_scroll1">
          <p
            className={activeForm === 'myData' && 'container_profile_optional_myData'}
            onClick={() => setActiveForm('myData')}>
            {' '}
            Мои данные{' '}
          </p>
        </div>
        <div  className="optional_scroll2">
          <p
            className={activeForm === 'myAddresses' && 'container_profile_optional_myAddresses'}
            onClick={() => setActiveForm('myAddresses')}>
            {' '}
            Мои адреса{' '}
          </p>
        </div>
        <div  className="optional_scroll3">
          <p style={{ opacity: '0.4', pointerEvents: 'none' }}> Мои документы </p>
        </div>
        <div  className="optional_scroll4">
          <p style={{ opacity: '0.4', pointerEvents: 'none' }}> Кошелёк </p>
        </div>
        <div className="optional_scroll5">
          <p style={{ opacity: '0.4', pointerEvents: 'none' }}> Уведомления </p>
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}

      <div className="container_profile_content">
        {activeForm === 'myData' && status === 2 && (
          <MyDataBusiness
            setModalActiveEmail={setModalActiveEmail}
            setModalActiveNumber={setModalActiveNumber}
          />
        )}
        {activeForm === 'myData' && status === 1 && (
          <MyDataIndividual
            setModalActiveEmail={setModalActiveEmail}
            setModalActiveNumber={setModalActiveNumber}
          />
        )}
        {activeForm === 'myAddresses' && (
          <MyAddresses setModalActiveSubmit={setModalActiveSubmit} setDeleteId={setDeleteId} />
        )}
      </div>
      </div>

                {/* МОБИЛЬНАЯ ВЕРСИЯ */}
      <div  className="container_profile" id="globaldata_mobile" style={{marginRight:'15px'}}>
      {/* ЛЕВЫЙ ОПЦИОНАЛ */}
      <div className="container_profile_optional">
        <div className="optional_scroll1">
          <p
            className={activeForm === 'myData' && 'container_profile_optional_myData'}
            onClick={() => setActiveForm('myData')}>
            {' '}
            Мои данные{' '}
          </p>
        </div>
        <div  className="optional_scroll2">
          <p
            className={activeForm === 'myAddresses' && 'container_profile_optional_myAddresses'}
            onClick={() => setActiveForm('myAddresses')}>
            {' '}
            Мои адреса{' '}
          </p>
        </div>
        <div  className="optional_scroll3">
          <p style={{ opacity: '0.4', pointerEvents: 'none' }}> Мои документы </p>
        </div>
        <div  className="optional_scroll4">
          <p style={{ opacity: '0.4', pointerEvents: 'none' }}> Кошелёк </p>
        </div>
        <div className="optional_scroll5">
          <p style={{ opacity: '0.4', pointerEvents: 'none' }}> Уведомления </p>
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}

      <div className="container_profile_content">
        {activeForm === 'myData' && status === 2 && (
          <MyDataBusiness
            setModalActiveEmail={setModalActiveEmail}
            setModalActiveNumber={setModalActiveNumber}
          />
        )}
        {activeForm === 'myData' && status === 1 && (
          <MyDataIndividual
            setModalActiveEmail={setModalActiveEmail}
            setModalActiveNumber={setModalActiveNumber}
          />
        )}
        {activeForm === 'myAddresses' && (
          <MyAddresses setModalActiveSubmit={setModalActiveSubmit} setDeleteId={setDeleteId} />
        )}
      </div>
      </div>

    </div>
  );
};

export default MyGlobalData;
