# Event Ticket Booking System

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
