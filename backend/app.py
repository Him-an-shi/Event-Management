"""
Event Ticket Booking System - Flask REST API Backend
This module provides REST API endpoints for the booking system.
"""

from flask import Flask, request, jsonify, session
from flask_cors import CORS
from config import DB_CONFIG, SECRET_KEY
from database import get_db_connection, init_database
import mysql.connector
from datetime import datetime
import json

app = Flask(__name__)
app.secret_key = SECRET_KEY
CORS(app)  # Enable CORS for frontend communication

# ==================== HELPER FUNCTIONS ====================

def get_response(success, message, data=None, status_code=200):
    """Standard response format"""
    response = {
        'success': success,
        'message': message
    }
    if data is not None:
        response['data'] = data
    return jsonify(response), status_code

def is_authenticated():
    """Check if user is logged in"""
    return 'user_id' in session

def get_current_user():
    """Get current logged-in user ID"""
    return session.get('user_id')

# ==================== AUTHENTICATION ROUTES ====================

@app.route('/api/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()

        # Validation
        if not name or not email or not password:
            return get_response(False, 'All fields are required', None, 400)
        
        if len(password) < 6:
            return get_response(False, 'Password must be at least 6 characters', None, 400)

        conn = get_db_connection()
        cursor = conn.cursor()
        
        try:
            cursor.execute(
                "INSERT INTO Users (name, email, password) VALUES (%s, %s, %s)",
                (name, email, password)
            )
            conn.commit()
            return get_response(True, 'Registration successful. Please login.', None, 201)
        except mysql.connector.IntegrityError:
            return get_response(False, 'Email already exists', None, 409)
        finally:
            cursor.close()
            conn.close()
    
    except Exception as e:
        return get_response(False, f'Registration error: {str(e)}', None, 500)

@app.route('/api/login', methods=['POST'])
def login():
    """User login"""
    try:
        data = request.get_json()
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()

        if not email or not password:
            return get_response(False, 'Email and password are required', None, 400)

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT user_id, name, is_admin FROM Users WHERE email = %s AND password = %s",
            (email, password)
        )
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            session['user_id'] = user[0]
            session['user_name'] = user[1]
            session['is_admin'] = user[2]
            
            return get_response(True, 'Login successful', {
                'user_id': user[0],
                'name': user[1],
                'is_admin': user[2]
            }, 200)
        else:
            return get_response(False, 'Invalid email or password', None, 401)
    
    except Exception as e:
        return get_response(False, f'Login error: {str(e)}', None, 500)

@app.route('/api/logout', methods=['POST'])
def logout():
    """User logout"""
    session.clear()
    return get_response(True, 'Logout successful', None, 200)

@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    """Check if user is authenticated"""
    if is_authenticated():
        return get_response(True, 'User authenticated', {
            'user_id': get_current_user(),
            'name': session.get('user_name'),
            'is_admin': session.get('is_admin')
        }, 200)
    else:
        return get_response(False, 'Not authenticated', None, 401)

# ==================== EVENTS ROUTES ====================

@app.route('/api/events', methods=['GET'])
def get_events():
    """Get all events"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT event_id, event_name, date, venue, description, available_seats, total_seats, price FROM Events ORDER BY date ASC"
        )
        events = cursor.fetchall()
        cursor.close()
        conn.close()

        # Convert dates to strings for JSON
        for event in events:
            event['date'] = event['date'].strftime('%Y-%m-%d') if event['date'] else None

        return get_response(True, 'Events retrieved successfully', events, 200)
    
    except Exception as e:
        return get_response(False, f'Error fetching events: {str(e)}', None, 500)

@app.route('/api/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    """Get a specific event"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT event_id, event_name, date, venue, description, available_seats, total_seats, price FROM Events WHERE event_id = %s",
            (event_id,)
        )
        event = cursor.fetchone()
        cursor.close()
        conn.close()

        if not event:
            return get_response(False, 'Event not found', None, 404)
        
        event['date'] = event['date'].strftime('%Y-%m-%d') if event['date'] else None
        return get_response(True, 'Event retrieved successfully', event, 200)
    
    except Exception as e:
        return get_response(False, f'Error fetching event: {str(e)}', None, 500)

