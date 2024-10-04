import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import pic1 from '../Assets/1.jpeg';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Student');
  const [institute, setInstitute] = useState(' ');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [instituteError, setInstituteError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!institute) {
      setInstituteError('Institute is required');
      isValid = false;
    } else {
      setInstituteError('');
    }

    if (isValid) {
      const url =
        userType === 'Student'
          ? 'http://localhost:8080/studentlogin'
          : userType === 'Teacher'
          ? 'http://localhost:8080/teacherlogin'
          : 'http://localhost:8080/userlogin';

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, userType, institute }),
        });

        if (response.ok) {
          console.log('Login successful');
          login(); // Set the authentication state
          navigate('/upload'); // Redirect to the upload page after successful login
        } else {
          const errorData = await response.json();
          console.error('Login failed', errorData);
          alert('Invalid Email or password');
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Network error: ' + error.message);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-content">
        <div className="auth-form">
          <h2 className="mb-3">Welcome Back</h2>
          <p className="text-muted mb-4">Welcome back! Please enter your details.</p>
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                id="email"
                placeholder="Enter your email"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                id="password"
                placeholder="Enter your password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="institute">Institute</label>
              <input
                type="text"
                className={`form-control ${instituteError ? 'is-invalid' : ''}`}
                id="institute"
                placeholder="Enter your institute name"
                aria-label="Institute"
                value={institute}
                onChange={(e) => setInstitute(e.target.value)}
              />
              {instituteError && <div className="invalid-feedback">{instituteError}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="userType">I am a:</label>
              <select
                id="userType"
                className="form-control"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Casual User">Casual User</option>
              </select>
            </div>
            <div className="form-group form-check mb-3">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <button type="submit" className="btn btn-success w-100 mb-3">Login</button>
            <div className="text-center">
              <button type="button" className="btn btn-link d-block mb-3">Forgot password?</button>
              <p className="mt-3">Don't have an account? <button type="button" className="btn btn-link" onClick={() => navigate('/signup')}>Sign up for free!</button></p>
            </div>
          </form>
        </div>
        <div className="auth-image">
          <img src={pic1} alt="Decorative plant" /> 
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
