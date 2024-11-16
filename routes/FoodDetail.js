const express = require('express');
const router = express.Router();
const {FoodIngredients} = require("../models")


router.get("/:FoodID", async (req,res) => {
    const FoodID = req.params.FoodID;
    const ListOfIngredients = await FoodIngredients.findAll({
        where: {
            FoodID
        }
    })
    res.json(ListOfIngredients)
});

module.exports = router;