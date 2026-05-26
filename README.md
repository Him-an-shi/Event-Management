# Event Ticket Booking System

<<<<<<< HEAD
A complete full-stack event ticket booking system with React frontend and Flask REST API backend.

## Project Structure

```
DBMS_mini_project/
├── backend/                 # Flask REST API
│   ├── app.py              # Main Flask application
│   ├── config.py           # Configuration file
│   ├── database.py         # Database connection and initialization
│   └── requirements.txt    # Python dependencies
├── frontend/               # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Tailwind CSS
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.js      # Vite configuration
│   └── index.html          # HTML template
├── database_setup.sql      # Database initialization script
└── README.md               # This file
```

## Features

### User Features
- ✅ User Registration and Login
- ✅ View all available events
- ✅ Book tickets with seat validation
- ✅ View personal bookings
- ✅ Session management

### Admin Features
- ✅ Add new events
- ✅ Update event details
- ✅ Delete events
- ✅ View all bookings
- ✅ Manage system

### System Features
- ✅ Real-time seat availability
- ✅ Prevent overbooking
- ✅ Automatic seat reduction after booking
- ✅ RESTful API with proper error handling
- ✅ Responsive design with Tailwind CSS
- ✅ Session-based authentication

## Technology Stack

### Frontend
- React 18.2
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (routing)
- Axios (HTTP client)

### Backend
- Python 3.8+
- Flask (REST API framework)
- Flask-CORS (Cross-Origin Resource Sharing)
- MySQL Connector Python (database)

### Database
- MySQL 5.7+

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- MySQL Server running
- npm or yarn

## Installation & Setup

### Step 1: Database Setup

1. Make sure MySQL is running
2. Run the database setup script:

```bash
mysql -u root -p < database_setup.sql
```

Or manually:
1. Open MySQL command line
2. Copy and paste the content from `database_setup.sql`
3. Execute the commands

**Demo Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

### Step 2: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Update database credentials in `config.py` if needed:
```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'your_password',  # Change this
    'database': 'event_db'
}
```

4. Run the Flask app:
```bash
python app.py
```

Backend will be available at: `http://localhost:5000`

### Step 3: Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/check-auth` - Check authentication status

### Events
- `GET /api/events` - Get all events
- `GET /api/events/<id>` - Get specific event
- `POST /api/add-event` - Add new event (Admin)
- `PUT /api/update-event/<id>` - Update event (Admin)
- `DELETE /api/delete-event/<id>` - Delete event (Admin)

### Bookings
- `POST /api/book` - Book tickets
- `GET /api/bookings` - Get user bookings
- `GET /api/booking/<id>` - Get specific booking

## Testing

### Test Case 1: User Registration
1. Go to `/register`
2. Fill in name, email, password
3. Click Register
4. Expected: User created successfully

### Test Case 2: User Login
1. Go to `/login`
2. Use credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Expected: Redirected to dashboard

### Test Case 3: View Events
1. Login with valid credentials
2. Click "View Events"
3. Expected: Display all available events with seat count

### Test Case 4: Book Tickets (Valid)
1. Login with user account
2. Click "View Events"
3. Select an event and click "Book Now"
4. Enter number of tickets less than available
5. Click "Confirm Booking"
6. Expected: Booking confirmed, seats reduced

### Test Case 5: Book Tickets (Invalid)
1. Login with user account
2. Click "View Events"
3. Select an event with limited seats
4. Try to book more tickets than available
5. Expected: Error message "Not enough seats available"

### Test Case 6: Admin Add Event
1. Login with admin account (admin@example.com)
2. Click "Admin Panel"
3. Click "+ Add New Event"
4. Fill in event details
5. Click "Add Event"
6. Expected: Event created and appears in events list

### Test Case 7: View Bookings
1. Login with user account that has bookings
2. Click "My Bookings"
3. Expected: Display all user bookings with details

## Error Handling

The system handles the following errors:
- Invalid email/password during login
- Email already exists during registration
- Insufficient seats for booking
- Event not found
- Unauthorized access (non-admin trying to add event)
- Database connection errors
- Session expiration

## Security Features

- ✅ Parameterized queries to prevent SQL injection
- ✅ Session-based authentication
- ✅ CORS enabled for frontend-backend communication
- ✅ Input validation on both frontend and backend
- ✅ Admin-only route protection

## Future Enhancements

1. Password hashing with bcrypt
2. JWT token authentication
3. Email verification
4. Payment integration
5. Ticket cancellation with refunds
6. Email notifications
7. Advanced analytics dashboard
8. Multiple event categories
9. Search and filter functionality
10. Rating and reviews system

## Troubleshooting

