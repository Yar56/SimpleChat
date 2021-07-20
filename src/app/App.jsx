import React, {
  useState, useContext, useCallback, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import getInitialAuth from './getInitialAuth.js';
import { selectIsOpenedModal, closeModal, selectModalType } from '../features/modals/modalsSlice.js';
import { selectAllChannels } from '../features/channels/channelsSlice.js';

import Login from '../components/LoginPage.jsx';
import NotFound from '../components/NotFound.jsx';
import SignUp from '../components/SignUp.jsx';
import ChatContainer from './ChatContainer.jsx';
import RenderModal from '../components/RenderModal.jsx';
import AuthContext from '../contexts/AuthContext.js';
import useAuth from '../hooks/useAuth/index.js';

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => !!getInitialAuth());

  const logIn = useCallback((authData) => {
    setIsAuth(true);
    localStorage.setItem('user', JSON.stringify(authData));
  }, [setIsAuth]);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setIsAuth(false);
  }, [setIsAuth]);

  return (
    <AuthContext.Provider
      value={useMemo(() => ({
        getInitialAuth,
        isAuth,
        logIn,
        logOut,
      }), [isAuth, logIn, logOut])}
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

const ChatRoute = ({ children, path }) => {
  const { isAuth } = useAuth();
  return (
    <Route
      path={path}
      render={() => (isAuth
        ? children
        : <Redirect to="/login" />
      )}
    />
  );
};

const App = () => {
  const dispatch = useDispatch();
  const onHide = () => dispatch(closeModal());
  const allChannels = useSelector(selectAllChannels);
  const isOpened = useSelector(selectIsOpenedModal);
  const typeModal = useSelector(selectModalType);
  const { t } = useTranslation();

  return (
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
            <ChatRoute exact path="/">
              <ChatContainer />
            </ChatRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <RenderModal
            isOpened={isOpened}
            type={typeModal}
            onHide={onHide}
            channels={allChannels}
            t={t}
          />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
