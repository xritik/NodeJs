import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({navigate, setLoginUser}) => {
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = async () => {
      try {
          const response = await fetch('http://localhost:8080/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
          });

          const data = await response.json();
          if (response.ok) {
              setMessage(data.message); // Success message
              // Optionally, redirect the user to a dashboard or another page
              setLoginUser(username)
              navigate('/dashboard');
          } else {
              setMessage(data.message); // Error message
          }
      } catch (error) {
          console.error("Error logging in:", error);
          setMessage('An error occurred. Please try again.');
      }
    }


  return (
    <div className='login-section'>
      <h1>Login here!</h1>
      <form className="login-form" onSubmit={(e) => {e.preventDefault(); login()}}>

        <label>
          Username:
          <input 
              type="text" 
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
          />
        </label>

        <label>
          Password:
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </label>

        <div className="show-password">
            <label>
                Show Password
            </label>
            <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
            />
        </div>

        <button type="submit">Login</button>
      <div>Create new account? <Link to={'/sign-in'}> Sign in</Link></div>
      </form>
      {message && <p style={{marginTop: '10px'}}>{message}</p>}
    </div>
  );
};

export default Login;