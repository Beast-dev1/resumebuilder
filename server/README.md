# Resume Builder Server

Express.js backend server with MongoDB authentication for the Resume Builder application.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `server/` directory based on `.env.example`:

```env
PORT=3000
NODE_ENV=development

# MongoDB Connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/resume-builder

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-builder

# JWT Secret (use a strong random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Origin (frontend URL)
CLIENT_URL=http://localhost:5173
```

### 3. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in `.env`).

## API Endpoints

### Authentication Routes (`/api/auth`)

- **POST `/api/auth/signup`** - Register a new user
  - Body: `{ name: string, email: string, password: string }`
  - Returns: `{ success: true, data: { token: string, user: {...} } }`

- **POST `/api/auth/login`** - Authenticate user
  - Body: `{ email: string, password: string }`
  - Returns: `{ success: true, data: { token: string, user: {...} } }`

- **GET `/api/auth/me`** - Get current user (protected)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ success: true, data: { id, name, email, createdAt } }`

### Health Check

- **GET `/health`** - Server health check
  - Returns: `{ status: 'ok', message: 'Server is running' }`

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT tokens with 24-hour expiration
- CORS configuration for client origin
- Input validation and sanitization
- Secure error messages (no sensitive info leakage)

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": "Field-specific error message"
  }
}
```



