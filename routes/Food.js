const express = require('express');
const router = express.Router();
const { Food, FoodType, FoodIngredients } = require('../models');

/**
 * @swagger
 * tags:
 *   name: Food
 *   description: Food management routes
 */

/**
 * @swagger
 * /food/{id}:
 *   get:
 *     summary: Get food item by ID along with its ingredients
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Food ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item retrieved successfully along with ingredients
 *       404:
 *         description: Food not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await Food.findByPk(foodId);
        if (!food) {
            return res.status(404).json({ error: "Food not found" });
        }


        res.json(food );
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @swagger
 * /food/type/{type}:
 *   get:
 *     summary: Get food items by type
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Food type
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of food items retrieved successfully
 *       404:
 *         description: Food type not found
 *       500:
 *         description: Internal server error
 */
router.get('/type/:type', async (req, res) => {
    try {
        const foodType = req.params.type;
        const typeRecord = await FoodType.findOne({ where: { TypeName: foodType } });

        if (!typeRecord) {
            return res.status(404).json({ error: 'Food type not found' });
        }

        const foods = await Food.findAll({ where: { FoodTypeID: typeRecord.id } });
        res.json(foods);
    } catch (error) {
        console.error('Error fetching food by type:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @swagger
 * /food:
 *   get:
 *     summary: Get all food items
 *     tags: [Food]
 *     responses:
 *       200:
 *         description: List of all food items retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
    try {
        const listOfFood = await Food.findAll();
        res.json(listOfFood);
    } catch (error) {
        console.error('Error fetching all food items:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @swagger
 * /food:
 *   post:
 *     summary: Create a new food item
 *     tags: [Food]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FoodName:
 *                 type: string
 *               Calories:
 *                 type: number
 *               Protein:
 *                 type: number
 *               Fat:
 *                 type: number
 *               Carb:
 *                 type: number
 *               Instruction:
 *                 type: string
 *               Image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Food item created successfully
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /food/ingre:
 *   get:
 *     summary: Get all food ingredients
 *     tags: [Food]
 *     responses:
 *       200:
 *         description: List of all food ingredients retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/ingre", async (req, res) => {
  try {
      const listOfFood = await FoodIngredients.findAll();
      res.json(listOfFood);
  } catch (error) {
      console.error('Error fetching all food items:', error);
      res.status(500).json({ error: 'Server error' });
  }
})
module.exports = router;
