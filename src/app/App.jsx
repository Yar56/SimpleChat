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
// import useSocket from '../hooks/useSocket/index.js';
import useAuth from '../hooks/useAuth/index.js';

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
    <AuthContext.Provider
      value={{
        getAuthHeader,
        user,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// const SocketProvider = ({ children, io }) => {

//   return <SocketContext.Provider value={io}>{children}</SocketContext.Provider>;
// }

const AuthButton = () => {
  const auth = useContext(AuthContext);
  const head = auth.getAuthHeader();

  if (head) {
    return <Button onClick={auth.logOut}>Выйти</Button>;
  }
  return null;
};

const ChatRoute = ({ children, isntanceSocket, path }) => {
  const auth = useAuth();
  // const socket = useSocket();
  const token = auth.getAuthHeader();
  // console.log(isntanceSocket)
  return (
    <Route
      path={path}
      render={() => (token
        ? <SocketContext.Provider value={isntanceSocket}>{children}</SocketContext.Provider>
        : <Redirect to="/login" />)}
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
            {/* {console.log(socket)} */}
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
