import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import Modal from "styled-react-modal";
import dynamic from "next/dynamic";
import { useMutation, gql, useQuery } from "@apollo/client";
import smoothscroll from "smoothscroll-polyfill";
import { useTranslation } from "next-i18next";
// import Box from "./Box";

const CREATE_CONSTRUCTIONRESULT_MUTATION = gql`
  mutation CREATE_CONSTRUCTIONRESULT_MUTATION(
    $answer: String
    $attempts: Int
    $lessonId: String
    $constructionId: String
    $elements: ElementsList
    $answers: ConstructionAnswers
  ) {
    createConstructionResult(
      answer: $answer
      attempts: $attempts
      lessonId: $lessonId
      constructionId: $constructionId
      elements: $elements
      answers: $answers
    ) {
      id
    }
  }
`;

const UPDATE_CONSTRUCTIONRESULT_MUTATION = gql`
  mutation UPDATE_CONSTRUCTIONRESULT_MUTATION(
    $id: String
    $elements: ElementsList
  ) {
    updateConstructionResult(id: $id, elements: $elements) {
      id
      elements
    }
  }
`;

const Styles = styled.div`
  width: ${(props) => (props.story ? "85vw" : "100%")};
  max-width: 1350px;
  display: flex;
  margin-bottom: 4%;
  font-size: 1.4rem;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 800px) {
    font-size: 1.4rem;
    width: 100%;
    padding-right: 0%;
    margin-bottom: 30px;
    display: block;
    height: auto;
  }
`;

const FixedButton = styled.div`
  position: fixed;
  cursor: pointer;
  padding: 10px 2%;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  position: fixed;
  margin-right: 0px;

  bottom: 20px;
  right: 0;

  z-index: 4;

  .arrow {
    width: 25px;
  }
  @media (max-width: 1650px) {
    width: 60px;
    height: 60px;
  }
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  /* align-items: stretch; // Stretch to match tallest child */
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  width: 160px;
  height: 45px;
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
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
  @media (max-width: 800px) {
    width: 120px;
  }
`;

const Block = styled.div`
  overflow: auto; // Add this line
  width: 950px;
  height: auto;
  display: grid;
  background: #fff;
  column-gap: 10px;
  row-gap: 10px;
  box-shadow: 0px 0px 3px 0px rgb(199 199 199);
  padding: 30px;
  grid-template-columns: ${(props) => {
    return `repeat(${props.columns}, 1fr)`;
  }};

  grid-template-rows: auto;
  img {
    width: 100px;
    height: 100px;
  }
  grid-template-rows: auto;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Element = styled.div`
  font-size: 1.6rem;
  width: 100%;
  height: 100%;
  border: 1px dashed #c4c4c4;
  display: ${(props) => (props.display ? "flex" : "none")};
  flex-direction: column;
  /* justify-content: flex-start;
  align-items: flex-start; */
  font-size: 1.6rem;
  .comment_yellow {
    border: 2px solid #f3cf95;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    width: 90%;
  }
  .tick {
    margin-left: 30px;
  }
  /* min-height: 150px; */
  width: 100%;
  height: 100%;
  border-top: ${(props) =>
    `1px ${
      props.borders && props.borders.top !== "none" ? "solid" : "dashed"
    } ${props.borders && props.borders.top !== "none" ? "#B7B6C2" : "#fff"}`};
  border-right: ${(props) =>
    `1px ${
      props.borders && props.borders.right !== "none" ? "solid" : "dashed"
    } ${props.borders && props.borders.right !== "none" ? "#B7B6C2" : "#fff"}`};
  border-bottom: ${(props) =>
    `1px ${
      props.borders && props.borders.bottom !== "none" ? "solid" : "dashed"
    } ${
      props.borders && props.borders.bottom !== "none" ? "#B7B6C2" : "#fff"
    }`};
  border-left: ${(props) =>
    `1px ${
      props.borders && props.borders.left !== "none" ? "solid" : "dashed"
    } ${props.borders && props.borders.left !== "none" ? "#B7B6C2" : "#fff"}`};
  padding: 15px 15px;
  grid-column-start: ${(props) => props.startColumn};
  grid-column-end: span ${(props) => props.size};
  grid-row-end: span ${(props) => props.rows};
  p {
    margin: 0;
  }
  img {
    width: 100%;
    height: auto;
  }

  .edit {
    width: 90px;
    font-size: 1.6rem;
    line-height: 1.8;
    font-family: Montserrat;
    border: none;
    outline: 0;
    resize: none;
    color: #393939;
    overflow: hidden;
    height: auto;
    background: #bef1ed;
    padding: 3px 3px;
  }
  .mini_button {
    color: #6d7578;
    border: 1px solid #6d7578;
    font-family: Montserrat;
    background: none;
    outline: 0;
    border-radius: 3px;
    padding: 4px 7px;
    margin: 0 5px;
    transition: all 0.3s ease;
    &:hover {
      color: white;
      background: #6d7578;
    }
  }
  .show_button {
    color: #6d7578;
    border: 1px solid #6d7578;
    font-family: Montserrat;
    background: none;
    outline: 0;
    border-radius: 3px;
    padding: 4px 7px;
    margin: 0 5px;
    transition: all 0.3s ease;
    &:hover {
      color: white;
      background: #6d7578;
    }
  }
  .blocked {
    pointer-events: none;
    color: #6d7578;
    border: 1px solid #6d7578;
    font-family: Montserrat;
    background: none;
    outline: 0;
    border-radius: 3px;
    padding: 4px 7px;
    margin: 0 5px;
    transition: all 0.3s ease;
    &:hover {
      color: white;
      background: #6d7578;
    }
  }

  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: ${(props) => (props.shiver ? "shake 1s" : "none")};
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

