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
import routes from '../routes.js';
import getInitialAuth from './getInitialAuth.js';

import Login from '../components/LoginPage.jsx';
import NotFound from '../components/NotFound.jsx';
import SignUp from '../components/SignUp.jsx';
import ChatContainer from './ChatContainer.jsx';
import RenderModal from '../components/RenderModal.jsx';
import AuthContext from '../contexts/AuthContext.js';
import useAuth from '../hooks/useAuth.js';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialAuth);

  const logIn = useCallback((authData) => {
    localStorage.setItem('user', JSON.stringify(authData));
    setUser(authData);
  }, [setUser]);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, [setUser]);

  const memoizedAuthContextValue = useMemo(() => ({
    user,
    logIn,
    logOut,
  }), [user, logIn, logOut]);

  return (
    <AuthContext.Provider value={memoizedAuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthButton = () => {
  const { user, logOut } = useContext(AuthContext);
  if (user) {
    return <Button onClick={logOut}>Выйти</Button>;
  }
  return null;
};

const ChatRoute = ({ children, path }) => {
  const { user: { username } } = useAuth();
  console.log(username);
  return (
    <Route
      path={path}
      render={() => (username
        ? children
        : <Redirect to={routes.loginPage} />
      )}
    />
  );
};

const App = () => (
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
          <Route path={routes.loginPage}>
            <Login />
          </Route>
          <Route path={routes.signUpPage}>
            <SignUp />
          </Route>
          <ChatRoute exact path={routes.chatPage}>
            <ChatContainer />
          </ChatRoute>
          <Route path={routes.notFoundPage}>
            <NotFound />
          </Route>
        </Switch>
        <RenderModal />
      </div>
    </Router>
  </AuthProvider>
);

export default App;
