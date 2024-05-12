// 0. Check student answer

const determineCorrectness = async (result) => {
  if (result < 40) {
    return "completely_wrong";
  } else if (result >= 40 && result < 50) {
    return "wrong";
  } else if (result >= 50 && result < 58) {
    return "slightly_wrong";
  } else if (result >= 58 && result < 60) {
    return "has_flaws";
  } else if (result >= 60 && result < 65) {
    return "looks_true";
  } else if (result >= 65) {
    return "correct";
  }
};

export const checkAnswer = async (
  event,
  correctAnswer,
  studentAnswer,
  checkType
) => {
  // Prepare the data object for comparison
  const data = {
    answer1: correctAnswer.toLowerCase(),
    answer2: studentAnswer.toLowerCase(),
  };

  if (checkType === "WORD") {
    // Perform a simple word-level comparison
    const result =
      correctAnswer.toLowerCase() === studentAnswer.toLowerCase() ? 90 : 10;
    return {
      result,
      correctnessLevel: determineCorrectness(result),
      color: result === 90 ? "rgba(50, 172, 102, 0.7)" : "#ff6b6b",
    };
  } else {
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

      // Determine the correctness level and color based on the result
      let correctnessLevel = await determineCorrectness(result);
      let color;
      if (result > 65) {
        color = "rgba(50, 172, 102, 0.7)";
      } else if (result > 60 && result <= 65) {
        color = "#ffd166";
      } else if (result > 58 && result < 60) {
        color = "#ffd166";
      } else {
        color = "#EFB8A9";
      }
      return {
        result,
        correctnessLevel,
        color,
        comment,
      };
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the API request
      throw new Error("An error occurred while checking the answer.");
    }
  }
};

// 1. Provide hints to the student
export const generateHint = async (
  event,
  AIType,
  question,
  correctAnswer,
  comment,
  allHints,
  router
) => {
  event.preventDefault();

  // Set the AI type and URL based on the AIType parameter
  const AItype = "openai";
  const url = AItype === "claude" ? "/api/generate2" : "/api/generate";

  // Define an array of hinting methods
  const hintingMethods = [
    `Provide a detailed real-life situation that can help the student understand the problem.
    `,
    `Provide a short hint that will help the student look at the question from a different angle.
    Example about definition of a contract: Let me reveal one of the core features of a contract.
    It's a promise that the law will enforce. This means if someone breaks the contract,
    the other person can go to court to make it right.
    What other key characteristics of contracts can you think of?
    Example about definition of a contract: Let me reveal one of the core features of a contract.
    It's a promise that the law will enforce. This means if someone breaks the contract,
    the other person can go to court to make it right.
    What other key characteristics of contracts can you think of?
    `,
    `Say where the student can find the answer to the question: the law, caselaw, the longread, the chat in the simulator, etc. Use this info to find the source: ${comment}. PROVIDE INFORMATION ONLY ABOUT THE SOURCE.`,
  ];

  // Check if all hinting methods have been used
  if (allHints.length >= hintingMethods.length) {
    return { newHint: "😔 I am out of hints.", type: "hint" };
  }

  // Construct the hint prompt
  const hintIntro = `You are a an experienced senior lawyer advising juniors on how to implement legal projects better. You help your student answer this question ${question}. The correct answer is: ${correctAnswer}`;
  const hintAnswerRecommendations = `YOU HINT MUST BE AROUND 120 WORDS!!!! Answer in ${
    router.locale === "ru" ? "Russian" : "English"
  }. Always address student as "You" and NEVER address the student as "STUDENT".  
  Break your hint into small paragraphs and return every paragraph in a <p> tag.`;
  const hintPrompt = ` Give a hint to the student in a Socratic manner on what is the correct answer.
   Use this approach: ${hintingMethods[allHints.length]} 
  Do NOT USE the words from the correct answer. DO NOT reveal the correct answer. `;
  //    Use this approach: ${hintingMethods[allHints.length]}

  try {
    // Make a POST request to the API endpoint
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: hintIntro + hintPrompt + hintAnswerRecommendations,
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
    console.error(error);
    alert(error.message);
  }
};

// 2. Generate an explanation for the student's answer

