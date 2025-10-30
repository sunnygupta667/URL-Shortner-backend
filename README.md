# 🔗 URL Shortener Backend (Node.js + Express + MongoDB)

This is the **backend server** for the URL Shortener application built using **Node.js**, **Express**, and **MongoDB**.  
It provides secure REST APIs for user authentication and URL management, allowing registered users to shorten long URLs and track click counts.

---

## 🚀 Features

- 🧩 **User Authentication**
  - Register and login with email and password
  - Passwords are securely hashed using **bcrypt**
  - JWT-based authentication for protected routes

- 🔗 **URL Shortening**
  - Generate short URLs for long links
  - Redirect users to the original URL
  - Track the number of clicks per URL

- 👤 **User Dashboard APIs**
  - Fetch all URLs created by a specific user
  - Delete URLs
  - Secure access using JWT tokens

- ⚙️ **Environment Configuration**
  - `.env` file for managing environment variables

- 🧱 **Database**
  - MongoDB used for data persistence
  - Indexed schema for optimized query performance

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Node.js** | JavaScript runtime for backend |
| **Express.js** | Web framework for routing and middleware |
| **MongoDB + Mongoose** | Database and ODM for schema modeling |
| **bcryptjs** | Password hashing |
| **jsonwebtoken (JWT)** | User authentication |
| **dotenv** | Environment variable management |
| **CORS** | Cross-Origin Resource Sharing |

---

## 📁 Folder Structure
url-shortener-backend/
│
├── config/
│ └── db.js # MongoDB connection setup
│
├── controllers/
│ ├── userController.js # Register & Login logic
│ └── urlController.js # URL create, delete, fetch, redirect logic
│
├── middlewares/
│ └── auth.js # JWT authentication middleware
│
├── models/
│ ├── User.js # User schema & password hashing
│ └── Url.js # URL schema
│
├── routes/
│ ├── userRoutes.js # /auth endpoints
│ └── urlRoutes.js # /url endpoints
│
├── .env # Environment variables
├── server.js # Entry point (Express app setup)
└── package.json


---

## ⚙️ Environment Variables

Create a `.env` file in the project root and add:



PORT=5000
MONGODB_URI=mongodb://localhost:27017/url-shortener
JWT_SECRET=aklfjalcvnvqropiu9kjwtoi5uy29538hsjretbwnmgsdgnm
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000

BASE_URL=http://localhost:5000


---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/url-shortener-backend.git
cd url-shortener-backend

2️⃣ Install dependencies
npm install

3️⃣ Set up MongoDB

Make sure MongoDB is running locally or update the MONGODB_URI in .env with your connection string.

4️⃣ Run the server
npm start


Server will start on:
👉 http://localhost:5000

🔑 API Endpoints
🧍‍♂️ User Authentication
Method	Endpoint	Description	Auth
POST	/auth/register	Register a new user	❌
POST	/auth/login	Login and get JWT token	❌
🔗 URL Management
Method	Endpoint	Description	Auth
POST	/url/shorten	Create a short URL	✅
GET	/url/my-urls	Get all URLs of logged-in user	✅
DELETE	/url/:id	Delete a specific URL	✅
GET	/:shortId	Redirect to the original URL	❌
🧠 How It Works

User registers or logs in to get a JWT token.

The user sends this token in headers to access protected routes (like /url/shorten).

The backend generates a unique shortId and saves it with the original URL.

When anyone accesses /shortId, it redirects to the original URL and increases the click count.

🩺 Health Check

You can test if the server is running:

GET /health


Response:

{
  "success": true,
  "message": "URL Shortener API is running",
  "timestamp": "2025-10-30T10:00:00.000Z"
}

🧰 Error Handling

Centralized error middleware handles all exceptions

Returns JSON response with success: false and error message

🧑‍💻 Author

Sunny Gupta
📧 sg7472209@gmail.com
💻 Passionate about building full-stack web applications
