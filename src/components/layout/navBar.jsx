import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../../utilities/userContext";
function NavBar() {
  const { data: user, handleLogout } = useContext(UserContext);
  const [headerContent, setHeaderContent] = useState(null);
  useEffect(() => {
    console.log("NavBar", user);
    if (user) {
      setHeaderContent(
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <NavLink className="nav-item nav-link" to="/dashboard">
              Dashboard
            </NavLink>
          </ul>
          <Link className="nav-item nav-link" to="/dashboard">
            <i className="fa fa-user-circle mr-1" />
            {user.fullName}
          </Link>
          <Link
            className="nav-item nav-link"
            to="/login"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </div>
      );
    } else {
      setHeaderContent(
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <Link className="nav-item nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-item nav-link" to="/register">
              Sign Up
            </Link>
          </ul>
        </div>
      );
    }
  }, [user]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/landing" className="navbar-brand">
          PPMTool
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {headerContent}
      </nav>
    </div>
  );
}

export default NavBar;