@app.route('/api/add-event', methods=['POST'])
def add_event():
    """Add a new event (Admin only)"""
    if not is_authenticated():
        return get_response(False, 'Not authenticated', None, 401)
    
    if not session.get('is_admin'):
        return get_response(False, 'Admin access required', None, 403)
    
    try:
        data = request.get_json()
        event_name = data.get('event_name', '').strip()
        date = data.get('date', '').strip()
        venue = data.get('venue', '').strip()
        description = data.get('description', '').strip()
        total_seats = data.get('total_seats')
        price = data.get('price', 0)

        # Validation
        if not event_name or not date or not venue or not total_seats:
            return get_response(False, 'All required fields must be provided', None, 400)
        
        if total_seats <= 0:
            return get_response(False, 'Total seats must be greater than 0', None, 400)

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Events (event_name, date, venue, description, total_seats, available_seats, price) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (event_name, date, venue, description, total_seats, total_seats, price)
        )
        conn.commit()
        event_id = cursor.lastrowid
        cursor.close()
        conn.close()

        return get_response(True, 'Event added successfully', {'event_id': event_id}, 201)
    
    except Exception as e:
        return get_response(False, f'Error adding event: {str(e)}', None, 500)

@app.route('/api/update-event/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    """Update an event (Admin only)"""
    if not is_authenticated():
        return get_response(False, 'Not authenticated', None, 401)
    
    if not session.get('is_admin'):
        return get_response(False, 'Admin access required', None, 403)
    
    try:
        data = request.get_json()
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT total_seats, available_seats FROM Events WHERE event_id = %s", (event_id,))
        event = cursor.fetchone()
        
        if not event:
            cursor.close()
            conn.close()
            return get_response(False, 'Event not found', None, 404)

        # Build update query dynamically
        update_fields = []
        update_values = []
        
        if 'event_name' in data:
            update_fields.append('event_name = %s')
            update_values.append(data['event_name'])
        if 'date' in data:
            update_fields.append('date = %s')
            update_values.append(data['date'])
        if 'venue' in data:
            update_fields.append('venue = %s')
            update_values.append(data['venue'])
        if 'description' in data:
            update_fields.append('description = %s')
            update_values.append(data['description'])
        if 'price' in data:
            update_fields.append('price = %s')
            update_values.append(data['price'])
        
        # If total_seats is updated, calculate new available_seats
        if 'total_seats' in data:
            new_total = data['total_seats']
            booked = event[0] - event[1]  # total - available = booked
            new_available = new_total - booked
            update_fields.append('total_seats = %s')
            update_fields.append('available_seats = %s')
            update_values.extend([new_total, max(0, new_available)])

        if update_fields:
            update_values.append(event_id)
            query = f"UPDATE Events SET {', '.join(update_fields)} WHERE event_id = %s"
            cursor.execute(query, update_values)
            conn.commit()

        cursor.close()
        conn.close()
        return get_response(True, 'Event updated successfully', None, 200)
    
    except Exception as e:
        return get_response(False, f'Error updating event: {str(e)}', None, 500)

@app.route('/api/delete-event/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    """Delete an event (Admin only)"""
    if not is_authenticated():
        return get_response(False, 'Not authenticated', None, 401)
    
    if not session.get('is_admin'):
        return get_response(False, 'Admin access required', None, 403)
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Events WHERE event_id = %s", (event_id,))
        conn.commit()
        cursor.close()
        conn.close()

        return get_response(True, 'Event deleted successfully', None, 200)
    
    except Exception as e:
        return get_response(False, f'Error deleting event: {str(e)}', None, 500)

# ==================== BOOKING ROUTES ====================

@app.route('/api/book', methods=['POST'])
def book_tickets():
    """Book tickets for an event"""
    if not is_authenticated():
        return get_response(False, 'Not authenticated', None, 401)
    
    try:
        data = request.get_json()
        event_id = data.get('event_id')
        tickets = data.get('tickets')
        
        if not event_id or not tickets:
            return get_response(False, 'Event ID and number of tickets are required', None, 400)
        
        if tickets <= 0:
            return get_response(False, 'Number of tickets must be greater than 0', None, 400)

        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get event details
        cursor.execute("SELECT event_id, available_seats, event_name FROM Events WHERE event_id = %s", (event_id,))
        event = cursor.fetchone()
        
        if not event:
            cursor.close()
            conn.close()
            return get_response(False, 'Event not found', None, 404)
        
        if tickets > event[1]:  # available_seats
            cursor.close()
            conn.close()
            return get_response(False, f'Only {event[1]} seats available', None, 400)
        
        # Insert booking
        cursor.execute(
            "INSERT INTO Bookings (user_id, event_id, tickets) VALUES (%s, %s, %s)",
            (get_current_user(), event_id, tickets)
        )
        
        # Update available seats
        cursor.execute(
            "UPDATE Events SET available_seats = available_seats - %s WHERE event_id = %s",
            (tickets, event_id)
        )
        
        conn.commit()
        booking_id = cursor.lastrowid
        cursor.close()
        conn.close()

        return get_response(True, 'Booking confirmed successfully', {
            'booking_id': booking_id,
            'event_name': event[2],
            'tickets': tickets
        }, 201)
    
    except Exception as e:
        return get_response(False, f'Error booking tickets: {str(e)}', None, 500)

@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    """Get bookings for logged-in user"""
    if not is_authenticated():
        return get_response(False, 'Not authenticated', None, 401)
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT b.booking_id, b.user_id, b.event_id, b.tickets, b.booking_date, b.status,
                   e.event_name, e.date, e.venue, e.price
            FROM Bookings b
            JOIN Events e ON b.event_id = e.event_id
            WHERE b.user_id = %s
            ORDER BY b.booking_date DESC
        """, (get_current_user(),))
        
        bookings = cursor.fetchall()
        cursor.close()
        conn.close()

        # Convert dates to strings for JSON
        for booking in bookings:
            booking['booking_date'] = booking['booking_date'].strftime('%Y-%m-%d %H:%M:%S') if booking['booking_date'] else None
            booking['date'] = booking['date'].strftime('%Y-%m-%d') if booking['date'] else None

        return get_response(True, 'Bookings retrieved successfully', bookings, 200)
    
    except Exception as e:
        return get_response(False, f'Error fetching bookings: {str(e)}', None, 500)

@app.route('/api/booking/<int:booking_id>', methods=['GET'])
def get_booking(booking_id):
    """Get a specific booking"""
    if not is_authenticated():
        return get_response(False, 'Not authenticated', None, 401)
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT b.booking_id, b.user_id, b.event_id, b.tickets, b.booking_date, b.status,
                   e.event_name, e.date, e.venue, e.price
            FROM Bookings b
            JOIN Events e ON b.event_id = e.event_id
            WHERE b.booking_id = %s AND b.user_id = %s
        """, (booking_id, get_current_user()))
        
        booking = cursor.fetchone()
        cursor.close()
        conn.close()

        if not booking:
            return get_response(False, 'Booking not found', None, 404)

        booking['booking_date'] = booking['booking_date'].strftime('%Y-%m-%d %H:%M:%S') if booking['booking_date'] else None
        booking['date'] = booking['date'].strftime('%Y-%m-%d') if booking['date'] else None

        return get_response(True, 'Booking retrieved successfully', booking, 200)
    
    except Exception as e:
        return get_response(False, f'Error fetching booking: {str(e)}', None, 500)

# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    return get_response(False, 'Endpoint not found', None, 404)

@app.errorhandler(500)
def internal_error(error):
    return get_response(False, 'Internal server error', None, 500)

# ==================== INITIALIZATION ====================

if __name__ == '__main__':
    try:
        init_database()
        app.run(debug=True, host='localhost', port=5000)
    except Exception as e:
        print(f"Error starting application: {e}")
