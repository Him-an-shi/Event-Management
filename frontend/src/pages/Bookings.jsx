import { useState, useEffect } from 'react';
import { bookingService } from '../services/api';
import Alert from '../components/Alert';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getBookings();
      if (response.success) {
        setBookings(response.data || []);
      } else {
        setAlert({ message: 'Failed to load bookings', type: 'error' });
      }
    } catch (error) {
      setAlert({ message: 'Error loading bookings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">My Bookings</h2>

        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-xl text-gray-600">You haven't booked any tickets yet.</p>
            <a
              href="/events"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
            >
              Browse Events
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking.booking_id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                  <h3 className="text-xl font-bold text-white">{booking.event_name}</h3>
                  <p className="text-green-100 text-sm">Booking ID: #{booking.booking_id}</p>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status</span>
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">📅 Event Date</span>
                      <span className="font-semibold">{booking.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">📍 Venue</span>
                      <span className="font-semibold">{booking.venue}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">🎫 Tickets</span>
                      <span className="font-semibold text-lg">{booking.tickets}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">📅 Booked On</span>
                      <span className="text-sm text-gray-600">{booking.booking_date}</span>
                    </div>
                    {booking.price > 0 && (
                      <div className="flex justify-between items-center border-t pt-3">
                        <span className="text-gray-600 font-semibold">💰 Total Cost</span>
                        <span className="font-bold text-lg text-green-600">${(booking.price * booking.tickets).toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
                    Download Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
