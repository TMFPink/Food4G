const express = require('express');
const router = express.Router();
const { FoodIntake } = require('../models');

/**
 * @swagger
 * tags:
 *   name: Intake
 *   description: Food intake management routes
 */

/**
 * @swagger
 * /intake/{userId}:
 *   get:
 *     summary: Get food intake records for a specific user
 *     tags: [Intake]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to fetch food intake records for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food intake records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 Calories:
 *                   type: number
 *                 Protein:
 *                   type: number
 *                 Fat:
 *                   type: number
 *                 Carb:
 *                   type: number
 *       404:
 *         description: No food intake records found for this user
 *       500:
 *         description: Internal server error
 */
router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const foodIntakes = await FoodIntake.findOne({ where: { userId } }); // Fetch food intake records for a specific user
        if (foodIntakes.length === 0) {
            return res.status(404).json({ error: 'No food intake records found for this user' });
        }
        res.status(200).json(foodIntakes); // Return the food intake records as JSON
    } catch (error) {
        console.error('Error fetching food intake records for user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
/**
 * @swagger
 * /intake:
 *   post:
 *     summary: Create or update a food intake record
 *     tags: [Intake]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               Calories:
 *                 type: number
 *               Protein:
 *                 type: number
 *               Fat:
 *                 type: number
 *               Carb:
 *                 type: number
 *     responses:
 *       200:
 *         description: Food intake record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 Calories:
 *                   type: number
 *                 Protein:
 *                   type: number
 *                 Fat:
 *                   type: number
 *                 Carb:
 *                   type: number
 *       201:
 *         description: Food intake record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 Calories:
 *                   type: number
 *                 Protein:
 *                   type: number
 *                 Fat:
 *                   type: number
 *                 Carb:
 *                   type: number
 *       500:
 *         description: Internal server error
 */

router.post("/", async (req, res) => {
    const { userId, Calories, Protein, Fat, Carb } = req.body;

    try {
        // Check if a record with the given userId already exists
        const existingRecord = await FoodIntake.findOne({ where: { userId } });

        if (existingRecord) {
            // Update the existing record
            existingRecord.Calories = Calories;
            existingRecord.Protein = Protein;
            existingRecord.Fat = Fat;
            existingRecord.Carb = Carb;
            await existingRecord.save(); // Save the updated record
            return res.status(200).json(existingRecord); // Return the updated record
        } else {
            // Create a new record
            const newFoodIntake = await FoodIntake.create({
                userId,
                Calories,
                Protein,
                Fat,
                Carb
            });
            return res.status(201).json(newFoodIntake); // Return the new record
        }
    } catch (error) {
        console.error('Error creating or updating food intake record:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;