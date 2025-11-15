# TaskManagementAPI
A backend API that manages user tasks, allowing for flexible organization and search. This goes beyond a simple list by adding features like projects, due dates, and status.

Key Features
Fast Prototyping: Build on Node.js/Express.js, suitable for MVPs and applications requiring quick iteration.

NoSQL Flexibility: Utilizes MongoDB for scheman felxibility and scalability across distributed environments.

Secure Route Protection: Every CRUD route is protected by custom JWT middleware, ensuring only the authenticated user can access, modify, or delete their own tasks.

User-Task Ownership: Tasks are strictly linked to a User ID, guaranteeing multi-user data isolation.

Data Model(Task Schema)
// models/Task.js snippet
{
    user: { type: ObjectId, ref: 'User', required: true }, // Ownership link
    title: String,
    status: { type: String, enum: ['pending', 'completed'] },
    priority: { type: String, enum: ['low', 'medium', 'high'] }
}

Quick Start & Testing

Prerequisites

Node.js (LTS version) and npm

MongoDB Atlas Connection URI

Postman (for API testing)


Setup Steps

Install Dependencies: Run in project root:

npm install


Configure Environment: Create a .env file and add your connection string and secret:

MONGO_URI=mongodb+srv://[user]:[password]@[cluster]/taskdb?retryWrites=true&w=majority
JWT_SECRET=YOUR_LONG_COMPLEX_NODE_SECRET


Run Server:

node server.js


Test Flow (Postman)

Register User: POST http://localhost:5000/api/auth/register (Body: email, password, username)

Login: POST http://localhost:5000/api/auth/login. Copy the JWT Token.

Create Task (using JWT in Authorization: Bearer [token])

POST http://localhost:5000/api/tasks (Body: title, description, priority)

Retrieve Tasks (Ownership Check):

GET http://localhost:5000/api/tasks (Must return the task created in step 3).

Try the GET request without the token to verify a 401 Unauthorized error.

