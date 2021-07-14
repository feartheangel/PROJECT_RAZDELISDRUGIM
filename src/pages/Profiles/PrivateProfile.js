import React, { useState } from 'react';
import './PrivateProfile.css';
import { Header, Footer, } from '../../components/index';
import MyData from './MyGlobalData/MyGlobalData';

const PrivateProfile = () => {



// ХРАНЕНИЕ ДАННЫХ ИЗ ПОЛЕЙ

const[favorites, setFavorites]=useState(false);
const[myProfile, setMyProfile]= useState(true);



  return (
    <div>
      <Header />
      <div className="privateProfile">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
              <p> Я сдаю <span> 0 </span> </p>
              <p> Я беру <span> 1 </span> </p>
              <p> Мои сообщения <span> 2 </span> </p>
              <p
                  className={ favorites === true && "privateProfile_container_favorites" }
                  onClick={()=> setFavorites(!favorites)}
              > Избранное</p>
              <p
                  className={ myProfile === true && "conteiner_shapka_myProfile" }
                  onClick = {()=> setMyProfile(!myProfile)}
              > Мой профиль</p>
          </div>

            {myProfile && <MyData /> }




        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivateProfile;
