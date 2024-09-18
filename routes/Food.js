const express = require('express');
const router = express.Router();
const { Food, FoodType } = require('../models');

// Route to get food items by type
router.get('/byType/:type', async (req, res) => {
  try {
    const foodType = req.params.type;
    // Find the FoodType record by TypeName
    const typeRecord = await FoodType.findOne({ where: { TypeName: foodType } });

    if (!typeRecord) {
      return res.status(404).json({ error: 'Food type not found' });
    }

    // Find all food items with the matching FoodTypeID
    const foods = await Food.findAll({ where: { FoodTypeID: typeRecord.id } });

    res.json(foods);
  } catch (error) {
    console.error('Error fetching food by type:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Your existing routes for getting all food items, creating new food items, and getting a single food item by ID can remain unchanged.

router.get("/", async (req, res) => {
  try {
    const listOfFood = await Food.findAll();
    res.json(listOfFood);
  } catch (error) {
    console.error('Error fetching all food items:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post("/", async (req, res) => {
  try {
    const food = req.body;
    await Food.create(food);
    res.json(food);
  } catch (error) {
    console.error('Error creating new food item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/:id", async (req, res) => {
  try {
      const foodId = req.params.id;
      const food = await Food.findByPk(foodId);
      if (!food) {
          return res.status(404).json({ error: "Food not found" });
      }
      res.json(food);
  } catch (error) {
      console.error('Error fetching food by ID:', error);
      res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;
