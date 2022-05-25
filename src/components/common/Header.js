import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Auth } from 'aws-amplify'
const Header = () => {

  const activeStyle = { color: "#F15B2A" };
  let navigate = useNavigate();

  function handleLogout() {

    Auth.signOut().then((data) => {

      navigate('/');

    }).catch((error) => {

      navigate('/');
      console.log(error);
    })
  }

  return (
    <nav>
      <NavLink to="/" activestyle={activeStyle}>
        Login
      </NavLink>
      {" | "}
      <NavLink to="/courses" activestyle={activeStyle}>
        Courses
      </NavLink>
      {" | "}
      <NavLink to="/about" activestyle={activeStyle}>
        About
      </NavLink>
      {" | "}
      <button type="button" className="btn btn-link" onClick={handleLogout} >Logout</button>
    </nav>
  );
};

export default Header;
