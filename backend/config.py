# Configuration file for Flask backend

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'golden',  # Change this to your MySQL password
    'database': 'event_db'
}

# Flask configuration
SECRET_KEY = 'event_booking_system_secret_key_change_in_production'
DEBUG = True
