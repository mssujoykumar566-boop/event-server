# EventSphere - Event Management Platform (Backend)

EventSphere is a full-stack event management platform backend that provides APIs for authentication, event management, user registration, role-based authorization, and admin operations.

The backend is built using **Node.js, Express.js, TypeScript, MongoDB, Mongoose, and BetterAuth**.

---

# 🚀 Live API

Backend URL:

```
https://event-server-nvtu.onrender.com
```

---

# ✨ Features

## Authentication & Authorization

- User registration
- User login
- BetterAuth authentication system
- Secure session management
- Cookie based authentication
- Role based authorization
  - User
  - Organizer
  - Admin


---

## Event Management

- Create events
- Get all events
- Get single event details
- Update events
- Delete events
- Search events
- Filter events
- Sort events
- Pagination support


---

## Event Registration

- Join events
- Prevent duplicate registration
- View joined events
- Track event participants


---

## Admin Features

- View total users
- View total events
- View registrations
- Manage users
- Generate reports


---

# 🛠️ Technology Stack

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- BetterAuth
- JWT / Session Authentication
- REST API


## Development Tools

- tsx
- Nodemon
- Postman
- Thunder Client

---

# 📂 Project Structure

```
event-server
│
├── src
│   │
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   ├── event.controller.ts
│   │   ├── registration.controller.ts
│   │   └── admin.controller.ts
│   │
│   ├── models
│   │   ├── event.model.ts
│   │   ├── registration.model.ts
│   │   └── user.model.ts
│   │
│   ├── routes
│   │   ├── event.route.ts
│   │   ├── registration.route.ts
│   │   └── auth.route.ts
│   │
│   ├── middlewares
│   │   ├── auth.middleware.ts
│   │   └── role.middleware.ts
│   │
│   ├── config
│   │   └── mongodb.ts
│   │
│   └── server.ts
│
├── package.json
├── tsconfig.json
└── .env
```

---

# ⚙️ Installation & Setup


Clone repository:

```bash
git clone backend-repository-url
```


Go to project folder:

```bash
cd event-server
```


Install dependencies:

```bash
npm install
```


Create environment file:

```
.env
```


Add environment variables:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_secret_key

BETTER_AUTH_URL=http://localhost:5000

FRONTEND_URL=http://localhost:3000

NODE_ENV=development
```


---

# ▶️ Run Project


Development:

```bash
npm run dev
```


Build:

```bash
npm run build
```


Production:

```bash
npm start
```


Server running:

```
http://localhost:5000
```

---

# 🔗 API Endpoints


## Authentication


### Register

```
POST /api/auth/sign-up/email
```


### Login

```
POST /api/auth/sign-in/email
```


### Get Session

```
GET /api/auth/get-session
```


---

# Events API


### Get All Events

```
GET /api/events
```


### Get Single Event

```
GET /api/events/:id
```


### Create Event

```
POST /api/events
```


### Update Event

```
PATCH /api/events/:id
```


### Delete Event

```
DELETE /api/events/:id
```


---

# Registration API


### Join Event

```
POST /api/registrations/events/:id/join
```


### My Joined Events

```
GET /api/registrations/my-events
```


---

# Admin API


### Dashboard Statistics

```
GET /api/admin/stats
```


### Users Report

```
GET /api/admin/users
```


---

# 🔐 Authentication

Authentication is handled using BetterAuth.

Features:

- Secure session cookies
- Protected API routes
- Role verification middleware
- User permission handling


Example roles:

```json
{
  "role": "user"
}
```

```json
{
  "role": "admin"
}
```

---

# 🌐 Frontend Repository

```
https://github.com/mssujoykumar566-boop/event-client.git
```

---

# 🧪 Testing

API testing tools:

- Postman
- Thunder Client


---

# 👨‍💻 Developer

Developed by:

**Laxman Kumer Halder**


GitHub:

```
https://github.com/mssujoykumar566-boop
```


LinkedIn:

```
https://www.linkedin.com/in/laxman-kumar-sujoy/
```

---

# 📄 License

This project is developed for educational and portfolio purposes.