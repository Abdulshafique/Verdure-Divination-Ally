import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Pic2 from '../Assets/1.jpeg';

const SignUp = ({ testPassed, setTestPassed }) => {
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('Student');
  const [institute, setInstitute] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [instituteError, setInstituteError] = useState('');
  const navigate = useNavigate();

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

    if (!fname) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!lname) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

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

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (institute.trim() !== '') {
      setInstituteError('');
    }

    const data = { fname, lname, email, password, confirmPassword, userType, institute };

    if (isValid) {
      if (userType === 'Teacher') {
        setTestPassed(false);
        navigate('/test', { state: { formData: data } });
      } else {
        const url = userType === 'Student'
          ? 'http://localhost:8080/studentsignup'
          : 'http://localhost:8080/usersignup';

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            console.log('Sign up successful');
            navigate('/login');
          } else {
            const errorData = await response.json();
            console.error('Sign up failed', errorData);
            alert('Sign up failed: ' + (errorData.message || 'Unknown error'));
          }
        } catch (error) {
          console.error('Network error:', error);
          alert('Network error: ' + error.message);
        }
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-content">
        <div className="auth-form signup-form">
          <h2 className="mb-3">Sign Up</h2>
          <p className="text-muted mb-4">Create your account by filling in the details below.</p>
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className={`form-control ${firstNameError ? 'is-invalid' : ''}`}
                id="firstName"
                placeholder="Enter your first name"
                aria-label="First Name"
                value={fname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {firstNameError && <div className="invalid-feedback">{firstNameError}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className={`form-control ${lastNameError ? 'is-invalid' : ''}`}
                id="lastName"
                placeholder="Enter your last name"
                aria-label="Last Name"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {lastNameError && <div className="invalid-feedback">{lastNameError}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                id="signup-email"
                placeholder="Enter your email"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                id="signup-password"
                placeholder="Enter your password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
                id="confirm-password"
                placeholder="Confirm your password"
                aria-label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
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
            <button type="submit" className="btn btn-success w-100 mb-3">Sign Up</button>
            <div className="text-center">
              <p className="mt-3">Already have an account? <button type="button" className="btn btn-link" onClick={() => navigate('/login')}>Login</button></p>
            </div>
          </form>
        </div>
        <div className="auth-image">
          <img src={Pic2} alt="Decorative plant" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
