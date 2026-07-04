# API Reference — ActivityHub Backend

Base URL: `http://localhost:5000/api`

## Authentication

### POST /api/auth/register
Register a new user.

**Body:**
```json
{
  "name": "Aarav Shah",
  "email": "aarav.shah@college.edu.in",
  "password": "password123",
  "role": "STUDENT",
  "department": "Computer Engineering",
  "division": "A",
  "rollNo": "CE21021"
}
```

### POST /api/auth/login
Login with email and password.

**Body:**
```json
{
  "email": "aarav.shah@college.edu.in",
  "password": "password123"
}
```

### GET /api/auth/me
Get current user profile. Requires Bearer token.

---

## Health

### GET /api/health
Server health check with database status.

---

## Events (Phase 2)
*Not yet implemented*

## Attendance (Phase 3)
*Not yet implemented*

## Certificates (Phase 4)
*Not yet implemented*

## Credits (Phase 5)
*Not yet implemented*

## Reports (Phase 6)
*Not yet implemented*

## Notifications (Phase 7)
*Not yet implemented*
