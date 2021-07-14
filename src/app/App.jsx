import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';

import Login from '../components/LoginPage.jsx';
import NotFound from '../components/NotFound.jsx';
import SignUp from '../components/SignUp.jsx';
import ChatContainer from '../components/ChatContainer.jsx';

import AuthContext from '../contexts/AuthContext.js';
import SocketContext from '../contexts/SocketContext.js';
import useAuth from '../hooks/useAuth/index.js';

const AuthProvider = ({ children }) => {
  const getAuthData = () => JSON.parse(localStorage.getItem('user'));
  const initState = getAuthData() ? { user: getAuthData().user } : null;
  const [isAuth, setIsAuth] = useState(!!initState);

  const logIn = (authData) => {
    setIsAuth(true);
    localStorage.setItem('user', JSON.stringify(authData));
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setIsAuth(false);
  };
  return (
    <AuthContext.Provider
      value={{
        getAuthData,
        isAuth,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthButton = () => {
  const auth = useContext(AuthContext);
  const { isAuth } = auth;
  if (isAuth) {
    return <Button onClick={auth.logOut}>Выйти</Button>;
  }
  return null;
};

const ChatRoute = ({ children, isntanceSocket, path }) => {
  const auth = useAuth();
  const { isAuth } = auth;
  return (
    <Route
      path={path}
      render={() => (isAuth
        ? <SocketContext.Provider value={isntanceSocket}>{children}</SocketContext.Provider>
        : <Redirect to="/login" />
      )}
    />
  );
};

const App = ({ socket }) => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar bg="white" expand="lg" className="shadow-sm">
          <div className="container">
            <Navbar.Brand as={Link} to="/" className="navbar-brand">Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </div>
        </Navbar>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <ChatRoute isntanceSocket={socket} exact path="/">
            <ChatContainer />
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
