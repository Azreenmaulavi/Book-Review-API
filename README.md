# Book Review API

A RESTful API for managing books and reviews, built with Node.js, Express, and MongoDB.

## Features

- User authentication (JWT)
- Book management
- Review system
- Search functionality
- Pagination and filtering

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Start the server: `npm run dev`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Books
- `POST /api/books` - Add a new book (Authenticated)
- `GET /api/books` - Get all books (with pagination and filtering)
- `GET /api/books/:id` - Get book details
- `GET /api/books/search?query=...` - Search books

### Reviews
- `POST /api/books/:id/reviews` - Add a review (Authenticated)
- `PUT /api/reviews/:id` - Update your review (Authenticated)
- `DELETE /api/reviews/:id` - Delete your review (Authenticated)


## API Documentation

## API Documentation

You can find the full API documentation on [Apidog here](https://vba3ddpadn.apidog.io).

