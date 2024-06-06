export default function handler(req, res) {
  try {
    const { url } = req.query;

    console.log("URL received:", url);

    if (!url) {
      console.log("URL parameter is missing");
      return res.status(400).send({ error: "URL parameter is missing" });
    }

    // Decode the incoming URL parameter
    const decodedUrl = decodeURIComponent(url);
    console.log("Decoded URL:", decodedUrl);

    // Check if the decoded URL is valid (optional, uncomment if needed)
    // if (!validUrl.isUri(decodedUrl)) {
    //   console.log("Invalid URL");
    //   return res.status(404).send({ error: "Invalid URL" });
    // }

    console.log("Valid URL:", decodedUrl);

    // Prepare the oEmbed response object
    const oEmbedResponse = {
      version: "1.0",
      type: "rich", // or 'video', 'photo', etc.
      title: "BeSavvy Simulator",
      author_name: "BeSavvy",
      author_url: "https://besavvy.app",
      provider_name: "BeSavvy",
      provider_url: "https://besavvy.app",
      cache_age: "86400", // Cache age in seconds
      html: `<iframe src="${decodedUrl}" width="800" height="600"></iframe>`, // Replace with your embed code
      width: 800,
      height: 600,
    };

    console.log("oEmbedResponse:", oEmbedResponse);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(oEmbedResponse);
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .send({ error: "Internal Server Error", details: error.message });
  }
}
