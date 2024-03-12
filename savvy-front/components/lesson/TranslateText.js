import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

const Styles = styled.div`
  margin-top: 10px;
  .translation_window {
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
    line-height: 1.4;
    font-family: Montserrat;
    font-size: 1.4rem;
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

const TranslateText = (props) => {
  const [translation, setTranslation] = useState();
  const [generating, setGenerating] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAnswerBox, setOpenAnswerBox] = useState(false);

  useEffect(() => {
    if (props.textToBeTranslated.length > 130) {
      setTranslation("Sorry, try a shorter sentence");
    } else {
      setTranslation("");
      translate();
    }
  }, [props.textToBeTranslated, props.translationLanguage]);

  const translate = async (event) => {
    console.log("11");
    if (props.translationLanguage.split(" ").length > 130) return;
    setGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
          Translate this text from English into ${props.translationLanguage}: ${props.textToBeTranslated}.`,
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
        setTranslation(data.result.content);
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
      <div className="question_block">
        <div className="translation_window">
          {generating && (
            <Progress2>
              <TailSpin width="25" color="#2E80EC" />
            </Progress2>
          )}
          {translation}
        </div>
        {/* <br /> */}
        {/* <button onClick={(e) => translate(e)}>Translate</button> */}
        {/* {openAnswerBox && (
          <div className="recommendation">
            {!generating && recommendation}
           
          </div>
        )} */}
      </div>
    </Styles>
  );
};

export default TranslateText;
