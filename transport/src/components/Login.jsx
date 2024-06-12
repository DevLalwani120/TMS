import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('admin');
  const navigate = useNavigate();

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = activeTab === 'admin' ? 'admin/login' : 'client/login';
      const response = await axios.post(`https://tms-server-nt4d.onrender.com/${endpoint}`, { email, password });
      toast.success(response.data.message);  // Success toast
  
      // Store email in session storage
      sessionStorage.setItem('email', email);
  
      // Delay navigation to ensure toast is visible
      await delay(750);
  
      if (activeTab === 'admin') {
        navigate('/adminDashboard');
      } else {
        navigate('/clientDashboard');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);  // Error toast
      } else {
        toast.error('An unexpected error occurred');  // Error toast
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='main'>
    <div className="Admin">
      <div className="login-container">
        <h2 className="login-header">Login</h2>
        <div className="tab-navigation">
          <button className={activeTab === 'admin' ? 'active' : ''} onClick={() => setActiveTab('admin')}>Admin</button>
          <span className="separator">|</span>
          <button className={activeTab === 'client' ? 'active' : ''} onClick={() => setActiveTab('client')}>Client</button>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='login-input'
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='login-input'
              />
              <FontAwesomeIcon
                className="toggle-password"
                onClick={toggleShowPassword}
                icon={showPassword ? faEye : faEyeSlash}
              />
            </div>
          </div>
          <div className="login-button">
            <button className="loginbutton" type="submit">Login</button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        closeButton={false}  // Remove close button
      />
    </div>
    </div>
  );
};

export default Login;
