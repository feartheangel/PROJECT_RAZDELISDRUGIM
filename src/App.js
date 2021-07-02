import { Route } from 'react-router-dom';
import { Home } from './pages/index';
import { PasswordRecoverySubmit, PlaseItems } from './components/RegAuthComponents/index';
import './css/main-page.css';

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/recovery-submit" component={PasswordRecoverySubmit} exact />
        <Route path="/place-item" component={PlaseItems} exact />
      </div>
    </div>
  );
}

export default App;
