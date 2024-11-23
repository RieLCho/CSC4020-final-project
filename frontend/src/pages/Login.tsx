import { useEffect, useState } from 'react';
import { postLogin } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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
      localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 저장
      localStorage.setItem('userId', id); // 로그인 상태 저장
      localStorage.setItem('userName', response.name); // 사용자 이름 저장 (선택 사항)
    } catch (error) {
      setMessage('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  useEffect(() => {
    if (message) {
      alert(message);
      navigate('/');
    }
  }, [message, navigate]);

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="w-full"
        >
          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <button
          onClick={handleSignUp}
          className="btn btn-secondary w-full mt-4"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
