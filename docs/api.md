# ARC_OS — API Documentation

## Base URL

```
Production: https://arc-os-api.onrender.com/api/v1
Development: http://localhost:3001/api/v1
```

## Authentication

All endpoints (except `/auth/*`) require a valid Supabase JWT token in the Authorization header:

```
Authorization: Bearer <supabase_access_token>
```

---

## Auth Endpoints

### POST /auth/google
Initiates Google OAuth flow via Supabase.

**Request:** None (redirect)  
**Response:** Redirect to Google OAuth consent screen  
**Note:** Handled primarily by Supabase client SDK on frontend.

---

### GET /auth/callback
Handles OAuth redirect from Google.

**Query Params:**
```
code: string   — OAuth authorization code
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@bitsathy.ac.in",
    "name": "John Doe"
  },
  "session": {
    "access_token": "string",
    "refresh_token": "string"
  }
}
```

**Errors:**
- `403` — Email domain not @bitsathy.ac.in

---

### POST /auth/logout
Clears the user session.

**Request:** None  
**Response:**
```json
{ "message": "Logged out successfully" }
```

---

## Profile Endpoints

### GET /profile
Returns the authenticated user's profile.

**Response:**
```json
{
  "id": "uuid",
  "email": "user@bitsathy.ac.in",
  "name": "John Doe",
  "department": "CS",
  "created_at": "2026-01-01T00:00:00Z"
}
```

---

### PATCH /profile/department
Updates the user's department.

**Request:**
```json
{
  "department": "CS"
}
```

**Validation:** Must be one of: CS, IT, AL, AD, EEE, EIE, ME, MZ, AG, BT

**Response:**
```json
{
  "id": "uuid",
  "department": "CS",
  "updated": true
}
```

**Errors:**
- `400` — Invalid department value

---

## Subject Endpoints

### GET /subjects
Returns subjects filtered by the user's department.

**Query Params:**
```
department: string (optional — defaults to user's profile department)
```

**Response:**
```json
{
  "subjects": [
    {
      "id": "uuid",
      "subject_name": "Engineering Mathematics II",
      "icon": "∑",
      "completion": 45.5
    }
  ]
}
```

---

## Question Endpoints

### GET /questions/:subject_id
Returns all questions for a subject.

**Path Params:**
```
subject_id: UUID
```

**Response:**
```json
{
  "subject_id": "uuid",
  "subject_name": "Engineering Mathematics II",
  "total_questions": 20,
  "viewed_count": 9,
  "completion_percent": 45.0,
  "questions": [
    {
      "id": "uuid",
      "question": "Define limits and continuity",
      "order_index": 1,
      "viewed": true,
      "viewed_at": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

### GET /questions/:question_id/detail
Returns full question content.

**Path Params:**
```
question_id: UUID
```

**Response:**
```json
{
  "id": "uuid",
  "subject_id": "uuid",
  "question": "Define limits and continuity",
  "answer": "A limit is the value that a function...",
  "image_url": "https://...",
  "references": "Thomas Calculus, Chapter 2",
  "notes": "Focus on epsilon-delta definition",
  "order_index": 1,
  "viewed": true
}
```

---

## Progress Endpoints

### GET /progress/:subject_id
Returns completion progress for a specific subject.

**Path Params:**
```
subject_id: UUID
```

**Response:**
```json
{
  "subject_id": "uuid",
  "subject_name": "Engineering Mathematics II",
  "total_questions": 20,
  "viewed_count": 9,
  "completion_percent": 45.0
}
```

---

### POST /progress/mark-viewed
Marks a question as viewed.

**Request:**
```json
{
  "question_id": "uuid",
  "subject_id": "uuid"
}
```

**Response:**
```json
{
  "question_id": "uuid",
  "viewed": true,
  "viewed_at": "2026-01-01T00:00:00Z",
  "subject_completion": {
    "total": 20,
    "viewed": 10,
    "percent": 50.0
  }
}
```

---

### GET /progress/overview
Returns completion status for all subjects.

**Response:**
```json
{
  "subjects": [
    {
      "subject_id": "uuid",
      "subject_name": "Engineering Mathematics II",
      "total_questions": 20,
      "viewed_count": 9,
      "completion_percent": 45.0,
      "mastered": false
    }
  ],
  "overall_percent": 38.5
}
```

---

## Settings Endpoints

### GET /settings
Returns the user's settings.

**Response:**
```json
{
  "user_id": "uuid",
  "tutorial_seen": false
}
```

---

### PATCH /settings
Updates user settings.

**Request:**
```json
{
  "tutorial_seen": true
}
```

**Response:**
```json
{
  "user_id": "uuid",
  "tutorial_seen": true,
  "updated": true
}
```

---

## Error Response Format

All errors follow this structure:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token",
    "status": 401
  }
}
```

### Error Codes

| Code | Status | Description |
|------|--------|-------------|
| UNAUTHORIZED | 401 | Missing or invalid JWT |
| FORBIDDEN | 403 | Invalid email domain |
| NOT_FOUND | 404 | Resource not found |
| BAD_REQUEST | 400 | Invalid request body |
| INTERNAL_ERROR | 500 | Server error |
