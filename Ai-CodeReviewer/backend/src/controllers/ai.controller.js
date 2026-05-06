const aiService = require("../services/ai.service");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/* ===================== GET REVIEW ===================== */


/* Accept code from user → generate AI review → save to DB → return review. */
module.exports.getReview = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.userId;

    if (!code) {
      return res.status(400).json({ review: "Code is required." });
    }

    const review = await aiService(code);

    //save to db
    await prisma.prompt.create({
      data: { code, review, userId },
    });

    res.json({ review });
  } catch (err) {
    console.error("getReview error:", err.message);

    res.json({
      review:
        "AI service temporarily unavailable. Showing fallback response.",
    });
  }
};

/* ===================== GET PAST PROMPTS ===================== */

/* Fetch previous AI reviews of logged-in user. */
module.exports.getPastPrompts = async (req, res) => {
  try {
    const userId = req.user.userId;

    const prompts = await prisma.prompt.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(prompts);
  } catch (err) {
    console.error("getPastPrompts error:", err.message);
    res.status(500).json([]);
  }
};

/* ===================== UPDATE REVIEW ===================== */

/* Update code → regenerate AI review → save again. */
module.exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;

    const newReview = await aiService(code);

    const updated = await prisma.prompt.update({
      where: { id },
      data: { code, review: newReview },
    });

    res.json(updated);
  } catch (err) {
    console.error("updateReview error:", err.message);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ===================== DELETE REVIEW ===================== */
module.exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.prompt.delete({ where: { id } });

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("deleteReview error:", err.message);
    res.status(500).json({ message: "Delete failed" });
  }
};
