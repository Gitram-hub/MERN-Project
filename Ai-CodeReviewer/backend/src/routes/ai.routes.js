const express = require("express");
const aiController = require("../controllers/ai.controller");
const { authMiddleware } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/get-review", authMiddleware, aiController.getReview);
router.get("/past-prompts", authMiddleware, aiController.getPastPrompts);
router.put("/past-prompts/:id", authMiddleware, aiController.updateReview);
router.delete("/past-prompts/:id", authMiddleware, aiController.deleteReview);

module.exports = router;
