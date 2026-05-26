# Test Cases for Event Ticket Booking System

## Test Environment Setup
- Start Backend: `cd backend && python app.py`
- Start Frontend: `cd frontend && npm run dev`
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

---

## Authentication Tests

### TC-001: User Registration - Valid Data
**Steps:**
1. Navigate to http://localhost:3000/register
2. Fill in:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
3. Click Register

**Expected Result:** ✅ Success message, redirected to login page
**Actual Result:** [Fill during testing]

---

### TC-002: User Registration - Password Too Short
**Steps:**
1. Navigate to /register
2. Fill in:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "pass"
   - Confirm Password: "pass"
3. Click Register

**Expected Result:** ❌ Error "Password must be at least 6 characters"
**Actual Result:** [Fill during testing]

---

### TC-003: User Registration - Email Already Exists
**Steps:**
1. Navigate to /register
2. Fill in:
   - Name: "New User"
   - Email: "admin@example.com" (existing)
   - Password: "password123"
   - Confirm Password: "password123"
3. Click Register

**Expected Result:** ❌ Error "Email already exists"
**Actual Result:** [Fill during testing]

---

### TC-004: User Registration - Passwords Don't Match
**Steps:**
1. Navigate to /register
2. Fill in:
   - Name: "Test User"
   - Email: "unique@example.com"
   - Password: "password123"
   - Confirm Password: "different123"
3. Click Register

**Expected Result:** ❌ Error "Passwords do not match"
**Actual Result:** [Fill during testing]

---

### TC-005: User Login - Valid Credentials
**Steps:**
1. Navigate to http://localhost:3000/login
2. Enter:
   - Email: "admin@example.com"
   - Password: "admin123"
3. Click Login

**Expected Result:** ✅ Success message, redirected to dashboard
**Actual Result:** [Fill during testing]

---

### TC-006: User Login - Invalid Password
**Steps:**
1. Navigate to /login
2. Enter:
   - Email: "admin@example.com"
   - Password: "wrongpassword"
3. Click Login

**Expected Result:** ❌ Error "Invalid email or password"
**Actual Result:** [Fill during testing]

---

### TC-007: User Login - Invalid Email
**Steps:**
1. Navigate to /login
2. Enter:
   - Email: "nonexistent@example.com"
   - Password: "admin123"
3. Click Login

**Expected Result:** ❌ Error "Invalid email or password"
**Actual Result:** [Fill during testing]

---

### TC-008: User Logout
**Steps:**
1. Login with valid credentials
2. Click "Logout" button in navbar

**Expected Result:** ✅ Logged out, redirected to login page
**Actual Result:** [Fill during testing]

---

## Events Tests

### TC-009: View All Events - User Logged In
**Steps:**
1. Login with valid credentials
2. Click "View Events" in navbar

**Expected Result:** ✅ Display all events with details (name, date, venue, available seats)
**Actual Result:** [Fill during testing]

---

### TC-010: View Event Details
**Steps:**
1. Navigate to Events page
2. View event card details

**Expected Result:** ✅ Show event_name, date, venue, available_seats, total_seats, price, description
**Actual Result:** [Fill during testing]

---

### TC-011: Sold Out Event Display
**Steps:**
1. Check Events page
2. Find event with available_seats = 0

**Expected Result:** ✅ "Sold Out" button displayed (disabled)
**Actual Result:** [Fill during testing]

---

## Booking Tests

### TC-012: Book Tickets - Valid Booking
**Steps:**
1. Login with valid credentials
2. Click "View Events"
3. Select event "Concert Night" with 200 available seats
4. Click "Book Now"
5. Enter: "5" tickets
6. Click "Confirm Booking"

**Expected Result:** ✅ Booking confirmed, available seats reduced to 195, redirected to bookings
**Actual Result:** [Fill during testing]

---

### TC-013: Book Tickets - Exceeding Available Seats
**Steps:**
1. Login with valid credentials
2. Navigate to Events
3. Select event with 10 available seats
4. Click "Book Now"
5. Enter: "15" tickets
6. Click "Confirm Booking"

**Expected Result:** ❌ Error "Only 10 seats available"
**Actual Result:** [Fill during testing]

---

### TC-014: Book Tickets - Invalid Quantity (Zero)
**Steps:**
1. Navigate to booking page
2. Enter: "0" tickets
3. Click "Confirm Booking"

**Expected Result:** ❌ Error "Please enter a valid number of tickets"
**Actual Result:** [Fill during testing]

---

### TC-015: Book Tickets - Negative Quantity
**Steps:**
1. Navigate to booking page
2. Try to enter: "-5" tickets
3. Click "Confirm Booking"

**Expected Result:** ❌ Field validation prevents entry or error message
**Actual Result:** [Fill during testing]

