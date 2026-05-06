const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

async function generateContent(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `
You are an expert code reviewer.

Review the given code and provide:
- Code quality feedback
- Performance suggestions
- Security issues (if any)
- Maintainability improvements
- Best practices

Keep the response concise and actionable.
`,
      generationConfig: {
        maxOutputTokens: 150, // 🔥 hard limit
        temperature: 0.3, // less verbose, more direct
      },
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini error:", error.message);

    // ✅ FALLBACK (prevents backend crash)
    return `
### AI Review (Fallback Mode)

⚠️ Gemini API quota exceeded or unavailable.

General Suggestions:
- Code structure looks fine.
- Add comments for clarity.
- Handle edge cases.
- Improve variable naming.
- Add error handling.

(This response is generated locally because AI quota is exhausted.)
`;
  }
}

module.exports = generateContent;
