import validUrl from "valid-url";

export default function handler(req, res) {
  const { simulatorId } = req.query;
  console.log("simulatorId", simulatorId, req.query);

  // Check if the requested URL is valid and corresponds to a page in your app

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

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(oEmbedResponse);
}
