import React, { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import UpdateClause from "./UpdateClause";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { InfinitySpin, TailSpin } from "react-loader-spinner";

const Styles = styled.div`
  margin-top: 2%;
  width: ${(props) => (props.story ? "90%" : "100%")};
`;

const BlueButton = styled.button`
  width: 180px;
  background: #3b5bb3;
  font-size: 1.6rem;
  font-weight: 500;
  color: #fff;
  border: 1px solid #3b5bb3;
  font-family: Montserrat;
  outline: 0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  transition: 0.3s ease-in;
  cursor: pointer;
  &:hover {
    border: 1px solid #283d78;
    background: #283d78;
  }
`;

const Frame = styled.div`
  border: 2px solid;
  border-color: ${(props) => props.inputColor};
  border-radius: 10px;
  background: #fff;
  padding: 0 2%;
  margin: 15px 0;
  .com {
    border-top: 1px solid #f3f3f3;
  }
`;

const Comments = styled.div`
  display: block;
  border: 2px solid #f3f3f3;
  border-radius: 10px;
  margin-bottom: 3%;
  padding: 2% 4%;
  p {
    font-size: 1.6rem;
  }
  .comment {
    margin: 2% 0;
    border-bottom: 1px solid #c4c4c4;
    padding-bottom: 2%;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    margin: 1% 0;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 2% 0 2% 0;
`;

const SimpleButton = styled.button`
  /* width: 230px; */
  height: 40px;
  background: none;
  padding: 5px 30px;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const Clause = (props) => {
  const [type, setType] = useState("test");
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState();
  const [result, setResult] = useState();
  const [checked, setChecked] = useState(false);
  const [progress, setProgress] = useState(false);
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [correct, setCorrect] = useState(""); // is the answer by the student correct?
  const [AIImprovement, setAIImprovement] = useState("");
  const [generatingImprovement, setGeneratingImprovement] = useState(null); // give the hint to the student
  const router = useRouter();

  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
    props.getText(dataFromChild, props.index);
  };

  const checkAnswer = async (e) => {
    setChecked(true);
    setProgress(true);
    props.getDraft(text, props.index);
    setShow(true);
    let data1 = {
      answer1: text,
      answer2: props.sample,
    };

    const r = await fetch("https://arcane-refuge-67529.herokuapp.com/checker", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    })
      .then((response) => response.json())
      .then((res) => {
        if (parseFloat(res.res) > 65) {
          setCorrect("true");
          setInputColor("rgba(50, 172, 102, 0.25)");
        } else if (parseFloat(res.res) > 55 && parseFloat(res.res) <= 65) {
          setCorrect("looks_true");
          setInputColor("#ffd166");
        } else {
          setCorrect("false");
          setInputColor("rgba(222, 107, 72, 0.5)");
          // if (typeof res.comment === "string") {

          // }
        }
      })
      .catch((err) => console.log(err));
    setProgress(false);
  };

  const getImprovement = async (event) => {
    event.preventDefault();
    setGeneratingImprovement(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
          You are a mentor and a teacher. You ask your student to write a text on the following topic: ${commentary}
          The correct answer is:  ${props.sample}. 
          Your student's text is: ${text}
          Explain in 3 sentences what the student's answer is missing in comparison to the correct answer.
          Answer in ${
            router.locale == "ru" ? "Russian" : "English"
          }Make the answer at least 2 sentences long.`,
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
        setAIImprovement(data.result.content);
      } else {
        setAIImprovement("Sorry, you are on your own");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setGeneratingImprovement(false);
  };

  const {
    id,
    index,
    total,
    number,
    getNumber,
    commentary,
    keywords,
    story,
    sample,
  } = props;
  return (
    <Styles size={story}>
      {props.me.id === props.userID && (
        <button onClick={(e) => setType(type === "update" ? "test" : "update")}>
          Update section
        </button>
      )}
      {type === "test" && (
        <>
          {/* <div>
            {" "}
            Section {index}.{parse(commentary)}
          </div> */}
          <div>{parse(commentary)}</div>
          <Frame inputColor={inputColor}>
            <DynamicLoadedEditor getEditorText={myCallback} />
          </Frame>
          {(progress || generatingImprovement) && (
            <Progress>
              <InfinitySpin width="200" color="#2E80EC" />
            </Progress>
          )}
          {checked && AIImprovement && <Comments>{AIImprovement}</Comments>}
          <Buttons>
            <SimpleButton onClick={(e) => checkAnswer(e)}>
              Check section
            </SimpleButton>
            {checked && (
              <SimpleButton onClick={(e) => getImprovement(e)}>
                How can I improve my answer?
              </SimpleButton>
            )}
            {checked && (
              <SimpleButton onClick={(e) => getImprovement(e)}>
                What am I missing?
              </SimpleButton>
            )}
            {index !== total ? (
              <BlueButton onClick={(e) => getNumber(index + 1)}>
                Next section
              </BlueButton>
            ) : (
              // <div>The end</div>
              <div></div>
            )}
          </Buttons>
        </>
      )}
      {type === "update" && (
        <>
          <UpdateClause
            id={id}
            sample={sample}
            number={number}
            commentary={commentary}
            keywords={keywords}
          />
        </>
      )}
    </Styles>
  );
};

export default Clause;
