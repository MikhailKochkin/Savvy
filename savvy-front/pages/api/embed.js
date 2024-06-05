export default function handler(req, res) {
  try {
    const { simulatorId } = req.query;
    console.log("Request query:", req.query);

    // Check if the requested simulatorId is valid
    if (!simulatorId) {
      console.log("Invalid simulatorId");
      return res.status(404).send({ error: "Invalid simulatorId" });
    }

    console.log("Valid simulatorId:", simulatorId);

    // Prepare the oEmbed response object
    const oEmbedResponse = {
      type: "rich", // or 'video', 'photo', etc.
      version: "1.0",
      title: "BeSavvy Simulator",
      author_name: "Mike",
      provider_name: "BeSavvy",
      provider_url: "https://besavvy.app",
      cache_age: "86400", // Cache age in seconds
      html: `<iframe src="https://besavvy.app/embeddedPage?id=${simulatorId}" width="800" height="600"></iframe>`, // Replace with your embed code
    };

    console.log("oEmbedResponse:", oEmbedResponse);

    res.setHeader("Access-Control-Allow-Origin", "*"); // CORS header for debugging purposes
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(oEmbedResponse);
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .send({ error: "Internal Server Error", details: error.message });
  }
}
