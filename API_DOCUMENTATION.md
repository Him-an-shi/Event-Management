# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Response Format

All endpoints return JSON with the following structure:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": {}  // Optional, contains response data
}
```

---

## Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Registration successful. Please login.",
  "data": null
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Email already exists",
  "data": null
}
```

**Status Codes:**
- 201: Registration successful
- 400: Invalid input
- 409: Email already exists
- 500: Server error

---

### 2. Login User
**Endpoint:** `POST /login`

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user_id": 1,
    "name": "Admin User",
    "is_admin": true
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid email or password",
  "data": null
}
```

**Status Codes:**
- 200: Login successful
- 400: Missing fields
- 401: Invalid credentials
- 500: Server error

---

### 3. Logout User
**Endpoint:** `POST /logout`

**Request:** (No body required)

**Response:**
```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

**Status Codes:**
- 200: Logout successful
- 500: Server error

---

### 4. Check Authentication
**Endpoint:** `GET /check-auth`

**Request:** (No body required)

**Response (Authenticated):**
```json
{
  "success": true,
  "message": "User authenticated",
  "data": {
    "user_id": 1,
    "name": "Admin User",
    "is_admin": true
  }
}
```

**Response (Not Authenticated):**
```json
{
  "success": false,
  "message": "Not authenticated",
  "data": null
}
```

**Status Codes:**
- 200: User is authenticated
- 401: User not authenticated
- 500: Server error

---

## Events Endpoints

### 5. Get All Events
**Endpoint:** `GET /events`

**Request:** (No body required)

**Response:**
```json
{
  "success": true,
  "message": "Events retrieved successfully",
  "data": [
    {
      "event_id": 1,
      "event_name": "Concert Night",
      "date": "2024-12-15",
      "venue": "City Hall",
      "description": "An amazing live concert",
      "available_seats": 150,
      "total_seats": 200,
      "price": 50.00
    },
    {
      "event_id": 2,
      "event_name": "Tech Conference",
      "date": "2024-12-20",
      "venue": "Convention Center",
      "description": "Learn about latest tech",
      "available_seats": 200,
      "total_seats": 300,
      "price": 100.00
    }
  ]
}
```

**Status Codes:**
- 200: Success
- 500: Server error

---

### 6. Get Single Event
**Endpoint:** `GET /events/<event_id>`

**Request:** (No body required)

**Response:**
```json
{
  "success": true,
  "message": "Event retrieved successfully",
  "data": {
    "event_id": 1,
    "event_name": "Concert Night",
    "date": "2024-12-15",
    "venue": "City Hall",
    "description": "An amazing live concert",
    "available_seats": 150,
    "total_seats": 200,
    "price": 50.00
  }
}
```

**Status Codes:**
- 200: Success
- 404: Event not found
- 500: Server error

---

### 7. Add Event (Admin Only)
**Endpoint:** `POST /add-event`

**Authentication:** Required

**Request:**
```json
{
  "event_name": "New Concert",
  "date": "2024-12-30",
  "venue": "Music Hall",
  "description": "Amazing concert event",
  "total_seats": 300,
  "price": 60.00
}
```

**Response:**
```json
{
  "success": true,
  "message": "Event added successfully",
  "data": {
    "event_id": 5
  }
}
```

**Status Codes:**
- 201: Event created
- 400: Invalid input
- 401: Not authenticated
- 403: Admin access required
- 500: Server error

---

### 8. Update Event (Admin Only)
**Endpoint:** `PUT /update-event/<event_id>`

**Authentication:** Required

**Request:**
```json
{
  "event_name": "Updated Concert",
  "price": 75.00,
  "total_seats": 400
}
```

**Response:**
```json
{
  "success": true,
  "message": "Event updated successfully",
  "data": null
}
```

**Status Codes:**
- 200: Success
- 401: Not authenticated
- 403: Admin access required
- 404: Event not found
- 500: Server error

---

### 9. Delete Event (Admin Only)
**Endpoint:** `DELETE /delete-event/<event_id>`

**Authentication:** Required

**Request:** (No body required)

**Response:**
```json
{
  "success": true,
  "message": "Event deleted successfully",
  "data": null
}
```

**Status Codes:**
- 200: Success
- 401: Not authenticated
- 403: Admin access required
- 404: Event not found
- 500: Server error

---

## Booking Endpoints

### 10. Book Tickets
**Endpoint:** `POST /book`

**Authentication:** Required

**Request:**
```json
{
  "event_id": 1,
  "tickets": 5
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Booking confirmed successfully",
  "data": {
    "booking_id": 42,
    "event_name": "Concert Night",
    "tickets": 5
  }
}
```

**Response (Error - Not enough seats):**
```json
{
  "success": false,
  "message": "Only 10 seats available",
  "data": null
}
```

**Status Codes:**
- 201: Booking successful
- 400: Invalid input or not enough seats
- 401: Not authenticated
- 404: Event not found
- 500: Server error

---

### 11. Get User Bookings
**Endpoint:** `GET /bookings`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "booking_id": 1,
      "user_id": 1,
      "event_id": 1,
      "tickets": 5,
      "booking_date": "2024-12-01 10:30:00",
      "status": "confirmed",
      "event_name": "Concert Night",
      "date": "2024-12-15",
      "venue": "City Hall",
      "price": 50.00
    }
  ]
}
```

**Status Codes:**
- 200: Success
- 401: Not authenticated
- 500: Server error

---

### 12. Get Single Booking
**Endpoint:** `GET /booking/<booking_id>`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Booking retrieved successfully",
  "data": {
    "booking_id": 1,
    "user_id": 1,
    "event_id": 1,
    "tickets": 5,
    "booking_date": "2024-12-01 10:30:00",
    "status": "confirmed",
    "event_name": "Concert Night",
    "date": "2024-12-15",
    "venue": "City Hall",
    "price": 50.00
  }
}
```

**Status Codes:**
- 200: Success
- 401: Not authenticated
- 404: Booking not found
- 500: Server error

---

## Error Codes & Messages

| Code | Status | Meaning |
|------|--------|---------|
| 400 | Bad Request | Invalid input or validation failed |
| 401 | Unauthorized | Not authenticated or invalid credentials |
| 403 | Forbidden | Admin access required |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Email already exists |
| 500 | Server Error | Internal server error |

---

## Usage Examples

### Example 1: Complete User Journey

```bash
# 1. Register
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'

# 2. Login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}' \
  -c cookies.txt

# 3. Get Events
curl -X GET http://localhost:5000/api/events \
  -b cookies.txt

# 4. Book Tickets
curl -X POST http://localhost:5000/api/book \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"event_id":1,"tickets":3}'

# 5. View Bookings
curl -X GET http://localhost:5000/api/bookings \
  -b cookies.txt

# 6. Logout
curl -X POST http://localhost:5000/api/logout \
  -b cookies.txt
```

---

## Rate Limiting

Currently, no rate limiting is implemented. This should be added in production.

## CORS

CORS is enabled for localhost development. Update in production with specific origins.

## Notes

1. All timestamps are in UTC
2. Seat availability is checked in real-time
3. Session-based authentication (cookies)
4. All inputs are validated on both frontend and backend
5. Parameterized queries prevent SQL injection
