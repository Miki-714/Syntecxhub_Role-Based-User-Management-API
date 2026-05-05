# 🛡️ Role-Based Access Control (RBAC) & User Management API

A secure, production-ready Node.js REST API providing robust authentication, role-based authorization, and administrative oversight. Built with the **MERN** stack (MongoDB, Express, Node.js), this system allows for granular control over user permissions and maintains a transparent history of administrative actions.

## 🚀 Core Features

- **Secure Authentication**: JWT-based stateless authentication with password hashing via `bcryptjs`.
- **Dual-Layer Authorization**:
  - **Authentication Middleware**: Verifies token validity and checks database for "Blocked" status on every request.
  - **Role Middleware**: Restricts access to sensitive routes (Promote/Block/Logs) to `admin` users only.
- **Administrative Suite**:
  - **User Promotion/Demotion**: Dynamically upgrade or downgrade user privileges.
  - **Real-time Blocking**: Instantly revoke access for bad actors.
- **Audit Logging**: Automatic tracking of all administrative actions (Who, What, To Whom, and When).
- **Database Integrity**: MongoDB unique indexing to prevent duplicate accounts.

---

## 🏗️ Project Structure

```text
Syntecxhub_Role-Based User Management API/
├── config/             # DB connection logic
├── controllers/        # Business logic (Auth, Admin)
├── middleware/         # Security layers (protect, authorize)
├── models/             # Mongoose Schemas (User, AuditLog)
├── routes/             # API Endpoints
├── .env                # Secret keys & Environment variables
├── app.js              # Express configuration
└── server.js           # Entry point
```

---

## 🛠️ API Endpoints

### Auth Routes (Public)

| Method | Endpoint             | Description                               |
| :----- | :------------------- | :---------------------------------------- |
| `POST` | `/api/auth/register` | Create a new user/admin                   |
| `POST` | `/api/auth/login`    | Returns JWT and verifies "Blocked" status |

### Admin Routes (Protected - Admins Only)

| Method | Endpoint                 | Description                        |
| :----- | :----------------------- | :--------------------------------- |
| `PUT`  | `/api/admin/promote/:id` | Elevate a user to Admin role       |
| `PUT`  | `/api/admin/demote/:id`  | Return an Admin to User role       |
| `PUT`  | `/api/admin/block/:id`   | Ban a user from the system         |
| `PUT`  | `/api/admin/unblock/:id` | Restore access to a user           |
| `GET`  | `/api/admin/logs`        | View full history of admin actions |

---

## 🔒 Security Implementation

### The Authentication Flow

1.  **Request**: Client sends JWT in the `Authorization` header.
2.  **Verify**: Middleware decodes the token and fetches the user from the database.
3.  **Active Check**: If the user is found and **not blocked**, the request proceeds.
4.  **Role Check**: For admin routes, the system verifies the `role` field matches the required permission.

### Audit Logging

To ensure accountability, every administrative change triggers an entry in the `AuditLog` collection. This creates a permanent, immutable record that can be reviewed for security audits.

---

## 🚦 Getting Started

1.  **Clone the Repository**
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Configure `.env`**:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```
4.  **Run the Server**:

    ```bash
    # Development mode
    npm run dev

    # Production mode
    npm start
    ```

## 🧪 Testing

Use the included `test.rest` file with the VS Code **REST Client** extension to perform automated testing of the full authentication and authorization lifecycle.
