import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});
export default async function (req, res) {
  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const prompt = req.body.prompt || "";
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt",
      },
    });
    return;
  }
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 2048,
      temperature: 0.5,
    });
    // console.log("completion", completion.choices[0].message);

    res.status(200).json({ result: completion.choices[0].message });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
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

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Check if this text:
  <p>LLC can't use the word “Russia” in names of LLC without permission. This prohibition is specified in Article 1473 of the Civil Code of the Russian Federation.</p>
    <p>The derivatives regulation is similar.</p>
      <p>We have to get the special permit for using this worlds.</p>
      consists of paragraphs written using the following structure: a topic sentence, supporting sentences and a concluding sentence. 
  `;
}
