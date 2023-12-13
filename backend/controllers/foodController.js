const Food = require('../models/Food');

const addFood = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newFood = new Food({ name, description, price });
    await newFood.save();
    res.status(201).json({ message: 'Food added successfully', food: newFood });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteFood = async (req, res) => {
    try {
      const foodId = req.params.id;
      const deletedFood = await Food.findByIdAndDelete(foodId);
      
      if (!deletedFood) {
        return res.status(404).json({ message: 'Food not found' });
      }
      
      res.status(200).json({ message: 'Food deleted successfully', deletedFood });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const editFood = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price } = req.body;
  
      const updatedFood = await Food.findByIdAndUpdate(id, { name, description, price }, { new: true });
  
      if (!updatedFood) {
        return res.status(404).json({ message: 'Food not found' });
      }
  
      res.status(200).json({ message: 'Food updated successfully', updatedFood });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const likeFood = async (req, res) => {
    try {
      const foodId = req.params.id;
  
      const foodToUpdate = await Food.findById(foodId);
  
      if (!foodToUpdate) {
        return res.status(404).json({ message: 'Food not found' });
      }
  
      // Increment the likes count by 1
      foodToUpdate.likes = (foodToUpdate.likes || 0) + 1;
  
      const updatedFood = await foodToUpdate.save();
  
      res.status(200).json({ message: 'Likes count incremented successfully', updatedFood });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getFoodLikes = async (req, res) => {
    try {
      const foodId = req.params.id;
  
      const food = await Food.findById(foodId);
  
      if (!food) {
        return res.status(404).json({ message: 'Food not found' });
      }
  
      res.status(200).json({ likes: food.likes || 0 });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Export the likeFood function along with other controller functions
  module.exports = {
    addFood,
    getAllFoods,
    deleteFood,
    editFood,
    likeFood,
    getFoodLikes 
  };
