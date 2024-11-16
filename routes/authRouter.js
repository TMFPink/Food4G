const express = require('express');
const router = express.Router();
const {Users} = require("../models")
const bcrypt = require("bcrypt");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Mail:
 *                 type: string
 *               Phone:
 *                 type: string
 *               DOB:
 *                 type: string
 *                 format: date
 *               Password:
 *                 type: string
 *               Address:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", async (req, res) => {
    const {Name, Mail, Phone, DOB, Password, Address} = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = await Users.create({Name, Mail, Phone, DOB, Password: hashedPassword, Address});
    res.json(user); 
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Mail:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: User doesn't exist or wrong credentials
 */
router.post("/login", async (req, res) => {
    const { Mail, Password } = req.body;
    const user = await Users.findOne({ where: { Mail: Mail } });
    if (!user) {
        res.json({ error: "User Doesn't Exist" });
        }else {
            bcrypt.compare(Password, user.Password).then((match) => {
                if (!match) {
                    res.status(400).json({ error: "Wrong Username And Password Combination" });
                } else {
                    res.json({ message: "YOU LOGGED IN!!!", user: user });
                }
            }); 
        }
    });
    


module.exports = router;
