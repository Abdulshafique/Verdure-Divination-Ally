import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './Components/Navbar';
import Home from './Components/Home';
import Plants from './Components/Plants';
import Upload from './Components/Upload';
import Profile from './Components/Profile';
import LoginPage from './Components/Login';
import SignUp from './Components/Signup';
import Test from './Components/Test';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  const [testPassed, setTestPassed] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp testPassed={testPassed} setTestPassed={setTestPassed} />} />
          <Route path="/test" element={<Test setTestPassed={setTestPassed} />} />
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <Upload />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
