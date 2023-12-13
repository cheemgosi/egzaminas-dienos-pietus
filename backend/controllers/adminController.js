const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken package
const Admin = require('../models/Admin');

async function adminLogin(username, password) {
  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    return admin;
  } catch (error) {
    throw new Error(error.message);
  }
}

const generateToken = (payload) => {
    return jwt.sign(payload, 'secretkey45', { expiresIn: '1d' });
  };
  
  const verifyToken = (token) => {
    return jwt.verify(token, 'secretkey45'); 
  };

  const encryptUsername = async (username) => {
    try {
      const saltRounds = 10;
      const hashedUsername = await bcrypt.hash(username, saltRounds);
      return hashedUsername;
    } catch (error) {
      throw new Error('Encryption failed');
    }
  };
  
  module.exports = { adminLogin, encryptUsername, generateToken, verifyToken };
