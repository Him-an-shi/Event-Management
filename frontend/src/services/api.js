import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Error handler
const handleError = (error) => {
  if (error.response) {
    return error.response.data;
  }
  return { success: false, message: 'Network error' };
};

// Auth APIs
export const authService = {
  register: async (name, email, password) => {
    try {
      const response = await api.post('/register', { name, email, password });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/logout');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  checkAuth: async () => {
    try {
      const response = await api.get('/check-auth');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }
};

// Event APIs
export const eventService = {
  getAllEvents: async () => {
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  getEvent: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  addEvent: async (eventData) => {
    try {
      const response = await api.post('/add-event', eventData);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  updateEvent: async (eventId, eventData) => {
    try {
      const response = await api.put(`/update-event/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  deleteEvent: async (eventId) => {
    try {
      const response = await api.delete(`/delete-event/${eventId}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }
};

// Booking APIs
export const bookingService = {
  bookTickets: async (eventId, tickets) => {
    try {
      const response = await api.post('/book', { event_id: eventId, tickets });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  getBookings: async () => {
    try {
      const response = await api.get('/bookings');
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  getBooking: async (bookingId) => {
    try {
      const response = await api.get(`/booking/${bookingId}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }
};