---

### TC-016: View My Bookings
**Steps:**
1. Login with user who has bookings
2. Click "My Bookings" in navbar

**Expected Result:** ✅ Display all user bookings with booking_id, event_name, tickets, date, status
**Actual Result:** [Fill during testing]

---

### TC-017: View Bookings - No Bookings
**Steps:**
1. Login with new user (no bookings)
2. Click "My Bookings"

**Expected Result:** ✅ Display "You haven't booked any tickets yet" with link to events
**Actual Result:** [Fill during testing]

---

## Admin Tests

### TC-018: Access Admin Panel - Admin User
**Steps:**
1. Login with admin@example.com / admin123
2. Click "Admin Panel" in navbar

**Expected Result:** ✅ Admin panel accessible with two tabs: Manage Events, View All Bookings
**Actual Result:** [Fill during testing]

---

### TC-019: Access Admin Panel - Regular User
**Steps:**
1. Login with non-admin user
2. Try to access /admin directly

**Expected Result:** ❌ Redirected to dashboard (access denied)
**Actual Result:** [Fill during testing]

---

### TC-020: Add Event - Valid Data
**Steps:**
1. Login as admin
2. Click "Admin Panel"
3. Click "+ Add New Event"
4. Fill in:
   - Event Name: "New Concert"
   - Date: "2024-12-30"
   - Venue: "Music Hall"
   - Total Seats: "300"
   - Price: "60.00"
5. Click "Add Event"

**Expected Result:** ✅ Success message, event appears in events list
**Actual Result:** [Fill during testing]

---

### TC-021: Add Event - Missing Required Fields
**Steps:**
1. Login as admin
2. Click "Admin Panel"
3. Click "+ Add New Event"
4. Leave fields empty
5. Click "Add Event"

**Expected Result:** ❌ Error "Please fill in all required fields"
**Actual Result:** [Fill during testing]

---

### TC-022: Add Event - Invalid Seats (Zero)
**Steps:**
1. Login as admin
2. Click "Admin Panel"
3. Click "+ Add New Event"
4. Fill all fields but set Total Seats: "0"
5. Click "Add Event"

**Expected Result:** ❌ Error "Total seats must be greater than 0"
**Actual Result:** [Fill during testing]

---

### TC-023: Delete Event - Confirmation
**Steps:**
1. Login as admin
2. Click "Admin Panel"
3. Click "Delete Event" for any event

**Expected Result:** ✅ Confirmation dialog appears
**Actual Result:** [Fill during testing]

---

### TC-024: Delete Event - Success
**Steps:**
1. Login as admin
2. Click "Admin Panel"
3. Click "Delete Event"
4. Confirm deletion

**Expected Result:** ✅ Event removed, success message shown
**Actual Result:** [Fill during testing]

---

### TC-025: View All Bookings - Admin
**Steps:**
1. Login as admin
2. Click "Admin Panel"
3. Click "View All Bookings" tab

**Expected Result:** ✅ Display all system bookings in table (booking_id, event, tickets, status, date)
**Actual Result:** [Fill during testing]

---

## Session & Security Tests

### TC-026: Session Persistence
**Steps:**
1. Login successfully
2. Refresh browser page
3. Check if still logged in

**Expected Result:** ✅ Session maintained, still authenticated
**Actual Result:** [Fill during testing]

---

### TC-027: Protected Route Access
**Steps:**
1. Don't login
2. Try to access http://localhost:3000/dashboard directly

**Expected Result:** ❌ Redirected to login page
**Actual Result:** [Fill during testing]

---

### TC-028: SQL Injection Prevention
**Steps:**
1. Try to login with email: `' OR '1'='1`
2. Password: `anything`

**Expected Result:** ❌ No SQL injection, login fails normally
**Actual Result:** [Fill during testing]

---

## Performance Tests

### TC-029: Load Events Page
**Steps:**
1. Navigate to Events page with 100+ events

**Expected Result:** ✅ Page loads within 2 seconds
**Actual Result:** [Fill during testing]

---

### TC-030: Concurrent Bookings
**Steps:**
1. Open 2 browser tabs (different users)
2. Both try to book last ticket from same event simultaneously
3. One should succeed, one should fail

**Expected Result:** ✅ Only one booking succeeds, other gets "seats unavailable"
**Actual Result:** [Fill during testing]

---

## Summary Report

### Test Results
- **Total Test Cases:** 30
- **Passed:** ___
- **Failed:** ___
- **Skipped:** ___

### Issues Found
1. [Issue 1]
2. [Issue 2]
3. [Issue 3]

### Recommendations
1. [Recommendation 1]
2. [Recommendation 2]

### Sign-Off
- **Tested By:** ___________
- **Date:** _______________
- **Approved By:** ________________
