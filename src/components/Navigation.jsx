import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <NavLink className="navbar-brand" to="/">
        Hexlet Chat
      </NavLink>
      {/* <a className="navbar-brand" href="/"></a> */}
    </div>
  </nav>
);
export default Navigation;
