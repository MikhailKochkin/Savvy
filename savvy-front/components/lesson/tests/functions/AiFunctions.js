export const generateHint = async (
  AIType,
  question,
  correctAnswer,
  comment,
  allHints,
  router,
  context
) => {
  // Set the AI type and URL based on the AIType parameter
  const AItype = "openai";
  const url = AItype === "claude" ? "/api/generate2" : "/api/generate";

  // Define an array of hinting methods
  const hintingMethods = [
    `Provide a detailed real-life situation that can help the student understand the problem.`,
    `Provide a short hint that will help the student look at the question from a different angle.`,
  ];

  // Check if all hinting methods have been used
  if (allHints.length >= hintingMethods.length) {
    return { newHint: "😔 I am out of hints.", type: "hint" };
  }
  // Construct the hint prompt
  const hintIntro = `You help your student answer this question ${question}. The correct answer is: ${correctAnswer}`;
  const hintAnswerRecommendations = `YOUR HINT MUST BE AROUND 50 WORDS!!!! 
  Answer in ${router.locale === "ru" ? "Russian" : "English"}. 
  Always address student as "You" and NEVER address the student as "STUDENT".  
  Break your hint into small paragraphs and return every paragraph in a <p> tag.`;
  const hintPrompt = `Give a hint to the student in a Socratic manner on what is the correct answer.
   Use this approach: ${
     hintingMethods[allHints.length]
   }. Use this information to create a hint: ${comment}
  Do NOT USE the words from the correct answer. DO NOT reveal the correct answer. `;
  try {
    // Make a POST request to the API endpoint
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt:
          // context +
          hintIntro + hintPrompt + hintAnswerRecommendations,
      }),
    });

    // Check if the response status is not 200 (OK)
    if (response.status !== 200) {
      throw (
        (await response.json()).error ||
        new Error(`Request failed with status ${response.status}`)
      );
    }

    // Parse the response data
    const data = await response.json();
    const result =
      AItype === "claude" ? data.result.content[0].text : data.result.content;
    // Return the generated hint if it exists, otherwise return a default message
    return result
      ? { newHint: result, type: "hint" }
      : { newHint: "Sorry, you are on your own", type: "hint" };
  } catch (error) {
    alert(error.message);
  }
};
