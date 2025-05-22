# 📚 Book Review API

A RESTful API for managing books and reviews, built with **Node.js**, **Express**, and **MongoDB**.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

---

## ✨ Features

- 🔐 User authentication with JWT
- 📚 Book CRUD management
- 📝 Review system with edit/delete
- 🔍 Search books
- 📄 Pagination and filtering

---

## 🚀 Setup

1. 📥 Clone the repository  
2. 📦 Install dependencies: `npm install`  
3. ⚙️ Create a `.env` file based on `.env.example`  
4. ▶️ Start the server: `npm run dev`

---

## 🔌 API Endpoints

### 🔑 Authentication
- `POST /api/auth/signup` – Register a new user
- `POST /api/auth/login` – Login and get JWT token

### 📘 Books
- `POST /api/books` – Add a new book (Authenticated)
- `GET /api/books` – Get all books (with pagination/filtering)
- `GET /api/books/:id` – Get book details
- `GET /api/books/search?query=...` – Search books

### ✍️ Reviews
- `POST /api/books/:id/reviews` – Add a review (Authenticated)
- `PUT /api/reviews/:id` – Update your review (Authenticated)
- `DELETE /api/reviews/:id` – Delete your review (Authenticated)

---

## 📖 API Documentation

🧪 Explore and test all endpoints via Apidog:  
👉 [![Apidog API Docs](https://img.shields.io/badge/Apidog-API%20Documentation-ff6f61?style=for-the-badge&logo=swagger&logoColor=white)](https://vba3ddpadn.apidog.io)

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.