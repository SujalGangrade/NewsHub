import express from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import Admin from '../models/Admin.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

// Generate JWT token
const generateToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// POST /api/auth/login - Admin login
router.post('/login', [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
], validate, asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Find admin by credentials
    const admin = await Admin.findByCredentials(username, password);
    
    // Generate token
    const token = generateToken(admin._id);
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        },
        token
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
}));

// POST /api/auth/register - Register new admin (Super admin only or first admin)
router.post('/register', [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-30 characters and contain only letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['admin', 'super_admin', 'user'])
    .withMessage('Role must be admin, super_admin, or user')
], validate, asyncHandler(async (req, res) => {
  const { username, email, password, role = 'user' } = req.body;
  
  // Check if this is the first admin
  const adminCount = await Admin.countDocuments({});
  const isFirstAdmin = adminCount === 0;
  
  // If not first admin and trying to create admin/super_admin, require super admin auth
  if (!isFirstAdmin) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const currentAdmin = await Admin.findById(decoded.adminId);
      
      if (!currentAdmin || currentAdmin.role !== 'super_admin') {
        return res.status(403).json({
          success: false,
          message: 'Only Super Admin can create admin users'
        });
      }
      
      // If creating admin user, use the helper method
      if (role === 'admin') {
        const admin = await Admin.createAdminUser({ username, email, password }, currentAdmin);
        const token = generateToken(admin._id);
        
        return res.status(201).json({
          success: true,
          message: 'Admin user created successfully',
          data: {
            admin: {
              id: admin._id,
              username: admin.username,
              email: admin.email,
              role: admin.role
            },
            token
          }
        });
      }
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  }
  
  // Check if username or email already exists
  const existingAdmin = await Admin.findOne({
    $or: [{ username }, { email }]
  });
  
  if (existingAdmin) {
    return res.status(400).json({
      success: false,
      message: 'Username or email already exists'
    });
  }
  
  // Create new admin
  const admin = new Admin({
    username,
    email,
    password,
    role: isFirstAdmin ? 'super_admin' : role
  });
  
  await admin.save();
  
  // Generate token
  const token = generateToken(admin._id);
  
  res.status(201).json({
    success: true,
    message: `${isFirstAdmin ? 'Super Admin' : 'User'} registered successfully`,
    data: {
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      },
      token
    }
  });
}));

// POST /api/auth/create-admin - Create admin user (Super Admin only)
router.post('/create-admin', [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-30 characters and contain only letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
], validate, asyncHandler(async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentAdmin = await Admin.findById(decoded.adminId);
    
    if (!currentAdmin || currentAdmin.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Only Super Admin can create admin users'
      });
    }

    const { username, email, password } = req.body;
    
    // Check if username or email already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }]
    });
    
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Username or email already exists'
      });
    }
    
    const admin = await Admin.createAdminUser({ username, email, password }, currentAdmin);
    
    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          createdBy: admin.createdBy
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}));

// POST /api/auth/verify - Verify token
router.post('/verify', asyncHandler(async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId);
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    res.json({
      success: true,
      data: {
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
}));

export default router;