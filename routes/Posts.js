const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Blog post management routes
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               postText:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
});

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               postText:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
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