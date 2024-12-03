import Fuse from "fuse.js";

const removeTags = (inputString) => {
  // Define regular expression to match popular HTML tags
  const regex =
    /<\/?(?:p|b|li|strong|em|u|h[1-6]|ol|ul|span|div|a|img|br|hr)[^>]*>/gi;
  let result;

  // Remove HTML tags from the input string
  if (inputString) {
    result = inputString.replace(regex, "").replace(/\s+/g, " ").trim();
  } else {
    result = "";
  }

  return result;
};

export const getKeywords = async (question) => {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: `Return only 2 key keywords from this string ${question} so that I can use it in the text search.
      Find professional terms. For example: Narrow AI, unsupervised learning, Sarbanes-Oxley Act, legal entity, Artificial General Intelligence, Intellectual Property (IP), Patent Infringement, Trademark Dilution, 
      Copyright Fair Use, Non-Disclosure Agreement (NDA), Fiduciary Duty, Breach of Contract, Tortious Interference, Vicarious Liability, Statute of Limitations, Due Diligence, Injunctive Relief, 
      Liquidated Damages, Indemnification Clause, Arbitration Clause, Force Majeure, Jurisdiction and Venue, Severability Clause, Confidentiality Agreement, Intellectual Property Licensing.
      Avoid generic terms that might confuse the search: learning, entity, intelligence, attention, Law, Legal, Contract, Agreement, Court, Lawyer, Attorney, Judge, Lawsuit, Dispute.
      The result should look like this: "keyword1", "keyword2". If you find only generic terms, return "".`,
    }),
  });

  if (response.status !== 200) {
    throw (
      (await response.json()).error ||
      new Error(`Request failed with status ${response.status}`)
    );
  }

  const data = await response.json();
  return data.result.content;
};

export const getAnswerFromSource = async (question, source) => {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: `Answer this question in 2 sentences: ${question} using this source: ${source}. 
      ONLY USE INFORMATION FROM THE SOURCE TO ANSWER THE QUESTION. MAKE EXPLANATIONS AS SIMPLE AS IF YOU ARE SPEAKING to a high school student.
      If the source does not contain this information, return that you do not have this information right now.`,
    }),
  });

  if (response.status !== 200) {
    throw (
      (await response.json()).error ||
      new Error(`Request failed with status ${response.status}`)
    );
  }

  const data = await response.json();
  return data.result.content;
};

// Function to search for relevant results using keywords
export const searchForRelevantResults = (keywords, library, options) => {
  // Split and trim the keywords
  const keywordsArray = keywords.split(",").map((keyword) => keyword.trim());

  // Create a new Fuse instance with the searchable library and options
  const fuse = new Fuse(library, options);

  // Search for relevant results using the keywords
  const searchResults = [
    ...fuse.search(keywordsArray[0]),
    ...fuse.search(keywordsArray[1] || keywordsArray[0]),
  ];

  // Sort search results by relevance score in descending order
  searchResults.sort((a, b) => a.score - b.score);
  return searchResults;
};

export const findRelevantTextInSource = async (question, source, size) => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `
        Carefully analyze this text and find a piece that may be used to answer the question. 

        Question: """ ${question} """
        Text: """ ${source} """
        
        The piece MUST BE ${size} chars long.
        Return the relevant piece of text without HTML tags and without making any changes or modifications to it.
        `,
      }),
    });

    if (response.status !== 200) {
      throw (
        (await response.json()).error ||
        new Error(`Request failed with status ${response.status}`)
      );
    }

    const data = await response.json();
    const relevantText = data.result.content.trim();
    return relevantText;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const compareTexts = async (text1, text2) => {
  // Prepare the data object for comparison
  const data = {
    answer1: text1,
    answer2: removeTags(text2),
  };
  try {
    // Send a POST request to the comparison API
    const response = await fetch(
      "https://arcane-refuge-67529.herokuapp.com/checker",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    // Parse the response as JSON
    const { res, comment, size_difference_percent } = await response.json();
    const result = parseFloat(res);
    return result;
  } catch (error) {
    console.error(error);
    // Handle any errors that occur during the API request
    throw new Error("An error occurred while checking the answer.");
  }
};

export const generateDiscussion = async (prompt, previousMessages, stage) => {
  // console.log("prompt", prompt);
  // console.log("previousMessages", previousMessages);

  const AItype = "openai";
  const url = AItype === "claude" ? "/api/generate2" : "/api/generate";

  let currentPrompt;
  if (previousMessages.length == 0) {
    currentPrompt = prompt + "Return only the phrases from the dialogue.";
  }
  console.log("currentPrompt", currentPrompt);

  try {
    // Make a POST request to the API endpoint
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: currentPrompt,
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
      ? { newMessage: result }
      : { newHint: "Sorry, we are disconnected" };
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
