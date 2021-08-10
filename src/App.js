import { Route } from 'react-router-dom';
import {
  Home,
  PlaceItem,
  PrivateProfile,
  SearchPage,
  CardThings,
  EditItem,
  MyItems,
  PublicProfile,
  Catalog,
} from './pages/index';
import { PasswordRecoverySubmit } from './components/index';
import './css/main-page.css';
import React from 'react';
import Requests from './http/axios-requests';
import { setUserData } from './redux/actions/userData';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, setItemsLoaded, setItemsLoading } from './redux/actions/items';
import {
  setAdresses,
  setQueryStarted,
  setQueryDone,
  setUserSubjects,
} from './redux/actions/userData';

import { setUserCoords } from './redux/actions/search';

function App() {
  const { isLoggedIn, reload } = useSelector(({ userData }) => userData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setItemsLoading());
    Requests.fetchUserProfile()
      .then((response) => {
        dispatch(setUserData(response.data));
      })
      .then(
        Requests.fetchItems().then((response) => {
          if (response.status === 200 || response.status === 201) {
            dispatch(setItems(response.data));
            Requests.fetchAdresses()
              .then((response) => {
                dispatch(setAdresses(response.data));
                dispatch(setItemsLoaded());
              })
              .then(() => {
                Requests.fetchSubjects().then((response) => {
                  dispatch(setUserSubjects(response.data));
                });
              })
              // .then(() => {
              //   navigator.geolocation.getCurrentPosition((pos) => {
              //     dispatch(setUserCoords(`${pos.coords.latitude} ${pos.coords.longitude}`));
              //   }),
              //     () => alert('Ошибка получения местоположения!'),
              //     { maximumAge: 10000, enableHighAccuracy: true, timeout: 10000 };
              // })
              .catch();
          }
        }),
      );
  }, [isLoggedIn, reload]);

  return (
    <div className="wrapper">
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/recovery-submit" component={PasswordRecoverySubmit} exact />
        <Route path="/place-item" component={PlaceItem} exact />
        <Route path="/private-profile" component={PrivateProfile} exact />
        <Route path="/i-rent-out" component={MyItems} exact />
        <Route path="/search" component={SearchPage} exact />
        <Route path="/item-card" component={CardThings} exact />
        <Route path="/edit-item" component={EditItem} exact />
        <Route path="/public-profile" component={PublicProfile} exact />
        <Route path="/catalog" component={Catalog} exact />
      </div>
    </div>
  );
}

export default App;
