# 🚀 Ventry - Full Stack Project

![Project Architecture](https://img.shields.io/badge/architecture-full%20stack-blue) 
![Frontend](https://img.shields.io/badge/frontend-next.js-000000?logo=next.js) 
![Backend](https://img.shields.io/badge/backend-node.js-339933?logo=node.js) 
![Database](https://img.shields.io/badge/database-postgresql-4169E1?logo=postgresql)

A modern web application with Next.js frontend and Node.js backend. This guide will walk you through the complete setup process.

## 📋 Table of Contents
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Database Setup](#%EF%B8%8F-database-setup)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [Running the Application](#-running-the-application)
- [API Testing](#-api-testing)
- [Troubleshooting](#-troubleshooting)

## 📂 Project Structure

```bash
ventry/
├── client/       # Next.js frontend (Port: 3000)
│   ├── public/
│   ├── src/
│   └── package.json
└── server/       # Node.js backend (Port: 5000)
    ├── src/
    └── package.json
```

## 3. Setting Up PostgreSQL

1. Open pgAdmin 7
2. Create a new Database called: `ventry`
3. Set up a User with these credentials:
   - Username: `postgres`
   - Password: `9046`
4. Make sure port `5432` is open (default for PostgreSQL)

---

## 4. Setting up Backend (Server)

1. Open a Terminal or Command Prompt
2. Navigate to the server folder:
   ```bash
   cd server
   ```

   Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` folder with the following content:


```bash
DB_USER=postgres
DB_PASSWORD=9046
DB_NAME=ventry
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTc0NTU4ODY3NywiZXhwIjoxNzQ1NTkyMjc3fQ.pU-S8sjjZmNZ7G-OdZnMlBI13T4OBlJwn_DOcYvhaTo
INVITE_ONLY=true
JWT_EXPIRATION=1h

```
4. Start the server:
```bash
npm run dev
````

5. The server should now be running at `http://localhost:5000`
6. If you see any errors, please check the console for details.

---

## 5. Setting up Frontend (Client)

1. Open a new Terminal or Command Prompt
2. Navigate to the client folder:
   ```bash
   cd client
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the `client` folder with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
5. Start the client:
   ```bash
   npm run dev
   ```
6. The client should now be running at `http://localhost:3000`
7. If you see any errors, please check the console for details.

---

## 6. Accessing the Application

- Open your web browser and go to `http://localhost:3000`
- You should see the Ventry application running.
- If you encounter any issues, please check the console for errors and ensure both the client and server are running.

---

## 7. Troubleshooting

- If you encounter any issues, please check the console for errors and ensure both the client and server are running.
- Make sure PostgreSQL is running and the database is set up correctly.
- If you have any questions or need help, feel free to reach out to the project maintainers.

---

# Testing the project

- You can test registration and login with sample requests using a REST client (like Thunder Client for VSCode) or Postman.
- Here are some sample requests you can use:

### Registration

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "testuser@example.com",
  "password": "testpassword"
}
```

### Login

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "testuser@example.com",
  "password": "testpassword"
}
```

## 🎉 That's it!

- If you follow the steps carefully, the app should be running on your computer!
