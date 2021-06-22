import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';

import Login from './components/LoginPage.jsx';
import NotFound from './components/NotFound.jsx';
import SignUp from './components/SignUp.jsx';
import AddFeedButton from './features/feeds/AddFeedButton.js';
import FeedsList from './features/feeds/FeedsList.js';

import authContext from './contexts/index.js';
import useAuth from './hooks/index.js';

const AuthProvider = ({ children }) => {
  // FIXME: возможно нужно переделать получения head с хранилища
  const getAuthHeader = () => JSON.parse(localStorage.getItem('userId'));

  const initState = getAuthHeader() ? { username: getAuthHeader().username } : null;
  const [user, setUserData] = useState(initState);

  const logIn = () => {
    const data = getAuthHeader();
    setUserData({ username: data.username });
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setUserData(null);
  };
  return (
    <authContext.Provider
      value={{
        getAuthHeader,
        user,
        logIn,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const AuthButton = () => {
  const auth = useContext(authContext);
  const head = auth.getAuthHeader();

  if (head) {
    return <Button onClick={auth.logOut}>Выйти</Button>;
  }
  return null;
};

const ChatRoute = ({ children, path }) => {
  const auth = useAuth();

  const token = auth.getAuthHeader();

  return (
    <Route
      path={path}
      render={() => (token
        ? children
        : <Redirect to="/login" />)}
    />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Navbar.Brand as={Link} to="/" className="navbar-brand">Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </div>
        </Navbar>
        <Switch>
          {/* <Route exact path="/">
            {!isAuth ? <Redirect to="/login" /> : <MainContent />}
          </Route> */}
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <ChatRoute exact path="/">
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white">
                <div className="col-12 col-md-2 border-end pt-5 px-0 bg-light">
                  <AddFeedButton />
                  <FeedsList />
                </div>
              </div>

            </div>
          </ChatRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
