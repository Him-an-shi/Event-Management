import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService, bookingService } from '../services/api';
import Alert from '../components/Alert';

export default function Booking() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await eventService.getEvent(eventId);
      if (response.success) {
        setEvent(response.data);
      } else {
        setAlert({ message: 'Event not found', type: 'error' });
      }
    } catch (error) {
      setAlert({ message: 'Error loading event details', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tickets || tickets <= 0) {
      setAlert({ message: 'Please enter a valid number of tickets', type: 'error' });
      return;
    }

    if (tickets > event.available_seats) {
      setAlert({ message: `Only ${event.available_seats} seats available`, type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      const response = await bookingService.bookTickets(eventId, tickets);
      if (response.success) {
        setAlert({ message: 'Booking successful! Redirecting to bookings...', type: 'success' });
        setTimeout(() => navigate('/bookings'), 1500);
      } else {
        setAlert({ message: response.message || 'Booking failed', type: 'error' });
      }
    } catch (error) {
      setAlert({ message: 'Error booking tickets. Please try again.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading event details...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <Alert message="Event not found" type="error" />
          <button
            onClick={() => navigate('/events')}
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Book Tickets</h2>

          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          )}

          {/* Event Details */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 border-l-4 border-blue-600">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">{event.event_name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">📅 Date:</span> {event.date}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">📍 Venue:</span> {event.venue}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">💺 Available Seats:</span> {event.available_seats}/{event.total_seats}
                </p>
                {event.price > 0 && (
                  <p className="text-gray-600">
                    <span className="font-semibold">💰 Price per ticket:</span> ${event.price}
                  </p>
                )}
              </div>
            </div>
            {event.description && (
              <p className="text-gray-700 mt-4">{event.description}</p>
            )}
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Number of Tickets
              </label>
              <input
                type="number"
                min="1"
                max={event.available_seats}
                value={tickets}
                onChange={(e) => setTickets(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                disabled={submitting}
              />
              <p className="text-gray-600 text-sm mt-1">Maximum: {event.available_seats} tickets</p>
            </div>

            {/* Cost Summary */}
            {event.price > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tickets:</span>
                  <span>{tickets}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Price per ticket:</span>
                  <span>${event.price}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">${(event.price * tickets).toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 disabled:bg-gray-400"
              >
                {submitting ? 'Processing...' : 'Confirm Booking'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/events')}
                className="flex-1 bg-gray-600 text-white py-3 rounded font-semibold hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
