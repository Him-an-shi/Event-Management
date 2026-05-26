import { useState, useEffect } from 'react';
import { eventService, bookingService } from '../services/api';
import Alert from '../components/Alert';

export default function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    event_name: '',
    date: '',
    venue: '',
    description: '',
    total_seats: '',
    price: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const eventsResponse = await eventService.getAllEvents();
      const bookingsResponse = await bookingService.getBookings();
      
      if (eventsResponse.success) {
        setEvents(eventsResponse.data || []);
      }
      if (bookingsResponse.success) {
        setBookings(bookingsResponse.data || []);
      }
    } catch (error) {
      setAlert({ message: 'Error loading data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    
    if (!formData.event_name || !formData.date || !formData.venue || !formData.total_seats) {
      setAlert({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    try {
      const response = await eventService.addEvent({
        event_name: formData.event_name,
        date: formData.date,
        venue: formData.venue,
        description: formData.description,
        total_seats: parseInt(formData.total_seats),
        price: parseFloat(formData.price) || 0
      });

      if (response.success) {
        setAlert({ message: 'Event added successfully', type: 'success' });
        setFormData({
          event_name: '',
          date: '',
          venue: '',
          description: '',
          total_seats: '',
          price: ''
        });
        setShowForm(false);
        fetchData();
      } else {
        setAlert({ message: response.message || 'Failed to add event', type: 'error' });
      }
    } catch (error) {
      setAlert({ message: 'Error adding event', type: 'error' });
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await eventService.deleteEvent(eventId);
      if (response.success) {
        setAlert({ message: 'Event deleted successfully', type: 'success' });
        fetchData();
      } else {
        setAlert({ message: response.message || 'Failed to delete event', type: 'error' });
      }
    } catch (error) {
      setAlert({ message: 'Error deleting event', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Admin Panel</h2>

        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-2 rounded font-semibold ${activeTab === 'events' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          >
            Manage Events
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-2 rounded font-semibold ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
          >
            View All Bookings
          </button>
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="mb-6 bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700"
              >
                + Add New Event
              </button>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4">Add New Event</h3>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="event_name"
                      placeholder="Event Name"
                      value={formData.event_name}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      name="venue"
                      placeholder="Venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="number"
                      name="total_seats"
                      placeholder="Total Seats"
                      value={formData.total_seats}
                      onChange={handleInputChange}
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="number"
                      name="price"
                      placeholder="Price (optional)"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <textarea
                    name="description"
                    placeholder="Description (optional)"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
                    >
                      Add Event
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="bg-gray-600 text-white px-6 py-2 rounded font-semibold hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div key={event.event_id} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-2">{event.event_name}</h3>
                  <div className="space-y-2 text-gray-600 mb-4">
                    <p>📅 {event.date}</p>
                    <p>📍 {event.venue}</p>
                    <p>💺 {event.available_seats}/{event.total_seats} seats</p>
                    {event.price > 0 && <p>💰 ${event.price}</p>}
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(event.event_id)}
                    className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700"
                  >
                    Delete Event
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Booking ID</th>
                  <th className="px-6 py-3 text-left">Event</th>
                  <th className="px-6 py-3 text-left">Tickets</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Booked Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking.booking_id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-3">#{booking.booking_id}</td>
                    <td className="px-6 py-3">{booking.event_name}</td>
                    <td className="px-6 py-3">{booking.tickets}</td>
                    <td className="px-6 py-3">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{booking.booking_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="p-6 text-center text-gray-600">
                No bookings yet
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
