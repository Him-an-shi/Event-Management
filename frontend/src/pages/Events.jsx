import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../services/api';
import Alert from '../components/Alert';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventService.getAllEvents();
      if (response.success) {
        setEvents(response.data || []);
      } else {
        setAlert({ message: 'Failed to load events', type: 'error' });
      }
    } catch (error) {
      setAlert({ message: 'Error loading events', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (eventId) => {
    navigate(`/book/${eventId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Available Events</h2>

        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}

        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-xl text-gray-600">No events available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.event_id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                  <h3 className="text-xl font-bold text-white">{event.event_name}</h3>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">📅 Date:</span> {event.date}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">📍 Venue:</span> {event.venue}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">💺 Available Seats:</span> {event.available_seats}/{event.total_seats}
                    </p>
                    {event.price > 0 && (
                      <p className="text-gray-600">
                        <span className="font-semibold">💰 Price:</span> ${event.price}
                      </p>
                    )}
                  </div>

                  {event.description && (
                    <p className="text-gray-700 mb-4 text-sm">{event.description}</p>
                  )}

                  <div className="mt-4">
                    {event.available_seats > 0 ? (
                      <button
                        onClick={() => handleBookClick(event.event_id)}
                        className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700"
                      >
                        Book Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-400 text-white py-2 rounded font-semibold cursor-not-allowed"
                      >
                        Sold Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