export const generateExplanation = async (
  event,
  AIType,
  question,
  correctAnswer,
  studentAnswer,
  correctnessLevel,
  commentForWrongAnswer,
  commentForCorrectAnswer,
  allExplanantions,
  router,
  simpleExplanation,
  explanationsNum
) => {
  event.preventDefault();
  const AItype = "claude";
  const url = AItype === "claude" ? "/api/generate2" : "/api/generate";
  const proportion = (
    (studentAnswer.length / correctAnswer.length) *
    100
  ).toFixed(0);

  // Check if there is already more than one explanation
  if (explanationsNum > 1) {
    return {
      newExplanation:
        "Please try answering the question before asking for more explanations.",
      type: "explanation",
    };
  }

  const intro = `
      You are a an experienced senior lawyer advising juniors on how to implement legal projects better. You asked your student this question: """ ${question} """.
      You expect to recieve an answer that sounds like this (correct answer): """ ${correctAnswer} """. 
    `;

  // Define the explanation recommendations
  const explanationRecommendations = ` Write in second person. Address the student as "you".
    DO NOT USE the words from the correct answer!!! DO NOT REVEAL THE CORRECT ANSWER!!!
    Be very polite and gentle. LIMIT YOUR RESPONSE TO 500 CHARACTERS.
    Return your response with every paragraph wrapped in <p> tags.
    Answer in ${router.locale === "ru" ? "Russian" : "English"}`;

  // Function to generate an explanation by making an API request
  const fetchExplanation = async (prompt) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt + explanationRecommendations }),
      });

      if (response.status !== 200) {
        throw (
          (await response.json()).error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const data = await response.json();
      const result =
        AItype === "claude" ? data.result.content[0].text : data.result.content;

      return result || "Sorry, you are on your own";
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // 1. Check if the student's answer is too short and there are no previous explanations
  if (proportion < 25 && allExplanantions.length === 0) {
    const tooShortPrompt = `
      The student's answer is too short. It is only "${proportion}" of the sample correct answer.
      Ask the student very shortly (less than 150 chars) to provide a more detailed answer.`;

    const result = await fetchExplanation(tooShortPrompt);
    return {
      newExplanation: result || simpleExplanation,
      type: "explanation",
    };
  }

  // 2. Generate the explanation prompt based on the correctness level
  const explanationPrompt =
    correctnessLevel === "completely_wrong" || correctnessLevel === "wrong"
      ? `
        But your student gave you a completely wrong answer: """${studentAnswer}""".
        Use:
        1) information about the correct answer: "${correctAnswer}".
        2) and information and recommendations from the lesson: "${commentForWrongAnswer}"
        to explain in 3 SENTENCES why this answer is wrong and what the correct answer should look like.
        Do it in the following way:

        Explain step-by-step what information must be in the student answer. 
        FOCUS the attention of the student on the information outlined like this: ^important information^. 

        Return every point as a separate <p> tag.

        `
      : `
        But your student gave you a slightly wrong answer: "${studentAnswer}".
        Use the information about the correct answer and information from the lesson: "${commentForCorrectAnswer}" to
        explain in 3 sentences how to make this answer correct. Do it in the following way:

        Explain which part of the answer does not look right and needs to be changed.
        Give recommendations on how to change this part of the answer.`;

  // Generate the explanation using the generated prompt

  const result = await fetchExplanation(intro + explanationPrompt);

  // Rewrite the explanantion in a more concise way.

  // const upgradeExplanation = async (prompt) => {
  //   console.log("prompt", prompt);
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(
  //         `
  //           Rewrite this explanation in a more concise and natural way.
  //           Act as an attentive mentor who wants to gently and politely explain what is wrong with the student's answer.
  //           The explanation: """ ${prompt}"""
  //           Return your response with every paragraph wrapped in <p> tags.
  //         `
  //       ),
  //     });

  //     if (response.status !== 200) {
  //       throw (
  //         (await response.json()).error ||
  //         new Error(`Request failed with status ${response.status}`)
  //       );
  //     }

  //     const data = await response.json();
  //     console.log("data", data);
  //     const result =
  //       AItype === "claude" ? data.result.content[0].text : data.result.content;
  //     console.log("result", result);
  //     return result || "";
  //   } catch (error) {
  //     console.error(error);
  //     alert(error.message);
  //   }
  // };

  // const upgradedExplanation = await upgradeExplanation(result);
  // console.log("upgradedExplanation", upgradedExplanation);
  return {
    newExplanation: result,
    type: "explanation",
  };
};

// 3. Generate an improvement for the student's answer

export const generateImprovement = async (
  event,
  AIType,
  question,
  correctAnswer,
  studentAnswer,
  correctnessLevel,
  commentForCorrectAnswer,
  AllImprovements,
  router
) => {
  event.preventDefault();

  // Set the AI type and URL based on the AIType parameter
  const AItype = "openai";
  const url = AItype === "claude" ? "/api/generate2" : "/api/generate";
  console.log(studentAnswer);
  // Define the improvement introduction and recommendations
  const improvementIntro = `
    You are a an experienced senior lawyer advising juniors on how to implememnt legal projects better. You asked your student this question: "${question}".
    You expect to receive an answer that sounds like this (correct answer): "${correctAnswer}".
    Your student's answer is: "${studentAnswer}".
    It is partly correct. But the student wants to make it even better.
  `;
  const improvementRecommendations = `
    Write in second person. Address the student as "you".
    DO NOT REVEAL THE CORRECT ANSWER!!!
    Return your response with every paragraph wrapped in <p> tags.
    Answer in ${router.locale === "ru" ? "Russian" : "English"}
    Make the answer at least 2 sentences long. Limit your response to 100 words.
  `;

  // Generate the improvement prompt based on the number of previous improvements
  const improvementPrompt =
    AllImprovements.length === 0
      ? `
      Analyze student's answer using this information and algorithm: "${commentForCorrectAnswer}".
      Return recommendations on how to improve this answer in accordance with provided information and algorithm.
    `
      : `
      Use this script: ${commentForCorrectAnswer} to improve the student's answer.
      Your previous recommendations are: ${AllImprovements.join(" ")}.
    `;

  try {
    // Make a POST request to the API endpoint
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt:
          improvementIntro + improvementPrompt + improvementRecommendations,
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

    // Return the generated improvement if it exists, otherwise return a default message
    return result
      ? { newImprovement: result, type: "improvement" }
      : { newImprovement: "Sorry, you are on your own", type: "improvement" };
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export const reflectOnExplanation = async (explanation) => {
  const AItype = "openai";
  const url = AItype === "claude" ? "/api/generate2" : "/api/generate";

  const reflectionIntro = `
    Please reflect on the following explanation and provide suggestions for improvement:

    Explanation:
    ${explanation}

    Use these recommendations to improve the explanation of the question provided to the student 
    Return ONLY the improved explanation.
  `;

  const reflectionRecommendations = `
    1. Write your reflection and suggestions in a clear and concise manner.
    2. Give a step-by-step plan on how to find the answer to the question.
    3. Return your response in short paragraphs wrapped in <p> tags.

    An ideal explanation of a question "How to choose the Due Diligence type" looks like this: 
    Step 1: Rephrase the question to make it easier to understand.
    Step 2: Explain the key concept needed to answer the question.
    Step 3: Provide a real-life example to illustrate the concept.
    Step 4: Explain how the understanding of this concept leads to the correct answer.

  `;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: reflectionIntro + reflectionRecommendations,
      }),
    });

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const reflection =
      AItype === "claude" ? data.result.content[0].text : data.result.content;

    if (reflection) {
      let improvedExplanation = reflection;
      return improvedExplanation;
    } else {
      return "No reflection provided";
    }
  } catch (error) {
    console.error("Error in reflectOnExplanation:", error);
    return "error";
  }
};

export const editLLMText = async (generatedText) => {
  const AItype = "claude";
  const url = AItype === "claude" ? "/api/generate2" : "/api/generate";

  const prompt = `Please edit the following text to meet these requirements:
        1. Make it sound like human speech with short sentences and no heavy constructions.
        2. Divide it into small, easy-to-grasp paragraphs.
        3. Wrap each paragraph in <p> tags.
        4. Ensure there are no double ideas within each paragraph.

        <text>
        ${generatedText}
        </text>`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const editedText =
      AItype === "claude" ? data.result.content[0].text : data.result.content;

    // Check if the edited text is wrapped in <p> tags
    const paragraphs = editedText.match(/<p>(.*?)<\/p>/g);
    if (!paragraphs || paragraphs.length === 0) {
      throw new Error("The edited text is not properly wrapped in <p> tags.");
    }

    return editedText;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
