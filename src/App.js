import { Route } from 'react-router-dom';
import { Home, PlaceItem, PrivateProfile, MyGlobalData, SearchPage } from './pages/index';
import { PasswordRecoverySubmit } from './components/index';
import './css/main-page.css';
import React from 'react';
import Requests from './http/axios-requests';
import { setUserData } from './redux/actions/userData';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    Requests.fetchUserProfile().then((response) => {
      dispatch(setUserData(response.data));
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/recovery-submit" component={PasswordRecoverySubmit} exact />
        <Route path="/place-item" component={PlaceItem} exact />
        <Route path="/private-profile" component={PrivateProfile} exact />
        <Route path="/private-profile/my-global-data" component={MyGlobalData} exact />
        <Route path="/search-page" component={SearchPage} exact />
      </div>
    </div>
  );
}

export default App;
