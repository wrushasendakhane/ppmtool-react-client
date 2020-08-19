import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../utilities/userContext";
function Landing({ history }) {
  const { data: user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
  });
  return (
    <div className="container">
      <h1 className="text-center">Personal Project Management Tool</h1>
      <h4 className="text-center">
        Create your account to join active projects or start your own
      </h4>
      <hr />
      <p className="text-center">
        <Link className="btn btn-primary btn-lg mb-2" to="/register">
          Sign Up
        </Link>
        &nbsp;
        <Link className="btn btn-secondary btn-lg mb-2" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Landing;
