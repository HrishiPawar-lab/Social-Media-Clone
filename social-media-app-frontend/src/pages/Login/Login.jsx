import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from '../../context/user-context';
import "./login.css";

const Login = ({ handleLocalStorage }) => {
  const navigate = useNavigate();
  const ctx = useUserContext();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await axios.post("http://localhost:8800/api/auth/login", formData);
      if (loginData.data.user) {
        const { user, token } = loginData.data;
        handleLocalStorage(token); // Set token in localStorage
        ctx.changeUser(user); // Update user context
        navigate(`/`); // Navigate to the home page
      }
    } catch (error) {
      setError(error.response.data.message || 'An error occurred while logging in.');
    }
  };

  return (
    <div>
      <div className="loginWrapper">
        <div className="loginbox">
          <div className='loginInBoxLeft' >
            <h2 className='logo'>Social Media</h2>
            <p>
              Connecting Lives, One Post at a Time
            </p>
          </div>
          <div className='loginInBoxRight' >
            <h3 className='fw-bold'>Login</h3>
            {error && <div className="error-message">{error}</div>}
            <form className='mt-2' onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  placeholder='Enter Email'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder='Enter Password'
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className='button w-100' type='submit'>
                Login
              </button>
            </form>
            <p className='text-center mt-2'>
              Not a user ? <Link to='/register'>Register Now.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
