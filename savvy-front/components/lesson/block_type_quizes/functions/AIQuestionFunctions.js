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
  let data;

  if (checkType === "WORD") {
    data = {
      answer1: correctAnswer.toLowerCase(),
      answer2: studentAnswer.toLowerCase(),
    };
    // Perform a simple word-level comparison
    const result =
      correctAnswer.toLowerCase() === studentAnswer.toLowerCase() ? 90 : 10;
    return {
      result,
      correctnessLevel: determineCorrectness(result),
      color: result === 90 ? "rgba(50, 172, 102, 0.7)" : "#EFB8A9",
    };
  } else {
    data = {
      answer1: correctAnswer,
      answer2: studentAnswer,
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
        result: result ? result : 0,
        correctnessLevel: correctnessLevel ? correctnessLevel : "wrong",
        color: color ? color : "#EFB8A9",
        comment: comment ? comment : "",
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
  router,
  context,
  jsonStoryString
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
  const hintIntro = `You are a an experienced professional advising juniors on how to implement projects better. You help your student answer this question ${question}. The correct answer is: ${correctAnswer}`;
  const hintAnswerRecommendations = `YOU HINT MUST BE AROUND 120 WORDS!!!! Answer in ${
    router.locale === "ru" ? "Russian" : "English"
  }. Always address student as "You" and NEVER address the student as "STUDENT".  
  Break your hint into small paragraphs and return every paragraph in a <p> tag.
  LIMIT YOUR RESPONSE TO 500 CHARACTERS.`;
  const hintPrompt = ` Give a hint to the student in a Socratic manner on what is the correct answer.
   Use this approach: ${
     hintingMethods[allHints.length]
   }. Connect you explanation to the general story of the simulator. 
  The story is """ ${jsonStoryString} """.
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
        prompt: context + hintIntro + hintPrompt + hintAnswerRecommendations,
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
  explanationsNum,
  context
) => {
  event.preventDefault();
  const AItype = "claude";
  const url = AItype === "claude" ? "/api/generate2" : "/api/generate";
  const proportion = (
    (studentAnswer.length / correctAnswer.length) *
    100
  ).toFixed(0);

  // Check if there is already more than one explanation
  // if (explanationsNum > 1) {
  //   return {
  //     newExplanation:
  //       "Please try answering the question before asking for more explanations.",
  //     type: "explanation",
  //   };
  // }

  const intro = `
      You are a an experienced professional advising juniors on how to implement their projects better. You asked your student this question: """ ${question} """.
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
  // if (proportion < 25 && allExplanantions.length === 0) {
  //   const tooShortPrompt = `
  //     The student's answer is too short. It is only "${proportion}" of the sample correct answer.
  //     Ask the student very shortly (less than 150 chars) to provide a more detailed answer.`;

  //   const result = await fetchExplanation(tooShortPrompt);
  //   return {
  //     newExplanation: result || simpleExplanation,
  //     type: "explanation",
  //   };
  // }

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

  const result = await fetchExplanation(context + intro + explanationPrompt);

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
  router,
  context
) => {
  event.preventDefault();

  // Set the AI type and URL based on the AIType parameter
  const AItype = "openai";
  const url = AItype === "claude" ? "/api/generate2" : "/api/generate";
  // Define the improvement introduction and recommendations
  const improvementIntro = `
    You are a an experienced professional advising juniors on how to implememnt their projects better. You asked your student this question: "${question}".
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
          context +
          improvementIntro +
          improvementPrompt +
          improvementRecommendations,
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

export const generateHint2 = async (
  lang,
  question,
  answers,
  overallResults,
  correctIdeas
) => {
  // setGenerating(true);
  let hintPrompt;
  let url;
  let result;
  let AItype = "openai";
  if (AItype == "claude") {
    url = "/api/generate2";
  } else {
    url = "/api/generate";
  }

  let intro = `You are a law professor. 
      You help your student answer this question ${question}
      The correct answers are: ${answers.answerElements.join(", ")}`;

  let recommendations = ` Answer in ${
    lang == "ru" ? "Russian" : "English"
  }. Answer in second person. Address the student as "You"! Limit your hint to 3 sentences.`;

  // if the student has already given some correct answers, we focus only on the ansers that have not yet been found
  if (overallResults && overallResults.length > 0) {
    hintPrompt = ` The student has already given these correct answers: """ ${correctIdeas
      .map((el) => el.idea)
      .join(", ")} """. But struggles to find the rest.
      Give a detailed hint to the student in a Socratic manner that will help them find these remaining answers: """${answers.answerElements
        .filter(
          (el) =>
            correctIdeas.filter((c) => c.matchedAnswer.answer == el.answer)
              .length == 0
        )
        .map((el) => el.answer)
        .join(", ")}""".
      Answer in the same language as the text of the question. Answer in second person.`;

    // otherwise we give a hint for the first answer only
  } else {
    hintPrompt = ` The student can't come up with any answers. 
                    Give a detailed hint to the student that will help them find the first answer: ${answers.answerElements[0].answer}
                  `;
  }

  try {
    event.preventDefault();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: intro + hintPrompt + recommendations,
      }),
    });

    if (response.status !== 200) {
      throw (
        (await response.json()).error ||
        new Error(`Request failed with status ${response.status}`)
      );
    }

    const data = await response.json();
    if (AItype == "claude") {
      result = data.result.content[0].text;
    } else {
      result = data.result.content;
    }

    return result;

    if (result) {
      // setAIHint(result);
      // if (!isFirstHint) {
      // createQuizResult({
      //   variables: {
      //     quiz: props.quizId,
      //     lessonId: props.lessonId,
      //     hint: result,
      //     type: "hint",
      //     comment: `Student asked for a hint`,
      //   },
      // });
      // }
    } else {
      return "Sorry, you are on your own";
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export const changeWording = async (old_wording, sample_answer) => {
  const AItype = "openai";
  const url = AItype === "claude" ? "/api/generate2" : "/api/generate";
  const targetLength = sample_answer.length;
  const lowerBound = Math.floor(targetLength * 0.9);
  const upperBound = Math.ceil(targetLength * 1.1);

  const prompt = `Rewrite the following text, adhering strictly to these rules:

1. The new text MUST be between ${lowerBound} and ${upperBound} characters long. This is crucial.
2. Maintain the core meaning and ideas of the original text.
3. Do not add new concepts or information not present in the original.
4. If necessary, simplify or expand existing ideas to meet the length requirement.
5. Ensure the rewrite is coherent and flows well.

Original text: "${old_wording}"

Provide only the rewritten text in your response, with no additional comments or explanations.`;

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
    const result =
      AItype === "claude" ? data.result.content[0].text : data.result.content;

    return result.trim() || null;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export const checkNewWording = async (
  old_wording,
  sample_answer,
  maxAttempts = 5
) => {
  if (maxAttempts <= 0) {
    // console.log("Max attempts reached, returning null");
    return null;
  }

  let new_wording = await changeWording(old_wording, sample_answer);
  const ratio = new_wording.length / sample_answer.length;

  if (ratio > 1.1 || ratio < 0.9) {
    // console.log(`Attempt failed. Ratio: ${ratio}. Trying again...`);
    return checkNewWording(old_wording, sample_answer, maxAttempts - 1);
  } else {
    // console.log(`Success! Ratio: ${ratio}`);
    return new_wording;
  }
};

const countWords = (str) => str.trim().split(/\s+/).length;

export const rephraseAnswer = async (old_wording, sample_answer) => {
  const AItype = "openai";
  const url = AItype === "claude" ? "/api/generate2" : "/api/generate";
  let new_wording;
  let challenge_prompt = `
    Find the subject in this sentence: '${sample_answer}'
    Then rewrite the sentence: '${old_wording}' and:

    1. Make it around ${countWords(sample_answer)} words,
    2. Make it semantically structured similarly to '${sample_answer}'. 
    3. Use the subject from the first sentence in the new rewritten sentence

    Return only the rewritten sentence.
  `;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: challenge_prompt }),
    });

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    new_wording =
      AItype === "claude" ? data.result.content[0].text : data.result.content;

    // Check if the edited text is wrapped in <p> tags

    return new_wording;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// helper function for getMatchingAnswers function
const compareAnswers = async (idea, answer) => {
  try {
    const response = await fetch(
      "https://arcane-refuge-67529.herokuapp.com/checker",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer1: answer?.answer ? answer?.answer : answer,
          answer2: idea,
        }),
      }
    );
    const result = await response.json();
    return parseFloat(result.res) || 0;
  } catch (error) {
    console.error("Error comparing answers:", error);
    return 0;
  }
};
// main assessment functions
export const getMatchingAnswers = async (
  answers,
  ideas,
  expectedAnswers,
  overallResults
) => {
  // Local variables
  const usedAnswers = new Set();
  let newCorrectIdeas = [];
  let newResults = [];
  let oldResults = [];
  let updatedExpectedAnswers = expectedAnswers;

  // 1️⃣ FIRST LOOP. Iterate through each student idea.
  for (let idea of ideas) {
    // Skip empty ideas (null, undefined, or blank string)
    if (!idea || !idea.trim()) {
      continue;
    }

    // If the idea has already been evaluated, skip further processing.
    const existingResult =
      overallResults && overallResults.find((res) => res.idea === idea);
    if (existingResult) {
      oldResults.push(existingResult);
      continue;
    }

    // Track the best match for the current idea (includes feedback).
    let bestMatch = {
      result: 0,
      matchedText: null,
      feedback: null,
      id: null,
    };

    // 2️⃣ SECOND LOOP. Compare the current idea with each provided answer.
    for (let answer of answers) {
      // Skip if this answer has already been “used.”
      if (usedAnswers.has(answer)) {
        continue;
      }

      // If a good match has been found already, no need to check further.
      if (bestMatch.result >= 65) {
        break;
      }

      // Compare the main answer.
      const mainScore = await compareAnswers(idea, answer);
      if (mainScore > bestMatch.result) {
        bestMatch.result = mainScore;
        bestMatch.matchedText = answer.answer;
        bestMatch.feedback = answer.feedback;
        bestMatch.id = answer.id;
      }

      // If the score is low, skip checking any related answers.
      if (mainScore < 25) {
        continue;
      }

      // If the main score is very high, mark this answer as “used.”
      if (mainScore > 65) {
        usedAnswers.add(answer);
        break;
      } else {
        // For scores between 25 and 65, check related answers.
        let fetchPromises = [];
        let textsToFetch = [];
        (answer.relatedAnswers || []).forEach((relAns) => {
          fetchPromises.push(compareAnswers(relAns, idea));
          textsToFetch.push(relAns);
        });

        try {
          const responses = await Promise.all(fetchPromises);
          responses.forEach((r, index) => {
            let val = parseFloat(r) || 0;
            if (val > bestMatch.result) {
              bestMatch.result = val;
              bestMatch.matchedText = textsToFetch[index];
              bestMatch.feedback = answer.feedback;
              bestMatch.id = answer.id;
            }
          });

          // If any related answer scores above the threshold, mark this answer as “used.”
          if (bestMatch.result > 65) {
            usedAnswers.add(answer);
            break;
          }
        } catch (error) {
          console.error("Error comparing related answers:", error);
        }
      }
    } // End answers loop

    // Build the result object, conditionally including feedback.
    let newObj = {
      idea,
      result: parseFloat(bestMatch.result).toFixed(2) || bestMatch.result,
      matchedAnswer: bestMatch.matchedText,
      id: bestMatch.id,
    };
    if (bestMatch.result > 57) {
      newObj.feedback = bestMatch.feedback;
    }
    newResults.push(newObj);

    // Track correct ideas if the match is above threshold.
    if (bestMatch.result > 57 && bestMatch.matchedText) {
      let correctIdea = {
        idea,
        matchedAnswer: bestMatch.matchedText,
        id: bestMatch.id,
      };
      if (bestMatch.result > 57) {
        correctIdea.feedback = bestMatch.feedback;
      }
      newCorrectIdeas.push(correctIdea);
    }
  }

  // Merge previous and new results (keeping the highest score for each idea).
  let uniqueValues = [];
  [...oldResults, ...newResults].forEach((item) => {
    const existingItem = uniqueValues.find((uv) => uv.idea === item.idea);
    if (!existingItem) {
      uniqueValues.push({ ...item });
    } else if (parseFloat(item.result) > parseFloat(existingItem.result)) {
      existingItem.result = item.result;
      existingItem.matchedAnswer = item.matchedAnswer;
      if (item.result > 57) {
        existingItem.feedback = item.feedback;
      }
    }
  });

  // let quizIdeas = uniqueValues.map((uv) => ({
  //   ...uv,
  //   result: String(uv.result),
  // }));
  // console.log("uniqueValues", uniqueValues);
  // console.log("newCorrectIdeas", newCorrectIdeas);

  // Return computed values instead of updating state
  return {
    overallResults: uniqueValues,
    correctIdeas: newCorrectIdeas,
    updatedExpectedAnswers,
  };
};
