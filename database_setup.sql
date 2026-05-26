-- Database Setup Script for Event Ticket Booking System
-- Run this script in MySQL to initialize the database

-- Create database
CREATE DATABASE IF NOT EXISTS event_db;
USE event_db;

-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Events table
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
);

-- Create Bookings table
CREATE TABLE IF NOT EXISTS Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    tickets INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'confirmed',
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE
);

-- Insert demo data
-- Admin user
INSERT INTO Users (name, email, password, is_admin) VALUES 
('Admin User', 'admin@example.com', 'admin123', TRUE);

-- Regular users
INSERT INTO Users (name, email, password, is_admin) VALUES 
('John Doe', 'john@example.com', 'password123', FALSE),
('Jane Smith', 'jane@example.com', 'password123', FALSE);

-- Sample events
INSERT INTO Events (event_name, date, venue, description, total_seats, available_seats, price) VALUES 
('Concert Night', '2024-12-15', 'City Hall', 'An amazing live concert experience', 200, 200, 50.00),
('Tech Conference 2024', '2024-12-20', 'Convention Center', 'Learn about latest technologies', 300, 300, 100.00),
('Sports Championship', '2024-12-25', 'Sports Arena', 'Exciting sports championship finals', 500, 500, 75.00),
('Movie Premiere', '2024-12-28', 'Cinema Complex', 'Exclusive premiere of the latest blockbuster', 150, 150, 25.00);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_events_date ON Events(date);
CREATE INDEX idx_bookings_user ON Bookings(user_id);
CREATE INDEX idx_bookings_event ON Bookings(event_id);

-- Verify tables
SELECT 'Database initialized successfully!' as Status;
SHOW TABLES;
