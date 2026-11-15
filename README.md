# 🛡️ Sentinel Tickets

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

---

## 📌 About Sentinel Tickets

**Sentinel Tickets** is a lightweight, straightforward ticketing system built with Node.js, Express, SQLite3, and JSON Web Tokens (JWT). It features simple, easy-to-understand vulnerabilities designed to help beginners learn the fundamentals of web application security and exploitation.

---

## 📁 Project Structure

Here is an overview of the project layout and where to find key components:

```text
sentinel-tickets/
├── exploits/              # Automated exploit scripts and documentation
│   ├── pwn.js             # Node.js PoC script demonstrating the vulnerabilities
│   └── docs.md            # Detailed explanation of vulnerabilities and exploitation logic
├── src/                   # Backend source code
│   ├── config/            # Database initialization and connection settings
│   ├── controllers/       # Business logic for auth, tickets, and search
│   ├── middlewares/       # Authentication and token verification middleware
│   └── routes/            # Express API routing definitions
├── app.js                 # Main application entry point
├── package.json           # Project dependencies and metadata
└── .env.example           # Environment variables template
```

---

## 🚀 Tech Stack

* **Backend:** Node.js, Express
* **Database:** SQLite3
* **Authentication:** JWT (JSON Web Tokens), bcrypt

---

## 🛠️ Installation & Setup

To set up your local lab environment, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/tuo-username/sentinel-tickets.git](https://github.com/tuo-username/sentinel-tickets.git)
   cd sentinel-tickets
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory (or copy `.env.example`) and populate it with the following values:
   ```env
   PORT=3000
   JWT_SECRET=your_super_secret_jwt_key
   ADMIN_PASSWORD=YourStrongAdminPasswordHere
   ALICE_PASSWORD=YourStrongAlicePasswordHere
   ```

4. **Initialize and seed the database:**
   ```bash
   node src/config/db.js
   ```

5. **Start the server:**
   ```bash
   node app.js
   ```

The application will be up and running at **`http://localhost:3000`**.

---

## 🎯 CTF Challenges & Exploits

This project contains simple, common security flaws for you to discover:

| # | Vulnerability | Objective |
| :--- | :--- | :--- |
| **Challenge 1** | **Mass Assignment** | Escalate your user privileges during registration. |
| **Challenge 2** | **IDOR** | Access confidential tickets without proper ownership verification. |
| **Challenge 3** | **SQL Injection** | Bypass search filters using raw query strings. |

---

## 🔍 Exploit Solutions & Documentation

You can find automated proof-of-concept (PoC) attack scripts and writeups inside the `exploits/` directory:

* **`exploits/pwn.js`**: Programmatically executes the attacks to solve the challenges and retrieve hidden flags.
* **`exploits/docs.md`**: Provides a deep-dive vulnerability analysis detailing where the bugs were located in the source code and how the exploit scripts leverage them.

---

