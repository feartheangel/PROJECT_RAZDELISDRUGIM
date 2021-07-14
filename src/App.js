import { Route } from 'react-router-dom';
import {Home, MyData, PlaceItem, PrivateProfile, MyGlobalData, MyAddresses} from './pages/index';
import { PasswordRecoverySubmit } from './components/index';
import './css/main-page.css';


function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/recovery-submit" component={PasswordRecoverySubmit} exact />
        <Route path="/place-item" component={PlaceItem} exact />
        <Route path="/private-profile" component={PrivateProfile} exact />
        <Route path="/private-profile/my-global-data" component={MyGlobalData} exact />
        <Route path="/private-profile/my-global-data/my-data" component={MyData} exact />
        <Route path="/private-profile/my-global-data/my-addresses" component={MyAddresses} exact />
      </div>
    </div>
  );
}

export default App;
