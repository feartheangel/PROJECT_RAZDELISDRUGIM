import './css/index.css';
import RegistrationModuleBasic from './components/RegistrationModuleBasic';
import RegistrationModuleEmailIndividual from './components/RegistrationModuleEmailIndividual';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Route path="/registration" component={RegistrationModuleBasic} exact />
        <Route path="/registration-step-2" component={RegistrationModuleEmailIndividual} exact />
      </div>
    </div>
  );
}

export default App;
