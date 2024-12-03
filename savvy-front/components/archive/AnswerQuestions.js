import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

const Styles = styled.div`
  margin-top: 10px;
  .ask_questions {
    margin-top: 10px;
    font-weight: 500;
    line-height: 1.3;
    font-size: 1.6rem;
    display: flex;
    padding: 5px 5px;
    flex-direction: row;
    justify-content: flex-start;
    transition: all 0.2s ease-in-out;
    border-radius: 5px;
    &:hover {
      background-color: #ebebea;
      cursor: pointer;
    }
  }
  .question_block {
    margin: 20px 0;
  }
  img {
    width: 20px;
    margin-right: 10px;
  }
  textarea {
    height: 45px;
    width: 100%;
    border: 1px solid #efefee;
    border-color: ${(props) => props.inputColor};
    outline: 0;
    resize: none;
    border-radius: 5px;
    padding: 3% 4%;
    line-height: 1.8;
    font-family: Montserrat;
    font-size: 1.4rem;
  }
  button {
    background-color: #3f50b5;
    color: #fff;
    font-family: Montserrat;
    border: none;
    border-radius: 5px;
    font-size: 1.3rem;
    padding: 8px 20px;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: #10249c;
      cursor: pointer;
    }
  }
  .recommendation {
    margin-top: 10px;
    background-color: #fff;
    width: 100%;
    max-height: 300px; /* Set a max-height for the scrollable area */
    overflow-y: auto; /* Enable vertical scrolling */
    border: 1px solid #efefee;
    border-color: ${(props) => props.inputColor};
    outline: 0;
    resize: none;
    border-radius: 5px;
    padding: 3% 4%;
    line-height: 1.8;
    font-family: Montserrat;
    font-size: 1.4rem;
  }
`;

const Progress2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;

const AnswerQuestions = (props) => {
  const { notes, chats } = props;
  const [searchItem, setSearchItem] = useState("");
  const [foundResults, setFoundResults] = useState([]);
  const [stemmedQuestion, setStemmedQuestion] = useState([]);
  const [recommendation, setRecommendation] = useState("...");
  const [generating, setGenerating] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAnswerBox, setOpenAnswerBox] = useState(false);

  let findSource = (searchItems, notes, chats) => {
    // Ensure searchItems is an array

    if (!Array.isArray(searchItems)) {
      return;
    }

    // Update found results when the search items change
    if (searchItems.length > 0) {
      const searchStrings = searchItems
        .map((item) => item.trim().split(/\s+/))
        .reduce((acc, val) => acc.concat(val), []);

      const results = notes.flatMap((note) => {
        if (
          searchStrings.every((str) =>
            note.text.toLowerCase().includes(str.toLowerCase())
          )
        ) {
          return { type: "note", data: note.text };
        }
        return [];
      });

      const chatResults = chats.flatMap((chat) => {
        const chatMessagesResults = chat.messages.messagesList.flatMap(
          (message) => {
            if (
              searchStrings.every((str) =>
                message.text.toLowerCase().includes(str.toLowerCase())
              )
            ) {
              return { type: "chat", messages: chat.messages };
            }
            return [];
          }
        );
        return chatMessagesResults.length > 0
          ? { type: "chat", messages: chatMessagesResults }
          : [];
      });
      setFoundResults([...results, ...chatResults]);
      return [...results, ...chatResults];
    } else {
      // Clear found results if searchItems is empty
      setFoundResults([]);
      return [];
    }
  };

  const answer = async (event) => {
    event.preventDefault();
    setGenerating(true);
    setOpenAnswerBox(true);
    let info_source;
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
          Detect keywords in this question:${searchItem} by removing articles, pronouns, prepositions and generic words. Stem every keyword. Return stemmed keywords in the form of a JS array. `,
        }),
      });

      if (response.status !== 200) {
        throw (
          (await response.json()).error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const data = await response.json();
      let arr;
      if (data.result.content) {
        arr = JSON.parse(data.result.content.replace(/'/g, '"'));
        setStemmedQuestion([...arr]);
      } else {
        setStemmedQuestion([]);
      }

      // Check if stemmedQuestion is empty before calling findSource
      if ([...arr].length > 0) {
        info_source = findSource(arr, notes, chats);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    let stringifyItems = (items) => {
      return items.reduce((acc, item) => acc + item.data, "");
    };

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
          Answer this question: ${searchItem} using this info: ${stringifyItems(
            info_source
          )}. Yse the same language as the maguage of the question.`,
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
        setRecommendation(data.result.content);
      } else {
        console.log("error =(");
      }
      // Check if stemmedQuestion is empty before calling findSource
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setGenerating(false);
  };

  const autoResizeTextarea = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  return (
    <Styles>
      <div
        className="ask_questions"
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Ask questions abouth this simulator"
        onClick={(e) => setOpen(!open)}
      >
        <img src="/static/question-square.svg" />
        <div>Ask a question</div>
      </div>
      {open && (
        <div className="question_block">
          <textarea
            onChange={(e) => {
              setSearchItem(e.target.value);
              autoResizeTextarea(e);
            }}
          />
          <br />
          <button onClick={(e) => answer(e)}>Ask</button>
          {openAnswerBox && (
            <div className="recommendation">
              {!generating && recommendation}
              {generating && (
                <Progress2>
                  <TailSpin width="25" color="#2E80EC" />
                </Progress2>
              )}
            </div>
          )}
        </div>
      )}
    </Styles>
  );
};

export default AnswerQuestions;
