import React, { useState, useContext, useEffect } from "react";
import classnames from "classnames";
import _ from "lodash";
import { register } from "../../actions/securityActions";
import { UserContext } from "../../utilities/userContext";

function Register({ history }) {
  const { data } = useContext(UserContext);
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    password: "",
    confimPassword: "",
  });

  if (data) {
    history.push("/dashboard");
  }

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const newUser = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(newUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      history.replace("/login");
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
      <h1 className="text-center">Sign Up</h1>
      <h5 className="text-center">Create you Account</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <input
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.fullName,
              "is-valid": !_.isEmpty(errors) && !errors.fullName,
            })}
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={onChange}
          ></input>
          {errors.fullName && (
            <div className="invalid-feedback">{errors.fullName}</div>
          )}
        </div>
        <div className="form-group row">
          <input
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.username,
              "is-valid": !_.isEmpty(errors) && !errors.username,
            })}
            type="text"
            name="username"
            placeholder="Email Address (Username)"
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
            onChange={onChange}
          ></input>
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <div className="form-group row">
          <input
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.confirmPassword,
              "is-valid": !_.isEmpty(errors) && !errors.confirmPassword,
            })}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={onChange}
          ></input>
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
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

export default Register;
