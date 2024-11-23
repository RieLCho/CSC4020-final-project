import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    navigate('/login');
  };
  return (
    <div className="navbar bg-base-100 shadow-lg font-gyeonggi-title text-base sm:text-lg md:text-xl lg:text-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            {/* 햄버거 메뉴 아이콘 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/students">Student</Link>
            </li>
            <li>
              <Link to="/myinfo">My Info</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          JiniArchive
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li>
            {localStorage.getItem('isLoggedIn') ? (
              <button onClick={handleLogout} className="btn btn-secondary ml-4">
                <span className="material-icons">logout</span>
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary ml-4">
                <span className="material-icons">login</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
