import { useState } from 'react';
import { postLogin } from '../api';
import { useNavigate } from 'react-router-dom';

const MyInfo = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await postLogin(id, pw);
      setMessage(`Welcome, ${response.name}`);
    } catch (error) {
      setMessage('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">My Info</h1>
      <div className="w-full max-w-xs">
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </div>
      {message && <p className="mt-4 text-lg text-green-500">{message}</p>}
      <button onClick={handleSignUp} className="btn btn-secondary w-full mt-4">
        Sign Up
      </button>
    </div>
  );
};

export default MyInfo;
