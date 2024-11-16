const express = require('express');
const router = express.Router();
const { TrackedFood } = require('../models');
const { where } = require('sequelize');
const { sequelize } = require('../models'); // Ensure sequelize is imported


// Route to add food to tracking
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