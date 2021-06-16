import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import Login from './components/Login.jsx';
import NotFound from './components/NotFound.jsx';
import MainContent from './components/MainContent/MainContent.jsx';

const App = () => {
  const isAuth = false;
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navigation />
        <Switch>
          <Route exact path="/">
            {isAuth ? <Login /> : <MainContent />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
