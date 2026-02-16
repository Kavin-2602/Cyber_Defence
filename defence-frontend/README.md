# 🛡️ Defence Complaint Management System — Frontend

A military-themed web frontend for managing and tracking defence-related complaints. Built with a secure authentication flow (JWT), role-based access control, and a rich dashboard for data visualization.

---

## 📸 Overview

| Feature | Description |
|---------|-------------|
| **Authentication** | JWT-based login, signup & password reset |
| **Dashboard** | Summary cards, severity & type charts |
| **Complaints** | Submit, list, filter, paginate & moderate |
| **Admin Panel** | User management, audit logs, complaint deletion |
| **Theming** | Defence / Air Force / Navy styling |

---

## 🗂️ Pages & Features

### 🔹 Core Pages

#### Login Page
- Username & password fields
- Signup dialog accessible under the password field
- JWT authentication via `POST /auth/login`

#### Signup Page / Dialog
- Fields: **username**, **password**, **role** (User / Admin)
- Defence / Air Force themed styling
- Endpoint: `POST /auth/signup`

#### Forgot Password Page
- Email field with reset-link trigger
- Navy-themed styling
- Endpoint: `POST /auth/forgot-password`

#### Dashboard Page
- **Summary cards** — Total Complaints, High Risk, Medium Risk
- **Charts** — Severity distribution, type distribution
- Military-styled background
- Data source: `GET /complaints`

#### Submit Complaint Page
- Form fields: **title**, **description**, **severity**, **type**
- Endpoint: `POST /complaints`

#### Complaint List Page
- Table of complaints with **severity color coding**
- Pagination & filtering by severity / type
- Endpoints:
  - `GET /complaints?page=1&size=10`
  - `GET /complaints?severity=HIGH&type=Cyber`

---

### 🔹 Advanced / Interactive Pages

#### Profile Page
- Displays user info decoded from JWT (username, role, email)
- Lists complaints submitted by the logged-in user
- Endpoint: `GET /users/me`

#### Admin Panel *(Admin role only)*
- **User management** — List users & roles (`GET /users`)
- **Audit logs** — Track who accessed what and when (`GET /audit-log`)
- **Complaint moderation** — Delete complaints (`DELETE /complaints/{id}`)

#### Access Denied Page
- Shown when an unauthorized role attempts to access restricted content
- Frontend-only (no backend call)

---

## 🔌 API Endpoints Reference

| Page | Method | Endpoint |
|------|--------|----------|
| Login | `POST` | `/auth/login` |
| Signup | `POST` | `/auth/signup` |
| Forgot Password | `POST` | `/auth/forgot-password` |
| Dashboard | `GET` | `/complaints` |
| Submit Complaint | `POST` | `/complaints` |
| Complaint List | `GET` | `/complaints?page=1&size=10` |
| Complaint List (filter) | `GET` | `/complaints?severity=HIGH&type=Cyber` |
| Profile | `GET` | `/users/me` |
| Admin — Users | `GET` | `/users` |
| Admin — Audit Log | `GET` | `/audit-log` |
| Admin — Delete | `DELETE` | `/complaints/{id}` |

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm or yarn
- A running instance of the **Defence Backend API**

### 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd defence-frontend

# Install dependencies
npm install

# Start in development mode
npm start
```

→ Visit **http://localhost:3000** for dev mode.

```bash
# Production build
npm run build
```

→ Copy the `/build` folder into Spring Boot's `/static/` directory for production (see below).

### Environment Variables

Create React App uses the `REACT_APP_` prefix for environment variables.
Create a `.env` file in the project root:

```env
REACT_APP_API_BASE_URL=http://localhost:9090
```

Reference it in code:

```js
const API_URL = process.env.REACT_APP_API_BASE_URL;
```

> Adjust the base URL to point to your running backend instance.

---

## 🔗 Backend Integration

After building the frontend for production, copy the output into the Spring Boot backend so both are served as a single application:

```
npm run build
```

Then copy the contents of the generated `build/` folder into:

```
spring-backend/src/main/resources/static/
```

This allows the Spring Boot server to serve the React frontend alongside the API.

---

## 🎨 Optional Enhancements

| Enhancement | Description |
|-------------|-------------|
| ⏳ Loading Spinners | Displayed while API calls are pending |
| 🔔 Toast Notifications | Success / failure feedback on actions |
| ✉️ Email Notifications | Triggered by the backend on complaint submission |

### 🤖 Chatbot (Optional)
- **DefenceBot** assistant guides users through login and complaint submission
- Integrated via **React Chatbot Kit** + Spring Boot endpoints

---

## 🔐 Authentication Flow

```
┌──────────┐    POST /auth/login    ┌──────────┐
│  Client   │ ──────────────────►   │  Server  │
│ (Browser) │ ◄──────────────────   │  (API)   │
└──────────┘    JWT Token           └──────────┘
      │
      ▼
  Store token in
  localStorage
      │
      ▼
  Attach token as
  Authorization: Bearer <token>
  on every subsequent request
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Create React App) |
| Auth | JWT (JSON Web Tokens) |
| API Communication | REST (Fetch / Axios) |
| Styling | Custom Defence / Military theme |
| Backend | Spring Boot (Java) |
| Chatbot | React Chatbot Kit (optional) |

---

## 📄 License

This project is for **educational / demonstration purposes**. See [LICENSE](LICENSE) for details.

---

> **Built with 🇮🇳 for defence operations.**
