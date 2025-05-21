🗃️ Database Schema
👤 User Model
js
Copy
Edit
{
  name: String, // required
  email: String, // unique, validated
  password: String, // hashed
  createdAt: Date
}
📘 Book Model
js
Copy
Edit
{
  title: String, // required
  author: String, // required
  genre: String, // required
  publishedYear: Number,
  ratingsAverage: Number,
  ratingsQuantity: Number,
  createdAt: Date
}
📝 Review Model
js
Copy
Edit
{
  review: String, // required
  rating: Number (1–5),
  book: ObjectId, // Reference to Book
  user: ObjectId, // Reference to User
  createdAt: Date
}
🔁 Relationships
mermaid
Copy
Edit
erDiagram
  USER ||--o{ REVIEW : writes
  BOOK ||--o{ REVIEW : has

  USER {
    ObjectId _id
    string name
    string email
    string password
    date createdAt
  }

  BOOK {
    ObjectId _id
    string title
    string author
    string genre
    number publishedYear
    number ratingsAverage
    number ratingsQuantity
    date createdAt
  }

  REVIEW {
    ObjectId _id
    string review
    number rating
    ObjectId book
    ObjectId user
    date createdAt
  }
