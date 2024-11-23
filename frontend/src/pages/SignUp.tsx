import { useState } from 'react';
import { postSignUp } from '../api';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      await postSignUp(id, pw, name, email);
      setMessage('Sign up successful');
      navigate('/login');
    } catch (error) {
      setMessage('Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
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
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <button
          onClick={handleSignUp}
          disabled={isLoading}
          className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </div>
      {message && <p className="mt-4 text-lg text-green-500">{message}</p>}
    </div>
  );
};

export default SignUp;
