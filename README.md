# NewsHub - Full Stack News Website

A modern, responsive news website built with React.js, Node.js, Express.js, and MongoDB. Features a beautiful dark/light mode interface, admin dashboard for content management, and comprehensive news article system.

## 🚀 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Complete theme switching with localStorage persistence
- **Modern UI/UX**: Beautiful animations, hover effects, and micro-interactions
- **Search & Filter**: Real-time article search and category filtering
- **Loading States**: Skeleton loaders and smooth transitions
- **Error Boundaries**: Comprehensive error handling and user feedback

### Backend Features
- **RESTful API**: Complete CRUD operations for news articles
- **JWT Authentication**: Secure admin authentication system
- **MongoDB Integration**: Robust database with Mongoose ODM
- **Input Validation**: Comprehensive validation using express-validator
- **Security**: Helmet, CORS, rate limiting, and password hashing
- **Error Handling**: Centralized error handling middleware

### Admin Features
- **Protected Dashboard**: Secure admin interface for content management
- **Article Management**: Create, edit, delete, and publish articles
- **User Management**: Admin account system with role-based access
- **Analytics**: Article view tracking and engagement metrics

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **MongoDB** (v4.4 or higher) - Local installation or MongoDB Atlas account

## 📦 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd news-website
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
cd client
npm install
```

#### Backend Dependencies
```bash
cd ../server
npm install
```

### 3. Environment Configuration

#### Backend Environment (.env)
Create a `.env` file in the `server` directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/newsdb
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/newsdb

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_123456789

# Admin Configuration (for seeding)
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@newsapp.com
ADMIN_PASSWORD=admin123
```

#### Frontend Environment (Optional)
Create a `.env` file in the `client` directory if needed:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed Database (Optional)
```bash
cd server
node utils/seedData.js
```

## 🚀 Running the Application

### Development Mode

#### Start Backend Server
```bash
cd server
npm run dev
# or
npm start
```
The server will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd client
npm run dev
```
The client will run on `http://localhost:3000`

### Production Mode

#### Build Frontend
```bash
cd client
npm run build
```

#### Start Production Server
```bash
cd server
NODE_ENV=production npm start
```

## 🎨 Project Structure

```
news-website/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   └── vite.config.js     # Vite configuration
├── server/                # Node.js backend
│   ├── middleware/        # Express middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── server.js         # Server entry point
│   ├── package.json      # Backend dependencies
│   └── .env.example      # Environment template
├── README.md             # Project documentation
└── .gitignore           # Git ignore rules
```

## 🔧 Key Features Explained

### Dark Mode Implementation
- Uses Tailwind CSS `dark:` variants
- Theme preference stored in localStorage
- Smooth transitions between themes
- System preference detection

### Authentication System
- JWT-based authentication
- Password hashing with bcryptjs
- Account lockout after failed attempts
- Role-based access control

### Database Models
- **News Model**: Articles with validation, indexing, and virtual fields
- **Admin Model**: User management with security features

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing protection
- **Rate Limiting**: API request limiting
- **Input Validation**: Comprehensive validation and sanitization
- **Password Hashing**: Secure password storage
- **JWT Authentication**: Stateless authentication

## 🔑 Super Admin Credentials

**Username**: `admin`  
**Password**: `admin123`

### Super Admin Features
Only the super admin has the right to create a new editor who can:
- Post articles
- Edit articles
- Delete articles
