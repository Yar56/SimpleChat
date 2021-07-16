import React, {
  useState, useContext, useCallback, useMemo,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import getInitialAuth from './getInitialAuth.js';

import Login from '../components/LoginPage.jsx';
import NotFound from '../components/NotFound.jsx';
import SignUp from '../components/SignUp.jsx';
import ChatContainer from '../components/ChatContainer.jsx';

import AuthContext from '../contexts/AuthContext.js';
import SocketContext from '../contexts/SocketContext.js';
import useAuth from '../hooks/useAuth/index.js';

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(!!getInitialAuth());

  const logIn = useCallback((authData) => {
    setIsAuth(true);
    localStorage.setItem('user', JSON.stringify(authData));
  }, [isAuth]);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setIsAuth(false);
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={useMemo(() => ({
        getInitialAuth,
        isAuth,
        logIn,
        logOut,
      }), [isAuth])}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthButton = () => {
  const { isAuth, logOut } = useContext(AuthContext);
  if (isAuth) {
    return <Button onClick={logOut}>Выйти</Button>;
  }
  return null;
};

const ChatRoute = ({ children, isntanceSocket, path }) => {
  const { isAuth } = useAuth();
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
