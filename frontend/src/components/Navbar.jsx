import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold">
              🎫 Event Booking
            </Link>
            {user && (
              <div className="flex space-x-6">
                <Link to="/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
                <Link to="/events" className="hover:text-blue-200">
                  Events
                </Link>
                {user.is_admin && (
                  <Link to="/admin" className="hover:text-blue-200">
                    Admin Panel
                  </Link>
                )}
                <Link to="/bookings" className="hover:text-blue-200">
                  My Bookings
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200">
                  Login
                </Link>
                <Link to="/register" className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
