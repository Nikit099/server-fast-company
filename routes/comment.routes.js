const express = require("express")
const auth = require("../middleware/auth.middleware")
const router = express.Router({ mergeParams: true })
const Comment = require("../models/Comment")
router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query
      const list = await Comment.find({
        [orderBy]: equalTo,
      })
      res.send(list)
    } catch (e) {
      res.status(500).json({
        message: "На сервере ошибка",
      })
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id,
      })
      res.status(201).send(newComment)
    } catch (e) {
      res.status(500).json({
        message: "На сервере ошибка",
      })
    }
  })
router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params
    const removedComment = await Comment.findById(commentId)

    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.remove()
      return res.status(401).send("Unauthorized")
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере ошибка",
    })
  }
})

module.exports = router