### MySQL Connection Error
- Ensure MySQL is running
- Check database credentials in `config.py`
- Verify database exists: `event_db`

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:5000`
- Check CORS is enabled in Flask
- Verify proxy configuration in `vite.config.js`

### Port already in use
- Backend (5000): `lsof -i :5000` then kill process
- Frontend (3000): `lsof -i :3000` then kill process

## File Structure Details

```
backend/
├── app.py              # All REST API routes and logic
├── config.py           # Database and app configuration
├── database.py         # Database connection management
└── requirements.txt    # Python package dependencies

frontend/src/
├── components/
│   ├── Navbar.jsx      # Navigation component
│   ├── Alert.jsx       # Alert/notification component
│   └── ProtectedRoute.jsx  # Route protection wrapper
├── pages/
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Dashboard.jsx   # User dashboard
│   ├── Events.jsx      # Events listing page
│   ├── Booking.jsx     # Ticket booking page
│   ├── Bookings.jsx    # User bookings page
│   └── AdminPanel.jsx  # Admin management panel
├── services/
│   └── api.js          # Axios API service
├── App.jsx             # Main app component with routing
└── main.jsx            # React entry point
```

## Code Quality

- ✅ Clean, readable code with proper indentation
- ✅ Comprehensive comments throughout
- ✅ Modular component structure
- ✅ Error handling at every level
- ✅ Proper state management with React hooks
- ✅ Consistent naming conventions
- ✅ DRY (Don't Repeat Yourself) principles

## Performance Considerations

1. Database queries optimized with indexes
2. Lazy loading components
3. Efficient state management
4. Minimal API calls
5. CSS optimized with Tailwind

## License

MIT License - Feel free to use this project for educational purposes.

## Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Happy Coding! 🚀**
=======
A web-based Event Ticket Booking System developed using **Python Flask** and **MySQL** that allows users to browse events, select seats, and book tickets online. The system also includes an admin dashboard for event management and booking monitoring.

---

# Features

## User Features
- User Registration and Login
- View Available Events
- View Event Details
- Seat Selection System
- Ticket Booking
- Booking History

## Admin Features
- Admin Login
- Add New Events
- Edit Existing Events
- Delete Events
- View All Bookings

---

# Technologies Used

## Frontend
- HTML
- CSS
- Bootstrap
- JavaScript

## Backend
- Python (Flask)

## Database
- MySQL

## Testing
- Manual Testing
- Selenium Automation Testing

---

# Project Structure

event-booking/

│

├── app.py

├── database.sql

├── requirements.txt

│

├── static/

│   ├── css/

│   │   └── style.css

│   └── js/

│       └── seats.js

│

├── templates/

│   ├── base.html

│   ├── login.html

│   ├── register.html

│   ├── events.html

│   ├── booking.html

│   ├── history.html

│   ├── admin_login.html

│   ├── admin_dashboard.html

│   └── add_event.html

│

└── tests/

    └── selenium_tests.py

---

# Database Schema

USERS(user_id, name, email, password)

EVENTS(event_id, title, date, venue, price, total_seats)

SEATS(seat_id, event_id, status)

BOOKINGS(booking_id, user_id, event_id, booking_date)

BOOKING_DETAILS(detail_id, booking_id, seat_id)

---

# Installation and Setup

## Step 1: Clone or Download Project

Download and extract the project folder.

---

## Step 2: Install Required Packages

Open terminal inside project folder and run:

pip install -r requirements.txt

---

## Step 3: Configure MySQL Database

Open MySQL terminal and run:

CREATE DATABASE event_booking;

USE event_booking;

SOURCE database.sql;

---

## Step 4: Configure Database Connection

Open `app.py` and update:

DB_CONFIG = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "YOUR_PASSWORD",
    "database": "event_booking"
}

---

## Step 5: Run Application

python app.py

---

## Step 6: Open Browser

Visit:

---

# Default Admin Credentials

Email: admin@event.com

Password: admin123

---

# Seat Booking Logic

- Users can select available seats
- Booked seats cannot be selected again
- Seat status updates automatically after booking
- Prevents double booking using database validation

---

# Testing

## Manual Testing
- User Registration
- Login Validation
- Event Booking
- Admin Operations
- Booking History

## Automation Testing

Selenium was used for:
- Login Testing
- Booking Workflow Testing

Run automation tests:

python tests/selenium_tests.py

---

# Future Enhancements

- Online Payment Integration
- Email Notifications
- QR Code Tickets
- Mobile Application
- Real-time Notifications

---

# Conclusion

The Event Ticket Booking System provides a simple and efficient platform for managing event bookings. The project demonstrates practical implementation of DBMS concepts, normalization, frontend-backend integration, and software engineering principles using Flask and MySQL.

---

# Developed By

- Himanshi Pathak

---

# License

This project is developed for educational purposes only.
>>>>>>> 3d136f6a8edcae64916e70e4de9f8e234d7bf922
