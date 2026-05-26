import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-4xl font-bold text-blue-600 mb-2">Welcome, {user?.name}!</h2>
          <p className="text-gray-600">Manage your events and bookings here</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* View Events Card */}
          <Link to="/events" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-bold mb-2">View Events</h3>
            <p className="text-gray-600">Browse and book tickets for upcoming events</p>
          </Link>

          {/* My Bookings Card */}
          <Link to="/bookings" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-4xl mb-4">🎫</div>
            <h3 className="text-xl font-bold mb-2">My Bookings</h3>
            <p className="text-gray-600">View your confirmed bookings and details</p>
          </Link>

          {/* Admin Panel Card */}
          {user?.is_admin && (
            <Link to="/admin" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-2">Admin Panel</h3>
              <p className="text-gray-600">Manage events and view all bookings</p>
            </Link>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="text-gray-600 font-semibold">Email</p>
              <p className="text-gray-800">{user?.email}</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="text-gray-600 font-semibold">Account Type</p>
              <p className="text-gray-800">{user?.is_admin ? 'Administrator' : 'User'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
