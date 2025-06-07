import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../services/firebase.config';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Task Manager</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/">Tasks</Link>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center">
            <ThemeToggle />
            {currentUser ? (
              <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Link className="btn btn-outline-light ms-3" to="/login">
                  Login
                </Link>
                <Link className="btn btn-light ms-2" to="/signup">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;