import './css/index.css';
import { Route } from 'react-router-dom';
import RegistrationModuleBasic from './components/RegistrationModuleBasic';
import RegistrationModuleEmailIndividual from './components/RegistrationModuleEmailIndividual';
import LoginModule from './components/LoginModule';
import Home from './pages/Home';

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/registration" component={RegistrationModuleBasic} exact />
        <Route path="/registration-step-2" component={RegistrationModuleEmailIndividual} exact />
        <Route path="/login" component={LoginModule} exact />
      </div>
    </div>
  );
}

export default App;
