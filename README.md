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



---

## ⚙️ Environment Variables

Create a `.env` file in the project root and add:
- PORT=5000
- MONGODB_URI=mongodb://localhost:27017/url-shortener
- JWT_SECRET=aklfjalcvnvqropiu9kjwtoi5uy29538hsjretbwnmgsdgnm
- JWT_EXPIRE=7d
- BASE_URL=http://localhost:5000



---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/url-shortener-backend.git
cd url-shortener-backend

