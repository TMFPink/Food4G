const express = require('express');
const router = express.Router();
const { FoodIngredients } = require('../models');


router.get("/", async (req, res) => {
    try {
        const listOfFood = await FoodIngredients.findAll();
        res.json(listOfFood);
    } catch (error) {
        console.error('Error fetching all food items:', error);
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router;
