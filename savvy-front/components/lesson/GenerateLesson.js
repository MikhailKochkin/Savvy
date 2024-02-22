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
    // {
    //   idea: "Выбор технологии разработки",
    //   description:
    //     "Определение наиболее подходящей технологии для создания программного обеспечения (ПО)",
    //   format: "note",
    //   status: "generated",
    //   content: {
    //     text: "<h2>Выбор технологии разработки</h2><p>Выбор технологии разработки является важным этапом при создании программного обеспечения (ПО). Он включает в себя определение наиболее подходящей технологии или набора технологий для реализации конкретного проекта.</p><p><b>Определение наиболее подходящей технологии</b></p><p>При выборе технологии разработки необходимо учитывать ряд факторов, таких как:</p><ul><li>Требования к функциональности ПО</li><li>Требования к производительности</li><li>Требования к безопасности</li><li>Наличие специалистов, знакомых с выбранной технологией</li><li>Стоимость разработки и поддержки</li></ul><p><b>Процесс выбора технологии разработки</b></p><p>Процесс выбора технологии разработки включает в себя следующие шаги:</p><ol><li>Анализ требований к ПО</li><li>Изучение существующих технологий</li><li>Сравнительный анализ технологий</li><li>Принятие решения о выборе технологии</li></ol><p><b>Важность выбора правильной технологии разработки</b></p><p>Выбор правильной технологии разработки может существенно повлиять на успешность проекта. Правильно подобранная технология позволяет эффективно реализовать требования к ПО, обеспечить его стабильную работу, масштабируемость и безопасность.</p><p>В итоге, выбор технологии разработки является важным решением, которое должно быть основано на анализе требований и сравнительном анализе доступных технологий.</p>",
    //   },
    // },
    // {
    //   idea: "Процесс выбора технологии разработки",
    //   description:
    //     "Определение требований к ПО, анализ технологий, оценка технологий, выбор наиболее подходящей технологии, внедрение выбранной технологии.",
    //   format: "shot",
    //   status: "generated",
    //   content: {
    //     parts: [
    //       "<h2>Слайд 1. Определение требований к ПО</h2><p>Первый этап процесса выбора технологии разработки - определение требований к программному обеспечению. На этом этапе определяются функциональные и нефункциональные требования, которым должна удовлетворять выбранная технология.</p>",
    //       "<h2>Слайд 2. Анализ технологий</h2><p>На втором этапе производится анализ различных технологий разработки, которые могут быть применены для реализации требований. Рассматриваются и сравниваются различные аспекты технологий, такие как производительность, стоимость, гибкость и поддержка сообщества.</p>",
    //       "<h2>Слайд 3. Оценка технологий</h2><p>На третьем этапе происходит оценка каждой технологии на основе ранее определенных требований. Производится сравнение технологий и их соответствие требованиям. Это помогает сузить выбор и определить наиболее подходящие варианты.</p>",
    //       "<h2>Слайд 4. Выбор наиболее подходящей технологии</h2><p>После оценки технологий происходит выбор наиболее подходящей технологии разработки. Этот выбор основан на анализе и оценке, а также учитывает бизнес-цели и ограничения проекта.</p>",
    //       "<h2>Слайд 5. Внедрение выбранной технологии</h2><p>Последний этап процесса - внедрение выбранной технологии разработки. На этом этапе осуществляется практическая реализация выбранной технологии и интеграция ее в проект.</p>",
    //     ],
    //     comments: [
    //       "<p>Давайте рассмотрим пример процесса выбора технологии разработки. Представьте, что у вас есть проект по созданию веб-приложения. На первом этапе вы определяете требования к функциональности и производительности приложения.</p>",
    //       "<p>Затем, на втором этапе, вы проводите анализ различных технологий разработки, таких как Ruby on Rails, Angular и Django. Вы сравниваете их по производительности, стоимости и гибкости.</p>",
    //       "<p>На третьем этапе вы оцениваете каждую технологию на основе определенных требований. Например, вы можете оценивать их по скорости разработки и поддержке сообщества.</p>",
    //       "<p>После оценки технологий вы выбираете наиболее подходящую для вашего проекта. Например, если вам важна быстрая разработка, то можете выбрать Ruby on Rails.</p>",
    //       "<p>И, наконец, на последнем этапе вы внедряете выбранную технологию разработки, создавая веб-приложение с использованием выбранного фреймворка.</p>",
    //     ],
    //   },
    // },
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
            "idea": [
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
          console.log("jsonArray", jsonArray);
          console.log("ideas", jsonArray.ideas);
          setIdeas(jsonArray.ideas);
        } catch (error) {
          console.error("Error parsing JSON:", error);
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
    console.log(typeof ideas, ideas);

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
            console.log("data.result.content", data.result.content);
            let new_block = JSON.parse(data.result.content);
            console.log("new_block", typeof new_block, new_block);
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
    console.log("blocks", blocks);
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

      {console.log("blocks", blocks)}
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
