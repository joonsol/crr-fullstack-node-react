const express = require("express")
const router = express.Router();
const Post = require("../models/Post")



router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body)
    const saved = await newPost.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ error: "작성 실패", message: error.message })
  }
})

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.status(201).json(posts)
  } catch (error) {
    res.status(400).json({ error: "작성 실패", message: error.message })
  }
})
router.get("/:id", async (req, res) => {
  try {

    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: "게시글 없음" })
    res.status(201).json(post)
  } catch (error) {
    res.status(400).json({ error: "작성 실패", message: error.message })
  }
})
router.put("/:id", async (req, res) => {
  try {

    const updated = await Post.findByIdAndUpdate(req.params.id,
      req.body,
      { new: true }
    )
    if (!updated) return res.status(404).json({ message: "수정할 글 없음" })
    res.status(201).json(updated)

  } catch (error) {
    res.status(400).json({ error: "작성 실패", message: error.message })
  }
})
router.delete("/:id", async (req, res) => {
  try {

    const deleted = await Post.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: "삭제 할 글 없음" })
    res.status(201).json({message:"삭제게시글",post: deleted,})

  } catch (error) {
    res.status(400).json({ error: "작성 실패", message: error.message })
  }
})

module.exports = router