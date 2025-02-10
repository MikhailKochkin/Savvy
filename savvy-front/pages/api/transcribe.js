// pages/api/transcribe.js

import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: {
        message: "OpenAI API key not configured.",
      },
    });
  }

  const { file, fileName, prompt = "" } = req.body;
  if (!file || !fileName) {
    return res.status(400).json({
      error: {
        message: "Please provide an audio file and a fileName",
      },
    });
  }

  try {
    // 1) Convert base64 -> Buffer
    const fileBuffer = Buffer.from(file, "base64");

    // 2) Write to a temp file (in Node, /tmp is generally allowed).
    //    If you’re deploying on Vercel, this should still work for short-lived usage.
    const tempFilePath = path.join("/tmp", fileName);
    fs.writeFileSync(tempFilePath, fileBuffer);

    // 3) Create a read stream from the temp file path
    const readStream = fs.createReadStream(tempFilePath);

    // 4) Call OpenAI Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1",
      prompt,
      response_format: "json",
    });

    res.status(200).json({ transcript: transcription.text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
