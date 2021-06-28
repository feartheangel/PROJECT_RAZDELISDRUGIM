import { Route } from 'react-router-dom';
import { Home } from './pages/index';
import {
  RegistrationModuleBasic,
  LoginModule,
  PasswordRecoveryEntry,
  PasswordRecoverySubmit,
  PlaseItems,
} from './components/RegAuthComponents/index';

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/registration" component={RegistrationModuleBasic} exact />
        <Route path="/login" component={LoginModule} exact />
        <Route path="/recovery" component={PasswordRecoveryEntry} exact />
        <Route path="/recovery-submit" component={PasswordRecoverySubmit} exact />
        <Route path="/place-item" component={PlaseItems} exact />
      </div>
    </div>
  );
}

export default App;
