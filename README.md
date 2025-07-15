# MERN Blog Application

A modern, full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application with a beautiful Bootstrap UI.

## Features
- Full CRUD for blog posts
- Category management
- Responsive, modern UI with Bootstrap
- Optimistic UI updates for post creation
- React Router navigation
- Custom React hooks for API calls
- Error and loading state handling

## Screenshots

### Post List
![Post List](client/screenshots/post-list.png)

### Create Post
![Create Post](client/screenshots/create-post.png)

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the repository
```
git clone <your-repo-url>
cd week-4-mern-integration-assignment-wenakanew
```

### 2. Server Setup
```
cd server
cp .env.example .env # Edit .env with your MongoDB URI
npm install
npm run dev
```

### 3. Client Setup
```
cd ../client
cp .env.example .env # Edit if needed
npm install
npm run dev
```

### 4. Open the app
Visit [http://localhost:5173](http://localhost:5173) in your browser.

## API Documentation
- `GET /api/posts` - List all posts
- `GET /api/posts/:id` - Get a single post
- `POST /api/posts` - Create a post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `GET /api/categories` - List categories
- `POST /api/categories` - Create a category

## Technologies Used
- MongoDB, Mongoose
- Express.js
- React.js, React Router
- Bootstrap 5
- Node.js

## Folder Structure
```
week-4-mern-integration-assignment-wenakanew/
├── client/    # React front-end
│   ├── src/
│   ├── public/
│   └── ...
├── server/    # Express.js back-end
│   ├── models/
│   ├── routes/
│   └── ...
└── README.md
```

## Author
- [Your Name]

---
Feel free to customize and extend this project for your needs! 