function compareArrays(arr1, arr2) {
  // Check if both arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Loop through the arrays to compare the 'text' property
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] && arr2[i]) {
      if (arr1[i].text !== arr2[i].text) {
        return false;
      }
    } else if (!arr1[i] && !arr2[i]) {
      continue;
    } else {
      return false;
    }
  }

  return true;
}

function transformArray(arr) {
  return arr.map((item) => {
    if (item.isTest === false) {
      return true;
    }
    if (item.inDoc === false) {
      return true;
    }
    return false;
  });
}

const NewConstructor = (props) => {
  const { construction, lessonID, story, constructionResults } = props;
  let elements = construction.elements.elements;
  const { t } = useTranslation("lesson");
  const [attempts, setAttempts] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(
    [...constructionResults?.constructionResults].length > 0
      ? [...constructionResults?.constructionResults].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )[0]?.elements?.elements
      : elements
  );
  const [answersCheck, setAnswersCheck] = useState(
    elements.map((t) => (t.isTest ? false : true))
  );
  const [used, setUsed] = useState(
    Array(elements.filter((t) => t.isTest == true).length).fill("")
  );

  const [createConstructionResult, { data, loading, error }] = useMutation(
    CREATE_CONSTRUCTIONRESULT_MUTATION
  );

  const [
    updateConstructionResult,
    { data: update_data, loading: update_loading },
  ] = useMutation(UPDATE_CONSTRUCTIONRESULT_MUTATION);

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  const getData = (val, i) => {
    const new_elements = [...input];
    new_elements[i] = val;
    setInput([...new_elements]);
  };

  const getAnswer = (val, i, answer) => {
    let new_arr = [...used];
    new_arr[i - 1] = answer;
    setUsed(new_arr);
    let arr = [...answersCheck];
    arr[i] = val;
    setAnswersCheck(arr);
  };

  const passResult = (val) => {
    if (answers.filter((an) => an.id == val.id).length == 0) {
      setAnswers([...answers, val]);
    }
  };

  const getInput = (val, index) => {
    let new_input = [...input];
    new_input[index] = val;
    setInput(new_input);
  };

  const onCheck = (val, i) => {
    setAttempts(attempts + 1);
    if (
      constructionResults?.constructionResults[0]?.elements?.elements.length > 0
    ) {
      updateConstructionResult({
        variables: {
          id: constructionResults?.constructionResults[0].id,
          elements: { elements: input },
        },
      });
    } else {
      createConstructionResult({
        variables: {
          answer: "",
          attempts: attempts,
          lessonId: lessonID,
          constructionId: construction.id,
          elements: { elements: input },
        },
      });
    }
  };

  const slide = (id) => {
    var my_element = document.getElementById("construction_" + id);
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const toggleModal = (e) => setIsOpen(!isOpen);

  return (
    <>
      {props.story && (
        <FixedButton onClick={(e) => toggleModal()}>
          {" "}
          <img className="arrow" src="../../static/edit.svg" />
        </FixedButton>
      )}
      <Styles id={"construction_" + construction.id}>
        <OuterContainer>
          <Block id="con_block" columns={construction.columnsNum}>
            {input &&
              input.map((t, i) => (
                <ConElement
                  el={t}
                  passResult={passResult}
                  getInput={getInput}
                  text={t.text}
                  size={t.size}
                  rows={t.rows}
                  borders={t.borders}
                  edit={t.edit}
                  className={"header" + i}
                  id={i + 1}
                  i={i}
                  type={construction.type}
                  place={t.place}
                  elems={elements}
                  getAnswer={getAnswer}
                  status={elements[i]?.text == input[i]?.text}
                  display={t.inDoc}
                  allCorrect={compareArrays(elements, input)}
                  getData={getData}
                />
              ))}
            <ButtonTwo onClick={(e) => onCheck()}>
              {update_loading || loading ? t("saving") : t("save")}
            </ButtonTwo>
          </Block>
        </OuterContainer>
      </Styles>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <Styles id={"construction_" + construction.id}>
          <OuterContainer>
            <Block id="con_block" columns={construction.columnsNum}>
              {input &&
                input.map((t, i) => (
                  <ConElement
                    el={t}
                    passResult={passResult}
                    getInput={getInput}
                    text={t.text}
                    size={t.size}
                    rows={t.rows}
                    borders={t.borders}
                    edit={t.edit}
                    className={"header" + i}
                    id={i + 1}
                    i={i}
                    type={construction.type}
                    place={t.place}
                    elems={elements}
                    getAnswer={getAnswer}
                    status={elements[i]?.text == input[i]?.text}
                    display={t.inDoc}
                    allCorrect={compareArrays(elements, input)}
                    getData={getData}
                  />
                ))}
              <ButtonTwo onClick={(e) => onCheck()}>
                {update_loading || loading ? t("saving") : t("save")}
              </ButtonTwo>
            </Block>
          </OuterContainer>
        </Styles>
      </StyledModal>
    </>
  );
};

const ConElement = (props) => {
  const [size, setSize] = useState(props.size);
  const { el, isTest, text, i, type, edit, borders, rows, shiver, display } =
    props;

  const myCallback = (dataFromChild, index) => {
    let new_el = { ...el };
    new_el.text = dataFromChild;
    props.getData(new_el, props.i);
  };
  return (
    <Element
      shiver={shiver}
      isTest={isTest}
      size={size}
      rows={rows}
      display={display}
      borders={borders}
      colored={text !== "<p></p>"}
    >
      {!edit && <div>{parse(text)}</div>}
      {type == "SUMMARY" && edit && (
        <DynamicLoadedEditor
          getEditorText={myCallback}
          value={text}
          type="DocBuilder"
          placeholder={`...`}
        />
      )}
    </Element>
  );
};

const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default NewConstructor;
