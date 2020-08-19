import React, { useState, useContext, useEffect } from "react";
import classnames from "classnames";
import _ from "lodash";
import { login } from "../../actions/securityActions";
import { setJWTToken } from "../../utilities/security";
import jwt_decode from "jwt-decode";
import { UserContext } from "../../utilities/userContext";

function Login({ history }) {
  const { data: user, handleLogin } = useContext(UserContext);
  const [loginRequest, setLoginRequest] = useState({
    username: "",
    password: "",
  });

  if (user) {
    history.push("/dashboard");
  }

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const newLoginRequest = {
      ...loginRequest,
      [e.target.name]: e.target.value,
    };
    setLoginRequest(newLoginRequest);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(loginRequest);
      localStorage.setItem("jwtToken", data.token);
      setJWTToken(data.token);
      const user = jwt_decode(data.token);
      handleLogin(user);
      history.replace("/dashboard");
    } catch (error) {
      if (!error.response) {
        let errorOject = JSON.parse(error.message);
        setErrors(errorOject);
      } else {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <input
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.username,
              "is-valid": !_.isEmpty(errors) && !errors.username,
            })}
            type="text"
            name="username"
            placeholder="Email Address"
            value={loginRequest.username}
            onChange={onChange}
          ></input>
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="form-group row">
          <input
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.password,
              "is-valid": !_.isEmpty(errors) && !errors.password,
            })}
            type="password"
            name="password"
            placeholder="Password"
            value={loginRequest.password}
            onChange={onChange}
          ></input>
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="form-group row">
          <button className="btn btn-info btn-lg btn-block" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
