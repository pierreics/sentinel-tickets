# 🛡️ Sentinel Tickets

---

## 📌 About Sentinel Tickets

**Sentinel Tickets** is a lightweight, straightforward ticketing system built with Node.js, Express, SQLite3, and JSON Web Tokens (JWT). It features simple, easy-to-understand vulnerabilities designed to help beginners learn the fundamentals of web application security and exploitation.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express
- **Database:** SQLite3
- **Authentication:** JWT (JSON Web Tokens), bcrypt

---

## 🛠️ Installation & Setup

To set up your local lab environment, follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/tuo-username/sentinel-tickets.git](https://github.com/tuo-username/sentinel-tickets.git)
cd sentinel-tickets
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
PORT=3000
JWT_SECRET=your_super_secret_jwt_key
ADMIN_PASSWORD=YourStrongAdminPasswordHere
ALICE_PASSWORD=YourStrongAlicePasswordHere
```

### 4. Initialize and seed the database
```bash
node src/config/db.js
```

### 5. Start the server
```bash
node app.js
```
The application will run at `http://localhost:3000`.

---

## 🎯 CTF Challenges & Exploits

This project contains simple, common security flaws for you to discover:

| # | Vulnerability | Objective |
| :--- | :--- | :--- |
| **1** | **Mass Assignment** | Escalate your user privileges during registration. |
| **2** | **IDOR** | Access confidential tickets without proper ownership verification. |
| **3** | **SQL Injection** | Bypass search filters using raw query strings. |

---

## 🔍 Exploit Solutions

You can find automated proof-of-concept (PoC) attack scripts inside the `exploits/` directory (e.g., `pwn.js`). These scripts demonstrate how to programmatically solve the challenges and retrieve the hidden flags.

---

