# Database connection module
import mysql.connector
from config import DB_CONFIG

def get_db_connection():
    """Create and return a database connection"""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except mysql.connector.Error as err:
        if err.errno == 2003:
            raise Exception("Cannot connect to MySQL server. Make sure MySQL is running.")
        raise Exception(f"Database connection error: {err}")

def init_database():
    """Initialize database and create tables if they don't exist"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Create Users table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS Users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                is_admin BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create Events table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS Events (
                event_id INT AUTO_INCREMENT PRIMARY KEY,
                event_name VARCHAR(200) NOT NULL,
                date DATE NOT NULL,
                venue VARCHAR(200) NOT NULL,
                description TEXT,
                total_seats INT NOT NULL,
                available_seats INT NOT NULL,
                price DECIMAL(10, 2) DEFAULT 0.00,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create Bookings table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS Bookings (
                booking_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                event_id INT NOT NULL,
                tickets INT NOT NULL,
                booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(20) DEFAULT 'confirmed',
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE
            )
        ''')
        
        conn.commit()
        print("Database initialized successfully")
    except mysql.connector.Error as err:
        print(f"Database initialization error: {err}")
        raise
    finally:
        cursor.close()
        conn.close()
