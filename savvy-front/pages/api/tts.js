// pages/api/tts.js

import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { text, voice = "alloy" } = req.body;

  if (!text || text.trim().length === 0) {
    return res.status(400).json({ error: "Please provide valid text." });
  }

  try {
    // Generate speech using OpenAI TTS
    const response = await openai.audio.speech.create({
      model: "tts-1", // or "tts-1-hd" for higher quality
      voice, // Options: "alloy", "echo", "fable", "onyx", "nova", "shimmer"
      input: text,
    });

    // Save the file temporarily
    const tempFilePath = path.join("/tmp", "tts-output.mp3");
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(tempFilePath, buffer);

    // Send the audio file
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="tts-output.mp3"'
    );
    res.send(buffer);
  } catch (error) {
    console.error("OpenAI TTS Error:", error);
    res.status(500).json({ error: "TTS request failed." });
  }
}
