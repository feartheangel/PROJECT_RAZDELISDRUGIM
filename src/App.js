import './css/index.css';
import { Route } from 'react-router-dom';
import RegistrationModuleBasic from './components/RegistrationModuleBasic';
import RegistrationModuleIndividual from './components/RegistrationModuleIndividual';
import RegistrationModuleEntity from './components/RegistrationModuleEntity';
import LoginModule from './components/LoginModule';
import Home from './pages/Home';
import EmailSubmittionModule from './components/EmailSubmittionModule';

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/registration" component={RegistrationModuleBasic} exact />
        <Route path="/registration-individual" component={RegistrationModuleIndividual} exact />
        <Route path="/registration-entity" component={RegistrationModuleEntity} exact />
        <Route path="/registration-email-verification" component={EmailSubmittionModule} exact />
        <Route path="/login" component={LoginModule} exact />
      </div>
    </div>
  );
}

export default App;
