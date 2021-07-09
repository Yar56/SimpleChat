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
// import useAuth from '../hooks/useAuth/index.js';

// const ChatRoute = ({ children, isntanceSocket, path }) => {
//   const auth = useAuth();
//   const token = auth.getAuthHeader();
//   return (
//     <Route
//       path={path}
//       render={({ location }) => (token
//         ? <SocketContext.Provider value={isntanceSocket}>{children}</SocketContext.Provider>
//         : <Redirect to={{ pathname: '/login', state: { from: location } }} />
//       )}
//     />
//   );
// };

const App = ({ socket }) => {
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

  const AuthButton = () => {
    const auth = useContext(AuthContext);
    const head = auth.getAuthHeader();

    if (head) {
      return <Button onClick={auth.logOut}>Выйти</Button>;
    }
    return null;
  };

  const AppProviders = ({ children }) => (
    <AuthContext.Provider value={{
      getAuthHeader,
      user,
      logIn,
      logOut,
    }}
    >
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </AuthContext.Provider>
  );

  return (
    <AppProviders>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navbar bg="white" expand="lg" className="shadow-sm">
            <div className="container">
              <Navbar.Brand as={Link} to="/" className="navbar-brand">Hexlet Chat</Navbar.Brand>
              <AuthButton />
            </div>
          </Navbar>
          <Switch>
            <Route exact path="/" render={() => (user ? <ChatContainer /> : <Redirect to="/login" />)} />
            <Route exact path="/login" render={() => (user ? <Redirect to="/" /> : <Login />)} />
            <Route exact path="/signup" render={() => (user ? <Redirect to="/" /> : <SignUp />)} />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </AppProviders>
    // <AuthProvider>
    //   <Router>
    //     <div className="d-flex flex-column h-100">
    //       <Navbar bg="white" expand="lg" className="shadow-sm">
    //         <div className="container">
    //           <Navbar.Brand as={Link} to="/" className="navbar-brand">Hexlet Chat</Navbar.Brand>
    //           <AuthButton />
    //         </div>
    //       </Navbar>
    //       <Switch>
    //         <ChatRoute isntanceSocket={socket} exact path="/">
    //           <ChatContainer />
    //         </ChatRoute>
    //         <Route path="/login">
    //           <Login />
    //         </Route>
    //         <Route path="/signup">
    //           <SignUp />
    //         </Route>
    //         <Route path="*">
    //           <NotFound />
    //         </Route>
    //       </Switch>
    //     </div>
    //   </Router>
    // </AuthProvider>
  );
};

export default App;
