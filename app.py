from flask import Flask, render_template, request, redirect, url_for, session, flash
import mysql.connector

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Change this to a secure key

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',  # Change if different
        password='golden',  # Add your MySQL password
        database='event_db'
    )

# Route for login page (root)
@app.route('/')
def index():
    return render_template('login.html')

# Register route
@app.route('/register', methods=['POST'])
def register():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']  # Note: In production, hash passwords

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO Users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
        conn.commit()
        flash('Registration successful! Please login.')
    except mysql.connector.IntegrityError:
        flash('Email already exists.')
    finally:
        cursor.close()
        conn.close()
    return redirect(url_for('index'))

# Login route
@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, name FROM Users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        session['user_id'] = user[0]
        session['name'] = user[1]
        return redirect(url_for('dashboard'))
    else:
        flash('Invalid email or password.')
        return redirect(url_for('index'))

# Dashboard route
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    return render_template('dashboard.html')

# Events route
@app.route('/events')
def events():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT event_id, event_name, date, venue, available_seats FROM Events")
    events = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('events.html', events=events)

# Add event route
@app.route('/add_event', methods=['GET', 'POST'])
def add_event():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    if request.method == 'POST':
        event_name = request.form['eventName']
        date = request.form['eventDate']
        venue = request.form['eventVenue']
        total_seats = int(request.form['totalSeats'])

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Events (event_name, date, venue, total_seats, available_seats) VALUES (%s, %s, %s, %s, %s)",
                       (event_name, date, venue, total_seats, total_seats))
        conn.commit()
        cursor.close()
        conn.close()
        flash('Event added successfully!')
        return redirect(url_for('events'))
    return render_template('add_event.html')

# Book tickets route
@app.route('/book/<int:event_id>', methods=['GET', 'POST'])
def book(event_id):
    if 'user_id' not in session:
        return redirect(url_for('index'))

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT event_name, date, venue, available_seats FROM Events WHERE event_id = %s", (event_id,))
    event = cursor.fetchone()

    if not event:
        cursor.close()
        conn.close()
        flash('Event not found.')
        return redirect(url_for('events'))

    if request.method == 'POST':
        tickets = int(request.form['numTickets'])
        if tickets > event[3]:
            flash('Not enough seats available.')
            cursor.close()
            conn.close()
            return render_template('book.html', event=event, event_id=event_id)

        # Insert booking
        cursor.execute("INSERT INTO Bookings (user_id, event_id, tickets, booking_date) VALUES (%s, %s, %s, CURDATE())",
                       (session['user_id'], event_id, tickets))
        # Update available seats
        cursor.execute("UPDATE Events SET available_seats = available_seats - %s WHERE event_id = %s", (tickets, event_id))
        conn.commit()
        flash('Booking successful!')
        cursor.close()
        conn.close()
        return redirect(url_for('dashboard'))

    cursor.close()
    conn.close()
    return render_template('book.html', event=event, event_id=event_id)

# View bookings route
@app.route('/bookings')
def bookings():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT b.booking_id, e.event_name, b.tickets, b.booking_date
        FROM Bookings b
        JOIN Events e ON b.event_id = e.event_id
        WHERE b.user_id = %s
        ORDER BY b.booking_date DESC
    """, (session['user_id'],))
    bookings = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('bookings.html', bookings=bookings)

# Logout route
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('name', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)