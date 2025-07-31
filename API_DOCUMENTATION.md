# API Documentation - User Management

## Base URL
```
https://syllabus-backend.onrender.com/api/auth
```

## Authentication
All endpoints require authentication via JWT token in the header:
```
x-access-token: <your-jwt-token>
```

## Authentication Endpoints

### Login (Sign In)
**POST** `/signin`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "roles": ["ROLE_ADMIN", "ROLE_USER"],
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Register (Sign Up)
**POST** `/signup`

**Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "roles": ["user", "docente"]
}
```

**Response:**
```json
{
  "message": "User was registered successfully!"
}
```

## User Management Endpoints

### 1. Get All Users
**GET** `/users`

**Headers:**
- `x-access-token`: JWT token (required)
- Requires admin role

**Response:**
```json
[
  {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "roles": ["admin", "user"]
  }
]
```

### 2. Get User by ID
**GET** `/users/:id`

**Headers:**
- `x-access-token`: JWT token (required)
- Requires admin role

**Response:**
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "roles": ["admin", "user"]
}
```

### 3. Create User
**POST** `/users`

**Headers:**
- `x-access-token`: JWT token (required)
- Requires admin role

**Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "roles": ["user", "docente"]
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "userId": 2
}
```

### 4. Update User
**PUT** `/users/:id`

**Headers:**
- `x-access-token`: JWT token (required)
- Requires admin role

**Body:**
```json
{
  "username": "updateduser",
  "email": "updated@example.com",
  "password": "newpassword", // optional
  "roles": ["user", "estudiante"]
}
```

**Response:**
```json
{
  "message": "User updated successfully"
}
```

### 5. Delete User
**DELETE** `/users/:id`

**Headers:**
- `x-access-token`: JWT token (required)
- Requires admin role

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

### 6. Get All Roles
**GET** `/roles`

**Headers:**
- `x-access-token`: JWT token (required)
- Requires admin role

**Response:**
```json
[
  {
    "id": 1,
    "name": "user"
  },
  {
    "id": 2,
    "name": "moderator"
  },
  {
    "id": 3,
    "name": "admin"
  },
  {
    "id": 4,
    "name": "docente"
  },
  {
    "id": 5,
    "name": "estudiante"
  },
  {
    "id": 6,
    "name": "operador_sistema"
  },
  {
    "id": 7,
    "name": "coordinador"
  },
  {
    "id": 8,
    "name": "secretaria"
  },
  {
    "id": 9,
    "name": "decano"
  },
  {
    "id": 10,
    "name": "comision_silabos"
  }
]
```

## Available Roles

The system supports the following roles:

1. **user** - Basic user role
2. **moderator** - Moderator role
3. **admin** - Administrator role
4. **docente** - Teacher role
5. **estudiante** - Student role
6. **operador_sistema** - System operator role
7. **coordinador** - Coordinator role
8. **secretaria** - Secretary role
9. **decano** - Dean role
10. **comision_silabos** - Syllabus commission role

## Error Responses

### 401 Unauthorized
```json
{
  "message": "No token provided!"
}
```

### 403 Forbidden
```json
{
  "message": "Require Admin Role!"
}
```

### 404 Not Found
```json
{
  "message": "User Not found."
}
```

### 400 Bad Request
```json
{
  "message": "Failed! Username is already in use!"
}
```
```json
{
  "message": "Failed! Email is already in use!"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error message"
}
```

## Frontend Integration

The frontend component `UserManagement.js` is already configured to work with these APIs. It includes:

- User listing with roles display
- User creation with role assignment
- User editing with role updates
- User deletion with confirmation
- Real-time form validation
- Error and success message handling
- Loading states

## Security Notes

1. All endpoints require authentication via JWT token
2. Only users with admin role can access user management endpoints
3. Passwords are hashed using bcrypt before storage
4. User passwords are never returned in API responses
5. Role validation is performed on both frontend and backend
6. Login now uses email instead of username for authentication 