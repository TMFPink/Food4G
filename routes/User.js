const express = require('express');
const router = express.Router();
const {Users} = require("../models")
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const {Name, Mail, Phone, DOB, Password, Address} = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = await Users.create({Name, Mail, Phone, DOB, Password: hashedPassword, Address});
    res.json(user); 
});
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
