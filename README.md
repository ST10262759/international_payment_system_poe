<img width="1710" height="567" alt="image" src="https://github.com/user-attachments/assets/695ee1a9-cdfa-4101-b359-8ae118827df8" />

# 🌍💳 International Payment System — Part 2 & 3

Welcome to the **International Payment System Project**!  
This repository now includes **Part 2** and **Part 3**, covering **secure full-stack payment portals**, **DevSecOps pipelines**, and **multi-role authentication** for both **users** and **employees**.  

---

## 🧠 Overview

Our team developed:
- A **Backend API** using **Express.js** and **MongoDB**
- A **React Frontend User Portal**
- A new **React Employee Portal** (for internal management)
- A **DevSecOps pipeline** with **CircleCI**, **SonarCloud**, and **Docker**

The project demonstrates strong **security**, **compliance**, and **DevOps integration**, expanding on **Part 2** by adding **multi-portal management**, **role-based access**, and **complete containerization**.

---

## 👥 Team Members

| Name | Student Number | Role |
|------|----------------|------|
| [Your Name] | [Student Number] | Full Stack Developer |
| [Member 2] | [Student Number] | Frontend Developer |
| [Member 3] | [Student Number] | Backend Developer |
| [Member 4] | [Student Number] | DevOps & Security Engineer |

---

## ⚙️ Backend Requirements (Node.js + Express)

### 🔐 Authentication
- Secure **user registration, login, and logout** (for client portal)
- Secure **employee and admin login** (for internal portal)
- **Salting** 🧂 and **hashing** 🔑 implemented with bcrypt for all accounts
- **Super admin** can create or delete employee accounts
- All routes protected by **JWT-based authentication**

### 🔒 Security
- Enforced **SSL certificates** for both portals (frontend + backend)
- Full protection against:
  - **XSS**
  - **CSRF**
  - **SQL/NoSQL Injection**
  - **Brute Force**
  - **Clickjacking**
- All incoming requests validated and sanitized via **REGEX whitelisting/blacklisting**

### 🗃️ Database
- **MongoDB** with collections for:
  - Users
  - Employees
  - Payments
- Enforced **schema validation** and **input sanitization**

---

## 💻 Frontend Requirements (React)

### 🌍 User Portal (Part 2)
- **Register** and **login** securely
- **Create and view payments**
- Payment includes:
  - Amount
  - Recipient
  - Status (`pending`, `approved`, or `denied`)
- Input sanitized for all fields
- Entire site served via **HTTPS**

### 🧑‍💼 Employee Portal (Part 3)
A secure internal interface for employees and administrators.

#### 🧾 Employee Flow
1. **Login** using secure credentials (POST)
2. **View pending payments** submitted by users (GET)
3. **Approve or deny** payments (PUT)
4. **View history** of all previously approved/denied payments (GET)
5. **Logout** securely (GET)

#### 👨‍💼 Admin Flow
1. **Login** as super admin (POST)
2. **View list of employee accounts** (GET)
3. **Create new employee accounts** (POST)
4. **Delete employee accounts** (DELETE)
5. **Logout** (GET)

✅ Same password and input protection as the user portal  
✅ Enforced SSL and HTTPS  
✅ Same React sanitization, validation, and security layers

---

## 🧱 Security Overview

| Threat | Mitigation Strategy |
|---------|----------------------|
| **XSS (Cross-Site Scripting)** | Sanitized user input, React escaping, `helmet` headers |
| **CSRF (Cross-Site Request Forgery)** | CSRF tokens and same-site cookie policy |
| **SQL/NoSQL Injection** | Strict schema validation, regex-based whitelisting |
| **Brute Force** | Account lockout after multiple failed attempts |
| **Clickjacking** | X-Frame-Options and CSP headers via Helmet |
| **Unencrypted Communication** | HTTPS enforced with SSL on all portals |
| **Weak Passwords** | Salted + hashed with bcrypt (custom cost factor) |

---

## 🧰 DevSecOps Implementation

### 🔄 CircleCI
- Automates full build, test, and deployment pipeline  
- Runs security and lint checks before deployment  
- Builds Docker images for:
  - Backend API
  - User Portal
  - Employee Portal

### 🧠 SonarCloud
- Performs **static code analysis** and **vulnerability scanning**  
- Integrated with CircleCI for automated reporting  

### 🐳 Dockerization
The **entire system** (backend + both portals) runs with one command using `docker-compose`.

### 🧩 docker-compose.yml
- version: '3.8'
  
- services:
-   backend:
-     build: ./backend
-     container_name: payment-backend
-     ports:
-       - "5000:5000"
-     env_file:
-       - ./backend/.env
-     depends_on:
-       - mongo
-     volumes:
-       - ./cert-perm:/cert-perm

-   user-portal:
-     build: ./user-portal
-     container_name: payment-user-portal
-     ports:
-       - "3000:3000"
-     depends_on:
-       - backend
-     volumes:
-       - ./cert-perm:/cert-perm

-   employee-portal:
-     build: ./employee-portal
-     container_name: payment-employee-portal
-     ports:
-       - "4000:4000"
-     depends_on:
-       - backend
-     volumes:
-       - ./cert-perm:/cert-perm

-  mongo:
-    image: mongo
-     container_name: mongo-db
-     ports:
-       - "27017:27017"
-  Start all services:

- docker-compose up --build

## 🧩 Summary of Requirements
Feature	Description
- 🔐 Password Security	Bcrypt hashing + custom salting
- 🧾 Input Validation	Regex whitelisting/blacklisting
- 🌐 SSL Security	HTTPS on all portals
- 🛡️ Attack Protection	XSS, CSRF, Injection, Clickjacking prevention
- 🧰 DevSecOps	CircleCI + SonarCloud pipeline
- 🧩 Dockerization	Backend + both portals in one compose
- 👨‍💼 Employee Portal	Role-based management system

##🔄 Changelog (Part 3 Updates)
Area	Update
- 🧩 New Portal	Added Employee/Admin Portal
- 🔐 Authentication	Added role-based access for employees/admins
- 🧰 Dockerization	Entire stack runs via single docker-compose.yml
- 🌐 SSL	Implemented HTTPS across all components
- 🧠 DevSecOps	CircleCI + SonarCloud integration improved
- 🧱 Security	Strengthened password hashing, regex whitelisting, and CSRF tokens
- 🎨 UI	Improved consistency between portals
- 🔧 Bug Fixes	Addressed rubric feedback and merged security recommendations

## 📚 References

- OWASP Top 10 Security Risks
- Node.js Security Best Practices
- React Input Sanitization Guide
- Docker Compose Documentation
- CircleCI Docs
- SonarCloud Docs

# 🧾 Installation & Setup
- Clone the repository
- git clone <repository-url>
- cd international-payment-system
- Build and run all services
- docker-compose up --build
  
# ✅ End of README

