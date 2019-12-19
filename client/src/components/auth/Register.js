// jshint esversion: 9
import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { CLEAR_ERRORS } from "../../context/types";

const Register = props => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { name, email, password, password2 } = user;

  const authContext = useContext(AuthContext);
  const { register, isAuthenticated, error, clearError } = authContext;

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
    if (name === "" || email === "" || password === "") {
      setAlert("Pease enter all fields!", "danger", 3000);
    } else if (password !== password2) {
      setAlert("Password do not match", "danger", 3000);
    } else {
      register({
        name,
        email,
        password
      });
    }
  };
  return (
    <div className='form-container'>
      <h1 className='text-primary'>Register Account</h1>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            minLength='6'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
