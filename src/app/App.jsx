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

// const ChatRoute = ({ children, isntanceSocket, path }) => {
//   const auth = useAuth();
//   const token = auth.getAuthData();
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

// const App = ({ socket }) => {
//   // FIXME: возможно нужно переделать получения head с хранилища
//   const getAuthData = () => JSON.parse(localStorage.getItem('userId'));

//   const initState = getAuthData() ? { user: getAuthData().user } : null;
//   // FIXME: change user to loggedIn, вынести добавление в локал сторадж в одну функцию (logIn)
//   const [user, setUserData] = useState(initState);
//   const [isAuth, setIsAuth] = useState(!!user);

//   const logIn = () => {
//     const data = getAuthData();
//     setUserData({ user: data.user });
//     setIsAuth(true);
//   };
//   const logOut = () => {
//     localStorage.removeItem('userId');
//     setUserData(null);
//     setIsAuth(false);
//   };

//   const AuthButton = () => {
//     const auth = useContext(AuthContext);
//     const head = auth.getAuthData();

//     if (head) {
//       return <Button onClick={auth.logOut}>Выйти</Button>;
//     }
//     return null;
//   };

//   const AppProviders = ({ children }) => (
//     <AuthContext.Provider value={{
//       getAuthData,
//       user,
//       logIn,
//       logOut,
//     }}
//     >
//       <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//     </AuthContext.Provider>
//   );

//   return (
//     <AppProviders>
//       <Router>
//         <div className="d-flex flex-column h-100">
//           <Navbar bg="white" expand="lg" className="shadow-sm">
//             <div className="container">
//               <Navbar.Brand as={Link} to="/" className="navbar-brand">Hexlet Chat</Navbar.Brand>
//               <AuthButton />
//             </div>
//           </Navbar>
//           <Switch>
//             {console.log(user, isAuth)}
//             <Route exact path="/" render={() => (isAuth
//                  ? <ChatContainer /> : <Redirect to="/login" />)} />
//             <Route exact path="/login" render={() => (isAuth
//                  ? <Redirect to="/" /> : <Login />)} />
//             <Route exact path="/signup" render={() => (isAuth
//                  ? <Redirect to="/" /> : <SignUp />)} />
//             <Route path="*">
//               <NotFound />
//             </Route>
//           </Switch>
//         </div>
//       </Router>
//     </AppProviders>
//   );
// };
const AuthProvider = ({ children }) => {
  // FIXME: возможно нужно переделать получения head с хранилища
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
