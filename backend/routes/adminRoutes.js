const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const foodController = require('../controllers/foodController');


router.post('/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await adminController.adminLogin(username, password);
  
      const encryptedToken = adminController.generateToken({ username });
  
      res.cookie('adminToken', encryptedToken, { maxAge: 86400000, httpOnly: true });
      res.status(200).json({ message: 'Login successful', admin });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  });
  
router.get('/admin/decryptCookie', async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.adminToken) {
      throw new Error('Token not found');
    }

    const encryptedToken = req.cookies.adminToken;

    const decryptedToken = adminController.verifyToken(encryptedToken); // Verify and decrypt the token

    res.status(200).json({ decryptedToken });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});
  
router.post('/admin/add-food', foodController.addFood);
router.get('/foods', foodController.getAllFoods);
router.delete('/foods/:id', foodController.deleteFood);
router.put('/foods/:id', foodController.editFood);
router.post('/foods/:id/like', foodController.likeFood);


  

module.exports = router;
