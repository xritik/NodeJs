import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import Missing from './Missing';
import { useState } from 'react';

function App() {
  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setLoginUser={setLoginUser} navigate={navigate} />} />
        <Route path="/login" element={<Login setLoginUser={setLoginUser} navigate={navigate} />} />
        <Route path="/sign-in" element={<SignIn setLoginUser={setLoginUser} navigate={navigate} />} />
        <Route path="/dashboard" element={<Dashboard loginUser={loginUser} />} />
        <Route path='*' element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
