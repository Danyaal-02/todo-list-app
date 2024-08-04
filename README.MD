```markdown
# Basic To-Do List Application

A simple to-do list application with user authentication, session management, and CRUD operations for to-do items.

## Features

- User registration and login using Supabase
- CRUD operations for to-do items
- Session management
- MongoDB for data storage
- Backend deployed on Render
- Frontend deployed on Netlify

## Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: Supabase
- Frontend: React.js, TailwindCSS
- Deployment: Render (backend), Netlify (frontend)

## Repository Structure

- `backend/`: Contains the Node.js backend application
- `frontend/`: Contains the React frontend application

## Local Development

### Backend Setup

1. Clone the repository: `git clone https://github.com/yourusername/todo-list-app.git`
2. Navigate to the backend directory: `cd todo-list-app/backend`
3. Install dependencies: `npm install`
4. Create a `.env` file in the backend directory with the following content:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your_database_name
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

5. Start the backend server: `npm run dev`

### Frontend Setup

1. Navigate to the frontend directory: `cd ../frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the frontend directory with the following content:

```
VITE_API_URL=http://localhost:5000
```

4. Start the frontend development server: `npm run dev`

### Notes

- Make sure to replace the placeholder values in the `.env` files with your actual configuration details.
- The backend server will run on `http://localhost:5000` by default.
- The frontend development server typically runs on `http://localhost:3000` or `http://localhost:5173` (for Vite), but check the console output for the exact URL.

## API Documentation

### User Authentication

#### Register a new user

```
POST /api/v1/register

Request body:
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "securepassword"
}

Response:
{
  "success": true,
  "message": "User created successfully",
  "token": "jwt_token_here"
}
```

#### Login

```
POST /api/v1/login

Request body:
{
  "email": "user@example.com",
  "password": "securepassword"
}

Response:
{
  "success": true,
  "message": "User logged in successfully",
  "user": {
    // User details
  },
  "token": "jwt_token_here",
  "sessionId": "session_id_here"
}
```

#### Logout

```
GET /api/v1/logout

Headers:
Authorization: Bearer jwt_token_here

Response:
{
  "message": "Logged out successfully"
}
```

#### Get user sessions

```
GET /api/v1/sessions

Headers:
Authorization: Bearer jwt_token_here

Response:
{
  "success": true,
  "message": "Sessions retrieved successfully",
  "sessions": [
    // Array of session objects
  ]
}
```

### To-Do Operations

#### Create a new to-do item

```
POST /api/v1/todos

Headers:
Authorization: Bearer jwt_token_here

Request body:
{
  "title": "Complete project",
  "description": "Finish the to-do list application"
}

Response:
{
  "success": true,
  "data": {
    // Created todo object
  }
}
```

#### Get all to-do items

```
GET /api/v1/todos

Headers:
Authorization: Bearer jwt_token_here

Response:
{
  "success": true,
  "data": [
    // Array of todo objects
  ]
}
```

#### Update a to-do item

```
PUT /api/v1/todos/:id

Headers:
Authorization: Bearer jwt_token_here

Request body:
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}

Response:
{
  "success": true,
  "message": "Todo updated successfully"
}
```

#### Delete a to-do item

```
DELETE /api/v1/todos/:id

Headers:
Authorization: Bearer jwt_token_here

Response:
{
  "success": true,
  "data": [],
  "message": "Todo deleted successfully"
}
```

## Sample Login Credentials

Use the following credentials to log in:

- **Email:** todo-list-app@guerrillamail.org
- **Password:** qwertyui

## Deployment

- Backend: Deployed on Render
- Frontend: Deployed on Netlify

## Links

- [Backend Deployment](https://todo-list-app-bxqn.onrender.com)
- [Frontend Deployment](https://todo-list-app-0.netlify.app/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
```