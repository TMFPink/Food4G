const express = require('express');
const router = express.Router();
const { TrackedFood } = require('../models');
const { where } = require('sequelize');
const { sequelize } = require('../models'); // Ensure sequelize is imported

/**
 * @swagger
 * tags:
 *   name: TrackFood
 *   description: Food tracking routes
 */

/**
 * @swagger
 * /track-food/add:
 *   post:
 *     summary: Add food to tracking
 *     tags: [TrackFood]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserID:
 *                 type: integer
 *               Calories:
 *                 type: number
 *               Protein:
 *                 type: number
 *               Carb:
 *                 type: number
 *               Fat:
 *                 type: number
 *     responses:
 *       201:
 *         description: Food tracked successfully
 *       500:
 *         description: Internal server error
 */
router.post("/add", async (req, res) => {
    try {
        const { UserID, Calories, Protein, Carb, Fat } = req.body;
        const trackedFood = await TrackedFood.create({ UserID, Calories, Protein, Carb, Fat });
        res.status(201).json(trackedFood);
    } catch (error) {
        console.error('Error tracking food:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @swagger
 * /track-food/{userId}:
 *   get:
 *     summary: Get daily nutrition for a user
 *     tags: [TrackFood]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Daily nutrition retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log('userid',userId)
    try {
        const dailyNutrition = await TrackedFood.findAll({
            where: { UserID: userId },
            attributes: [
                [sequelize.fn('SUM', sequelize.col('Calories')), 'totalCalories'],
                [sequelize.fn('SUM', sequelize.col('Protein')), 'totalProtein'],
                [sequelize.fn('SUM', sequelize.col('Fat')), 'totalFat'],
                [sequelize.fn('SUM', sequelize.col('Carb')), 'totalCarb'],
                [sequelize.fn('DATE', sequelize.col('DateTracked')), 'date']
            ],
            group: ['date'],
            order: [['date', 'DESC']]
        });
        res.status(200).json(dailyNutrition);
    } catch (error) {
        console.error('Error fetching daily nutrition:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post("/",async(req,res)=>{
    try {
        const { uid } = req.body;
        const trackedFood = await TrackedFood.findOne({where:{userId:uid}});
        res.status(201).json(trackedFood);
    } catch (error) {
        console.error('Error tracking food:', error);
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router;