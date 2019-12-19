// jshint esversion: 9
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = props => {
  const [user, setuser] = useState({
    email: "",
    password: ""
  });
  const { email, password } = user;

  const authContext = useContext(AuthContext);
  const { login, error, isAuthenticated, clearError } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
  }, [error, isAuthenticated, props.history]);

  const onChange = e =>
    setuser({
      ...user,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      return setAlert("Email and Password are required", "danger", 3000);
    }
    console.log("logged in");
    login({ email, password });
  };
  return (
    <div className='form-container'>
      <h1 className='text-primary'>Login</h1>
      <form onSubmit={onSubmit}>
        <div className='form-control'>
          <label htmlFor='email'>Enter Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>

        <div className='form-control'>
          <label htmlFor='password'>Enter Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
