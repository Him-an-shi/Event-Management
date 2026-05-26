# Quick Start Guide

## Prerequisites
- Python 3.8+
- Node.js 14+
- MySQL Server
- npm

## 1. Database Setup (5 minutes)

```bash
# Open MySQL and run:
mysql -u root -p < database_setup.sql

# Or manually import the SQL file in your MySQL client
```

## 2. Backend Setup (5 minutes)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs on: http://localhost:5000

## 3. Frontend Setup (5 minutes)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:3000

## Demo Credentials
- Email: admin@example.com
- Password: admin123

## Done! 🎉

Your full-stack booking system is ready to use!

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Troubleshooting

### "Cannot connect to MySQL"
- Start MySQL Server
- Update password in `backend/config.py`

### "Port 5000/3000 already in use"
- Kill existing process or change port

### "Node modules not installed"
```bash
cd frontend
rm -rf node_modules
npm install
```

### "Missing Flask-CORS"
```bash
pip install Flask-CORS
```

## Next Steps

1. Create more events in Admin Panel
2. Book tickets as a user
3. View bookings
4. Customize as needed

Enjoy! 🚀
