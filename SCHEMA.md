
# 📦 Database Schema Documentation

## 👤 User Model (`User.model.js`)
```javascript
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide your name'],
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

## 📘 Book Model (`Book.model.js`)
```javascript
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A book must have a title'],
    trim: true,
    index: true
  },
  author: {
    type: String,
    required: [true, 'A book must have an author'],
    trim: true,
    index: true
  },
  genre: {
    type: String,
    required: [true, 'A book must have a genre'],
    trim: true
  },
  publishedYear: {
    type: Number,
    min: [1000, 'Year must be greater than 1000'],
    max: [new Date().getFullYear(), `Year must be less than ${new Date().getFullYear()}`]
  },
  ratingsAverage: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be above 0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

bookSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'book',
  localField: '_id'
});

bookSchema.index({ title: 'text', author: 'text' });
```

## ✍️ Review Model (`Review.model.js`)
```javascript
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review cannot be empty'],
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'A review must have a rating']
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    required: [true, 'Review must belong to a book']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

reviewSchema.index({ book: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function(bookId) {
  const stats = await this.aggregate([
    { $match: { book: bookId } },
    { 
      $group: {
        _id: '$book',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Book').findByIdAndUpdate(bookId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await mongoose.model('Book').findByIdAndUpdate(bookId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.book);
});

reviewSchema.post(/^findOneAnd/, async function(doc) {
  if (doc) await doc.constructor.calcAverageRatings(doc.book);
});
```

## 📊 Entity Relationship Diagram
```erdiagram
erDiagram
  USER ||--o{ REVIEW : "writes"
  BOOK ||--o{ REVIEW : "has"
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
```
