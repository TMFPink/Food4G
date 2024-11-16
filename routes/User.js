const express = require('express');
const router = express.Router();
const {Users} = require("../models")
const bcrypt = require("bcrypt");

router.post("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { Aim, Weight, Height } = req.body;

    try {
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        // Update user details
        await user.update({ Aim, Weight, Height });
        res.json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the user" });
    }
});

router.post("/get-me",async(req,res)=>{
    const {uid} = req.body
    try {
        const user = await Users.findByPk(uid);  
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
})



module.exports = router;
