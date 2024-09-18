const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
});

// Delete a post
router.delete("/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const deletedPost = await Posts.destroy({ where: { id: postId } });
        if (deletedPost === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update a post
router.put("/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const updatedPost = req.body;
        
        const [numUpdated, updatedRows] = await Posts.update(updatedPost, {
            where: { id: postId },
            returning: true, // Return the updated rows
        });

        if (numUpdated === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(updatedRows[0]); // Return the updated post
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;