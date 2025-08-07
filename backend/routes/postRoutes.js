const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: "게시글 조회 실패" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "게시글 없음" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: "조회 실패" });
    }
});


router.post("/", async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const saved = await newPost.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: "작성 실패", message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updated) return res.status(404).json({ message: "수정할 글 없음" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: "수정 실패" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "삭제할 글 없음" });
        res.json({ message: "삭제 완료", deleted });
    } catch (err) {
        res.status(500).json({ error: "삭제 실패" });
    }
});
module.exports = router;
