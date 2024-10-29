import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = ({navigate, setLoginUser}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const signIn = async () => {
    try{
      const response = await fetch('http://localhost:8080/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
      });
      const data = await response.json()
      if(response.ok){
        setMessage(data.message)
        setLoginUser(username)
        navigate('/dashboard')
      }else{
        setMessage(data.message)
      }
    }
    catch (err){
      console.log('Error in SignIn', err);
      setMessage('An error occurred, Please try again')
    }
  }

  return (
    <div className='login-section'>
      <h1>Sign in</h1>
      <form className="login-form" onSubmit={(e) => {e.preventDefault(); signIn()}}>

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
            name="password"
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

        <button type="submit">Sign in</button>
      <div>Already have account? <Link to={'/login'}> Login</Link></div>
      </form>
      {message && <p style={{marginTop: '10px'}}>{message}</p>}

    </div>
  );
};

export default SignIn;