const express = require('express');
const router = express.Router();
const {Users} = require("../models")
const bcrypt = require("bcrypt");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * /users/update/{id}:
 *   post:
 *     summary: Update user details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Aim:
 *                 type: string
 *               Weight:
 *                 type: number
 *               Height:
 *                 type: number
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /users/get-me:
 *   post:
 *     summary: Get current user details
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
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
