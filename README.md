# Support Ticket Management System

A full-stack Support Ticket Management System built as part of the NXT9 Jr Software Developer Assessment.

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

### Testing
- Jest
- Supertest
- MongoDB Memory Server

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Role-based Authorization

## Customer

- Dashboard
- Create Ticket
- View Own Tickets
- Edit Own Ticket
- Delete Own Ticket

## Admin

- Dashboard Statistics
- View All Tickets
- Update Ticket Status
- Update Ticket Priority

## Security

- Password Hashing
- JWT Authentication
- Route Protection
- Ownership Validation
- Request Validation using Zod
- Centralized Error Handling

---

# Folder Structure

```
backend/
frontend/
```

---

# Installation

## Backend

```bash
cd backend

npm install
```

Create a `.env` file.

Example:

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/support-ticket-system

JWT_SECRET=your_secret_key

ADMIN_NAME=Admin

ADMIN_EMAIL=admin@test.com

ADMIN_PASSWORD=Admin@123
```

Run:

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:3000
```

Backend runs on

```
http://localhost:5000
```

---

# Test Credentials

## Customer

```
Email: akash@example.com

Password: password123
```

## Admin

```
Email: admin@test.com

Password: Admin@123
```

---

# Running Tests

```bash
cd backend

npm test
```

---

# API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login

GET /api/auth/me
```

## Customer

```
GET /api/tickets

GET /api/tickets/:id

POST /api/tickets

PUT /api/tickets/:id

DELETE /api/tickets/:id
```

## Admin

```
GET /api/admin/dashboard

GET /api/admin/tickets

PATCH /api/admin/tickets/:id
```

---

# Seed Data

Create an admin account by either:

- registering a user and changing the role to `admin` in MongoDB

OR

- using the provided seed script (if included).
  
  ```
  npm run seed:admin
  ```

---

# AI Usage

AI tools (ChatGPT) were used to:

- discuss architecture
- understand TypeScript issues
- improve code structure
- review implementation

All generated code was reviewed, modified, tested, and understood before being included in the project.

---

# Known Limitations

- No email notifications
- No file attachments
- No pagination
- No refresh token implementation
- No Docker configuration

---

# Future Improvements

- Refresh Tokens
- Email Notifications
- Ticket Attachments
- Pagination
- Search & Filters
- Swagger Documentation
- Docker Support
