
import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

router.post("/readme", async (req, res) => {
  try {
    const { projectName, description, technologies, features } = req.body;

    if (!projectName || !description) {
      return res.status(400).json({
        message: "Project name and description are required.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        message: "Gemini API key is not configured in server/.env",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a professional GitHub README.md in Markdown.
Use only the supplied project details. Include overview, features,
technologies, installation, usage, and contribution sections.
Do not invent unsupported project-specific facts.

Project name: ${projectName}
Description: ${description}
Technologies: ${JSON.stringify(technologies)}
Features: ${JSON.stringify(features)}`,
    });

    res.json({ readme: response.text });
  } catch (error) {
    console.error("Gemini README error:", error.message);
    res.status(500).json({
      message: "README generation failed. Check Gemini API configuration and usage limits.",
    });
  }
});

export default router;
