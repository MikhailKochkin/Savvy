import { useState, useEffect } from "react";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

const Styles = styled.div`
  width: 660px;
  border: 1px solid #adb5bd;
  margin: 40px 0;
  padding: 20px;
  h2 {
    font-size: 2rem;
    font-weight: 600;
  }
  textarea {
    width: 550px;
    height: 350px;
    padding: 1rem;
    font-size: 1.4rem;
    border: 1px solid #ccc;
    font-family: Montserrat;
    border-radius: 5px;
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  margin-bottom: 25px;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const Progress2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;

const GenerateLesson = (props) => {
  const [source, setSource] = useState("");
  const [generating, setGenerating] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [ideas, setIdeas] = useState([
    // {
    //   description:
    //     "Определение наиболее подходящей технологии для создания программного обеспечения (ПО)",
    //   format: "note",
    //   idea: "Выбор технологии разработки",
    // },
    // {
    //   idea: "Процесс выбора технологии разработки",
    //   description:
    //     "Определение требований к ПО, анализ технологий, оценка технологий, выбор наиболее подходящей технологии, внедрение выбранной технологии.",
    //   format: "shot",
    // },
    // {
    //   idea: "Программный код",
    //   description:
    //     "ПО состоит из кода, который представляет из себя набор команд и алгоритмов. В процессе создания ПО код проходит несколько этапов трансформации: исходный код, объектный код, бинарный код.",
    //   format: "note",
    // },
    // {
    //   idea: "Исходный код",
    //   description:
    //     "Исходный код - это первоначальный код, написанный разработчиком вручную на определенном языке программирования.",
    //   format: "chat",
    // },
    // {
    //   idea: "Объектный код",
    //   description:
    //     "Объектный код - это результат, который получается после обработки исходного кода компилятором. Он уже не является текстом на языке программирования, а представляет собой набор инструкций для процессора.",
    //   format: "chat",
    // },
    // {
    //   idea: "Бинарный код",
    //   description:
    //     "Бинарный код - это низкоуровневый код, который представляет собой набор команд, выполняемых процессором напрямую. Бинарный код не может быть прочитан человеком, так как он представляет собой последовательность нулей и единиц.",
    //   format: "chat",
    // },
  ]);
  const [blocks, setBlocks] = useState([
    {
      content: {
        messagesList: [
          {
            author: "author",
            text: "Let's dive into the world of laws regulating capital markets. Have you heard about these laws before?",
          },
          {
            author: "student",
            text: "I've heard of them but I'm not sure what they are for.",
          },
          {
            author: "author",
            text: "These laws, such as the Securities Act of 1933, the Jobs Act of 2012, and the Sarbanes-Oxley Act of 2002, are designed to protect investors and the public from fraud. They aim to instill confidence in the public's capital by regulating the activities of companies involved in the capital markets.",
          },
        ],
      },
      description:
        "Various federal laws such as the Securities Act of 1933, the Jobs Act of 2012, and the Sarbanes-Oxley Act of 2002, aim to protect investors and the public from fraud and to instill confidence in the public’s capital.",
      format: "chat",
      idea: "Laws regulating capital markets",
      status: "generated",
    },
    {
      content: {
        parts: [
          "<h2>Slide 1. Introduction to Blue Sky Laws</h2><p>Blue Sky Laws are state regulations designed to protect investors from securities fraud. These laws require companies to provide full and fair disclosure of their financial information before going public.",
          "<h2>Slide 2. Purpose of Blue Sky Laws</h2><p>The main goal of Blue Sky Laws is to prevent financial misrepresentation and ensure that investors have access to accurate and transparent information about the companies they are investing in.",
          "<h2>Slide 3. Role of the Securities Commissioner</h2><p>Each state has a securities commissioner who is responsible for enforcing Blue Sky Laws within their jurisdiction. The commissioner oversees the registration and regulation of securities offerings to ensure compliance with state laws.",
        ],
        comments: [
          "<p>Blue Sky Laws play a crucial role in maintaining the integrity of the financial markets and protecting investors from fraudulent schemes. It is important for companies to adhere to these laws to build trust with their investors.</p>",
        ],
      },
      description:
        "States have enacted laws known as Blue Sky Laws to prevent financial misrepresentation in companies looking to go public, regulated by each state’s securities commissioner.",
      format: "shot",
      idea: "State laws to prevent financial misrepresentation",
      status: "generated",
    },
    {
      content: {
        text: "<h2>Role of Lawyers in Helping Public Companies Comply with Laws</h2><p>Public companies operate in a complex legal environment where compliance with laws and regulations is crucial for their success and sustainability. This is where lawyers play a critical role in guiding these companies through the legal landscape.</p><p>Key Responsibilities:</p><ul><li>Ensuring Compliance: Lawyers help public companies understand and adhere to various laws and regulations that govern their operations. This includes securities laws, employment laws, environmental regulations, and more.</li><li>Avoiding Liability: By providing legal advice and counsel, lawyers assist public companies in mitigating risks and avoiding potential legal pitfalls that could lead to liability.</li><li>Handling Legal Proceedings: In the event of legal challenges such as subpoenas, investigations, or testimony by the SEC, lawyers represent public companies and navigate the legal process on their behalf.</li><li>Strategic Counsel: Lawyers offer strategic counsel to public companies on how to structure their operations and transactions in a way that minimizes legal risks and maximizes compliance.</li><li>Drafting Legal Documents: Lawyers draft and review various legal documents such as contracts, disclosures, and filings to ensure they are in compliance with applicable laws and regulations.</li></ul><p>Overall, the role of lawyers in helping public companies comply with laws is indispensable in today's regulatory environment, where legal compliance is a key factor in maintaining a company's reputation and profitability.</p>",
      },
      description:
        "Lawyers are needed to help public companies comply with laws and regulations, avoid liability, and handle legal proceedings such as subpoenas, investigations, and testimony by the SEC.",
      format: "note",
      idea: "Role of lawyers in helping public companies comply with laws",
      status: "generated",
    },
  ]);

  const runBreaking = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
          Take this text:""" ${source} """"
          
          Find up to 3 core ideas in this text. Guess which format is the best way to explain these ideas using this schema:
          1. "Chat" format is good at explaining simple ideas.
          2. "Shot" format is good at explaining lists and bullet points. It is very similar to slideshows.
          3. Complex ideas should be explained in "Note" format. It is very similar to longreads.
          Return these ideas as an object that looks like this. Use the same language as the text!!! 

          { 
            "ideas": [
              {
                "idea": "The concept of a contract in English law",
                "description": "A contract is an agreement between two parties who have agreed to carry out certain obligations to each other.",
                "format": "chat"
              },
              {
                "idea": "Terms and elements of a contract",
                "description": "All contracts must contain key terms and elements to be enforceable: Mutual assent, Consideration, Awareness, Capacity.",
                "format": "shot"
              }
              {
                "idea": "Contractual obligations",
                "description": "What is a contractual obligation? Definition, examples, and types of contractual obligations",
                "format": "note"
              }
            ]
          }
          `,
        }),
      });

      //   2. "Slides" format is good at explaining lists and bullet points.
      // 3. Complex ideas should be explained in "Note" format.
      //  {
      //       "idea": "Terms and elements of a contract",
      //       "description": "All contracts must contain key terms and elements to be enforceable: Mutual assent between the parties, Consideration, Awareness of the contract,a legally enforceable contract, Capacity.",
      //       "format": "slides"
      //     }

      if (response.status !== 200) {
        throw (
          (await response.json()).error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const data = await response.json();
      if (data.result.content) {
        try {
          let jsonArray = JSON.parse(data.result.content);
          // console.log("jsonArray", jsonArray);
          // console.log("ideas", jsonArray.ideas);
          setIdeas(jsonArray.ideas);
        } catch (error) {
          // console.error("Error parsing JSON:", error);
          alert("Error parsing JSON: " + error.message);
        }
      } else {
        setIdeas([]);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setGenerating(false);
  };

  const runGenereation = async (e) => {
    e.preventDefault();
    setGenerating(true);

    await Promise.all(
      ideas.map(async (el) => {
        let prompt;
        if (el.format == "chat") {
          prompt = `
              You are building a training simulator out of blocks.
              Take this idea: """${el.idea}""" and its description: """${el.description}"""
              and return it in the form of a chat between a student and the teacher. 
              Use the same language as the language in which the idea is written.

              MAKE EVERY CHAT DIFFERENT!!! MAKE IT LOOK LIKE A REAL DIALOGUE BETWEEN A STUDENT AND A TEACHER.

              The result can look like this:

              Example 1:
             {
                "idea": "The concept of a contract in English law",
                "description": "A contract is an agreement between two parties who have agreed to carry out certain obligations to each other.",
                "format": "chat",
                "status: "generated",
                "content": {
                  "messagesList": [
                    {
                      "author": "author",
                      "text": "Let's take a look at the most fundamental concept. The concept of a contract. Do you know what a contract is?"
                    },
                    {
                      "author": "student",
                      "text": "Not really... Could you explain please?"
                    },
                    {
                      "author": "author",
                      "text": "Of course. A contract is an agreement between two parties who have agreed to carry out certain obligations to each other. In simple words, it is a legally binding agreement between two or more parties. It outlines the rights and responsibilities of each party involved in the agreement. If any party fails to fulfill their obligations as stated in the contract, they can face legal consequences."
                    }
                  ]
                }
              }

              Example 2:
              {
                "idea": "The concept of a contract in English law",
                "description": "A contract is an agreement between two parties who have agreed to carry out certain obligations to each other.",
                "format": "chat",
                "status: "generated",
                "content": {
                  "messagesList": [
                    {
                      "author": "student",
                      "text": "Could you explain what a contract is?"
                    },
                    {
                      "author": "author",
                      "text": "Of course. A contract is an agreement between two parties who have agreed to carry out certain obligations to each other. In simple words, it is a legally binding agreement between two or more parties. It outlines the rights and responsibilities of each party involved in the agreement. If any party fails to fulfill their obligations as stated in the contract, they can face legal consequences."
                    }
                  ]
                }
              }

              Example 3:
              {
                "idea": "Terms and elements of a contract",
                "description": "All contracts must contain key terms and elements to be enforceable: Mutual assent between the parties, Consideration, Awareness of the contract, a legally enforceable contract, Capacity.",
                "format": "chat",
                "status: "generated",
                "content": {
                  "messagesList": [
                    {
                      "author": "student",
                      "text": "So a contract is just a number of obligations stated on a piece of paper? Is it all that takes to make a contract"
                    },
                    {
                      "author": "author",
                      "text": "Not exactly. Every contract must have 5 elements. Otherwise it won't be a contract."
                    },
                    {
                      "author": "author",
                      "text": "These are Mutual assent between the parties, Consideration, Awareness of the contract, a legally enforceable contract, Capacity. Let me explain what they are in more detail below."
                    }
                  ]
                }
              }
          `;
        } else if (el.format == "shot") {
          prompt = `
              You are building a training simulator out of blocks.
              Take this idea: """${el.idea}""" and its description: """${el.description}"""
              and return it in the form of a slideshow between a student and the teacher. 
              Use the same language as the language in which the idea is written.

              The result can look like this:

              Call the format "shot" strictly!!!

              Example 1:    
                {
                "idea": "Terms and elements of a contract",
                "description": "All contracts must contain key terms and elements to be enforceable: Mutual assent between the parties, Consideration, Awareness of the contract, a legally enforceable contract, Capacity.",
                "format": "shot",
                "status: "generated",
                "content": {
                  "parts": [
                    "<h2>Slide 1. Mutual assent between the parties</h2><p>In summary, mutual assent refers to two parties who agree upon something and are prepared to enter into a contract. To have mutual assent, an offeror makes an offer and an offeree accepts it. This is also called offer and acceptance, and is an important element when determining whether mutual assent is present.</p>",
                  ],
                  "comments": [
                    "<p>Let me give you an example of how mutual assent works. One person decides to buy a house from another. They both will sign documents that will show the amount the offeror will provide and the house condition the offeree will submit upon sale.</p>",
                  ]
                }
              }   
          `;
        } else if (el.format == "note") {
          prompt = `
              You are building a training simulator out of blocks.
              Take this idea: """${el.idea}""" and its description: """${el.description}"""
              and return it in the form of a detailed longread where all important information is highlighted. 
              Use the same language as the language in whic the idea is written.

              The result can look like this:

             {
                "idea": "Contractual obligations",
                "description": "What is a contractual obligation? Definition, examples, and types of contractual obligations",
                "format": "note",
                "status: "generated",
                "content": {
                  "text": "<h2>Contractual obligation</h2><p>Contracts are an essential element of doing business — they serve to protect your company’s interests, define clear terms to your agreements with partners and clients, and outline the obligations of each contracting side.</p><p>But what are contractual obligations, exactly?</p><p>In short, contractual obligations are promises or commitments codified in a contract.</p><p><b>Key takeaways:</b></p><p>Contractual obligations are the terms that all parties commit to when they sign a contract.</p><p>The most common types of contractual obligations include delivery, timelines, payment terms, performance obligations, penalties, termination terms, non-compete and non-disclosure obligations.</p>"
              }  
              
              Format must be "note" and status must be "generated"!
          `;
        } else {
          prompt = `Return "Hello!" `;
        }
        try {
          const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: prompt,
            }),
          });

          if (response.status !== 200) {
            throw (
              (await response.json()).error ||
              new Error(`Request failed with status ${response.status}`)
            );
          }
          const data = await response.json();
          if (data.result.content) {
            // console.log("data.result.content", data.result.content);
            let new_block = JSON.parse(data.result.content);
            // console.log("new_block", typeof new_block, new_block);
            let new_blocks = blocks;
            new_blocks.push(new_block);
            setBlocks(new_blocks);
          } else {
            setBlocks([...blocks]);
          }
        } catch (error) {
          console.error(error);
          alert(error.message);
        }
      })
    );
    // console.log("blocks", blocks);
    setGenerating(false);
  };

  const findQuizIdeas = async (e) => {
    e.preventDefault();
    setGenerating(true);

    let prompt = `
      You are a teacher in an online school.
      Analyze this text: """${source}""" and ask your student 3 open-ended questions to check that they have understood what this text is about.
      Every question should have a detailed and engaging practical scenario.

      Use the SAME language as the language of the TEXT!!! 

      Return these 3 questions in the following format:
      
      {
        "questions": [
          {
            "question": "<p>A client comes up to you and presents the following situation. His neigbour agreed to buy your client's lawn mower. But now he refuses to execute this deal because the neighbour claims that there is not contract. You client asks you to explain what a contract is.</p><p><b>Question:</b> Explain what a contract is.</p>",
            "answer": "A contract is an agreement between two parties who have agreed to carry out certain obligations to each other"
          },
          {
            "question": "<p>Two businessmen are negotiatng the terms of the contract. They cannot agree on what to put into the contract. They ask you to explain what are the essential elements of a contract.</p><p><b>Question:</b> Explain what are the essential elements of a contract.</p> ",
            "answer": "Mutual assent between the parties, Consideration, Awareness of the contract, a legally enforceable contract, Capacity"
          },
        ]
      }
      
    `;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (response.status !== 200) {
        throw (
          (await response.json()).error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const data = await response.json();
      if (data.result.content) {
        let quizzes = JSON.parse(data.result.content);
        console.log(1, quizzes);
      } else {
        console.log(2);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setGenerating(false); // This will always be executed, even if there was an error
    }
  };

  const passData = (blocks) => {
    props.passData(blocks);
  };
  return (
    <Styles>
      <h2>Generate New Lesson</h2>
      <textarea maxLength={2500} onChange={(e) => setSource(e.target.value)} />
      <div>Characters used: {source.length} / 2500</div>
      <br />
      {generating && (
        <Progress2>
          <TailSpin width="50" color="#2E80EC" />
        </Progress2>
      )}
      <Button onClick={(e) => runBreaking(e)}>
        Break information into blocks
      </Button>
      {ideas && ideas.length > 0 && "✅"}
      <br />
      <Button onClick={(e) => runGenereation(e)}>Generate Blocks</Button>
      <br />
      <Button onClick={(e) => findQuizIdeas(e)}>Generate Quiz Ideas</Button>
      <br />
      <Button onClick={(e) => generateQuizzes(e)}>Generate Quizzes</Button>
      <br />

      {/* {blocks?.length > 0 &&
        blocks.map((b) => (
          <li>
            <b>{b.idea}</b> – {b.format}: {b.content}
          </li>
        ))} */}
      <Button onClick={(e) => passData(blocks)}>Pass Blocks</Button>
    </Styles>
  );
};

export default GenerateLesson;
