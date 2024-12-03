import { useState, useEffect } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import _ from "lodash";
import { gql } from "@apollo/client";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { SINGLE_LESSON_QUERY } from "../../lesson/SingleLesson";
import {
  Row,
  ActionButton,
  SecondaryButton,
  MicroButton,
} from "../styles/DevPageStyles";
const CREATE_CONSTRUCTION_MUTATION = gql`
  mutation CREATE_CONSTRUCION_MUTATION(
    $name: String!
    $variants: [String!]
    $answer: [String!]
    $hint: String
    $columnsNum: Int
    $elements: ElementsList
    # $type: String!
    # $text: String!
    # $hasText: Boolean!
    $lessonId: String!
  ) {
    createConstruction(
      name: $name
      lessonId: $lessonId
      variants: $variants
      answer: $answer
      hint: $hint
      columnsNum: $columnsNum
      elements: $elements # hasText: $hasText # text: $text # type: $type
    ) {
      id
      name
      lessonID
      variants
      answer
      hint
      columnsNum
      elements
      user {
        id
      }
    }
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2%;
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  width: 250px;
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
`;

const Explainer = styled.div`
  width: 700px;
  margin-bottom: 20px;
  .icon {
    width: 30px;
    height: 20px;
  }
  #green {
    color: #81b29a;
  }
  #red {
    color: #e07a5f;
  }
  #orange {
    color: #f2cc8f;
  }
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2%;
`;

const Block = styled.div`
  width: 900px;
  height: auto;
  display: grid;
  column-gap: 10px;
  row-gap: 10px;
  grid-template-columns: ${(props) => {
    return `repeat(${props.columns}, 1fr)`;
  }};
  grid-template-rows: auto;
`;

const Element = styled.div`
  font-size: 1.6rem;
  width: 100%;
  height: 100%;
  border: 1px dashed #c4c4c4;
  border-top: ${(props) =>
    `1px ${props.borders.top !== "none" ? "solid" : "dashed"} ${
      props.borders.top !== "none" ? "#98A0A6" : "#c4c4c4"
    }`};
  border-right: ${(props) =>
    `1px ${props.borders.right !== "none" ? "solid" : "dashed"} ${
      props.borders.right !== "none" ? "#98A0A6" : "#c4c4c4"
    }`};
  border-bottom: ${(props) =>
    `1px ${props.borders.bottom !== "none" ? "solid" : "dashed"} ${
      props.borders.bottom !== "none" ? "#98A0A6" : "#c4c4c4"
    }`};
  border-left: ${(props) =>
    `1px ${props.borders.left !== "none" ? "solid" : "dashed"} ${
      props.borders.left !== "none" ? "#98A0A6" : "#c4c4c4"
    }`};

  grid-column-start: ${(props) => {
    return props.startColumn;
  }};
  grid-column-end: span ${(props) => props.size};
  grid-row-end: span ${(props) => props.rows};
  img {
    width: 100%;
    height: auto;
  }
  .border-dropdown {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .border-dropdown button.active {
    background-color: #ddd; /* Gray background to indicate "pressed" */
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); /* Inner shadow for depth */
  }
  .box-container {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 50px;
    height: 50px;
  }

  .box {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;
    text-align: center;
    line-height: 50px;
    font-size: 10px;
  }

  .up {
    grid-row: 1;
    grid-column: 2;
  }

  .left {
    grid-row: 2;
    grid-column: 1;
  }

  .right {
    grid-row: 2;
    grid-column: 3;
  }

  .down {
    grid-row: 3;
    grid-column: 2;
  }

  .button {
    border: none;
    background: none;
    /* width: 30px; */
    height: 30px;
    font-size: 1.2rem;
    display: flex;
    cursor: pointer;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: ease 0.3s;
  }
`;

const Settings = styled.div`
  border-bottom: 1px dashed #c4c4c4;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  .box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const Number = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  .name {
    margin-right: 20px;
  }
  input {
    width: 100px;
    outline: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 15%;
`;

const MoreButton = styled.button`
  font-size: 1.8rem;
  background: #ffffff;
  border: 1px solid #112a62;
  color: #112a62;
  box-sizing: border-box;
  border-radius: 5px;
  height: 30px;
  width: 45%;
  cursor: pointer;
  outline: 0;
  &:active {
    border: 2px solid #112a62;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CreateConstructor = (props) => {
  const [name, setName] = useState("");
  const [variants, setVariants] = useState(["c"]);
  const [answer, setAnswer] = useState("");
  const [answersNumber, setAnswersNumber] = useState("");
  const [hint, setHint] = useState("");
  // const [hasText, setHasText] = useState(false);
  // const [type, setType] = useState("equal");
  const [columnsNum, setColumns] = useState(3);
  const [startingColumns, setStartingColumns] = useState([]);

  const { t } = useTranslation("lesson");
  const router = useRouter();

  // useEffect(() => {
  //   let columns = 0;
  //   const newStartingColumns = elements.map((el) => {
  //     const start = columns + 1;
  //     columns += el.size;
  //     return start;
  //   });
  //   setStartingColumns(newStartingColumns);
  // }, [elements]);

  const [elements, setElements] = useState([
    {
      place: 0,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1, // This means the element will span 1 row by default.
      text: "<p></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        right: "none",
        bottom: "none",
        left: "none",
      },
    },
    {
      place: 1,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1, // This means the element will span 1 row by default.
      text: "<p></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        right: "none",
        bottom: "none",
        left: "none",
      },
    },
    {
      place: 2,
      inDoc: true,
      isTest: false,
      size: 0,
      rows: 1, // This means the element will span 1 row by default.
      text: "<p></p>",
      type: "",
      value: "",
      borders: {
        top: "none",
        right: "none",
        bottom: "none",
        left: "none",
      },
    },
  ]);

  let mod_el = {
    place: 2,
    inDoc: true,
    isTest: false,
    size: 0,
    rows: 1, // This means the element will span 1 row by default.
    text: "<p></p>",
    type: "",
    value: "",
    borders: {
      top: "none",
      right: "none",
      bottom: "none",
      left: "none",
    },
  };

  const myCallback2 = (dataFromChild, name) => {
    if (name == "hint") {
      setHint(dataFromChild);
    }
  };

  const getData = (val, i) => {
    const new_elements = [...elements];
    new_elements[i] = val;

    setElements(new_elements);
  };

  const { lessonID } = props;
  return (
    <Center>
      {/* <Explainer>
        {router.locale == "ru" ? (
          <>
            <p>
              Задача конструктора – дать студенту возможность самостоятельно
              создать полноценный документ, слайд или формулу. Для этого ему
              предстоит выбрать нужные блоки и поместить их в правильное место.
              Вы можете создать любое количество блоков в любых конфигурациях.
              Но обратите внимание на их настройки:
            </p>
            <ul>
              <li>
                По общему правилу блоки статичны. То есть, когда они будут
                показываться студентам, двигать их будет нельзя.
              </li>
              <li>
                Нажмите на ✅, чтобы сделать блок активным. Тогда студент при
                выполнении задания сможет ставить его на разные места в
                документе.
              </li>
              <li>
                Нажмите на ⛔️, если хотите сделать блок лишним. Тогда он будет
                предложен студенту как вариант, но в документе для него места не
                будет. Обязательно ставьте такие блоки в самый конец документа.
              </li>
              <li>Нажмите на ➡️, если хотите увеличить ширину блока.</li>
            </ul>
          </>
        ) : (
          <>
            <p>
              The purpose of the doc builder is to develop the skill of drafting
              documents. To do this, students will have to select the right
              blocks and place them in the right places. You can create any
              number of blocks in any configuration. But pay attention to these
              settings:
            </p>
            <ul>
              <li>
                As a general rule, blocks are static. That is, when they are
                shown to the students, they cannot be moved.
              </li>
              <li>
                Press ✅ to make the block active. The student will then be able
                to move it to different positions in the document.
              </li>
              <li>
                Press ⛔️ if you want to make the block redundant. It will then
                be an option to the student, but there will be no room for it in
                the document. Please put such blocks at the very end of the
                document.
              </li>
              <li>Press ➡️ if you want to increase the block width.</li>
            </ul>
          </>
        )}
      </Explainer> */}
      <Row>
        <div className="description">Name</div>
        <div className="action_area">
          <input
            onChange={(e) => setName(e.target.value)}
            defaultValue={name}
            placeholder="Untitled"
          />
          <div className="explainer">The name will be used for navigation</div>
        </div>
      </Row>
      <Row>
        <div className="description">Number of columns</div>
        <div className="action_area">
          <input
            type="number"
            max="30"
            defaultValue={columnsNum}
            onChange={(e) => setColumns(parseInt(e.target.value))}
          />
        </div>
      </Row>
      <Row>
        <div className="description">Number of blocks</div>
        <div className="action_area">
          <SecondaryButton
            onClick={(e) => {
              let arr = [...elements];
              arr.pop();
              setElements([...arr]);
            }}
          >
            -
          </SecondaryButton>
          <SecondaryButton
            onClick={(e) => {
              let index = elements.length;
              let new_el = { ...mod_el };
              new_el.place = index;
              setElements([...elements, new_el]);
            }}
          >
            +
          </SecondaryButton>
        </div>
      </Row>

      <Block columns={columnsNum}>
        {elements.map((el, i) => {
          return (
            <ConElement
              el={el}
              startColumn={startingColumns[i]}
              className={"header" + i}
              id={i + 1}
              i={i}
              getData={getData}
            />
          );
        })}
      </Block>
      {/* <TextBox>
        <DynamicLoadedEditor
          name="hint"
          getEditorText={myCallback2}
          value={hint}
          placeholder="Запишите подсказку или пояснение к конструктору"
        />
      </TextBox> */}
      <Mutation
        mutation={CREATE_CONSTRUCTION_MUTATION}
        variables={{
          lessonId: lessonID,
          answer,
          variants,
          name,
          hint,
          columnsNum,
          elements: { elements },
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID },
          },
        ]}
      >
        {(createConstruction, { loading, error }) => (
          <ButtonTwo
            onClick={async (e) => {
              e.preventDefault();
              // const res0 = await generate();
              const res = await createConstruction();
              props.getResult(res);
            }}
          >
            {loading ? t("saving") : t("save")}
          </ButtonTwo>
        )}
      </Mutation>
      {/* <Message id="Message">Готово!</Message> */}
    </Center>
  );
};

export default CreateConstructor;

const ConElement = (props) => {
  const [el, setEl] = useState(props.el);
  const [borders, setBorders] = useState({
    top: "none",
    right: "none",
    bottom: "none",
    left: "none",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const myCallback = (dataFromChild, index) => {
    let new_el = { ...el };
    new_el.text = dataFromChild;
    setEl(new_el);
    props.getData(new_el, props.i);
  };

  return (
    <Element size={el.size} rows={el.rows} borders={borders}>
      <Settings>
        <div className="box">
          <input
            type="checkbox"
            checked={el.isTest}
            onClick={(e) => {
              let new_el = { ...el };
              new_el.isTest = e.target.checked;
              setEl(new_el);
              props.getData(new_el, props.i);
            }}
          />
          <label for="vehicle3">✅</label>
        </div>

        <div className="box">
          <input
            type="checkbox"
            checked={!el.inDoc}
            onClick={(e) => {
              let new_el = { ...el };
              new_el.inDoc = !e.target.checked;
              setEl(new_el);
              props.getData(new_el, props.i);
            }}
          />
          <label for="vehicle3">⛔️</label>
        </div>
        <div className="box-container">
          <div
            className="box up"
            onClick={(e) => {
              let new_el = { ...el };
              let new_rows = new_el.rows;
              if (el.rows == 1) {
                new_rows = 1;
              } else {
                new_rows = new_rows - 1;
              }
              new_el.rows = new_rows;

              setEl(new_el);
              props.getData(new_el, props.i);
            }}
          >
            <div> ⬆️ </div>
          </div>
          <div
            className="box left"
            onClick={(e) => {
              let new_el = { ...el };
              let new_size = new_el.size;
              if (el.size == 0) {
                new_size = 0;
              } else {
                new_size = new_size - 1;
              }
              new_el.size = new_size;

              setEl(new_el);
              props.getData(new_el, props.i);
            }}
          >
            <div> ⬅️ </div>
          </div>
          <div
            className="box right"
            onClick={(e) => {
              let new_el = { ...el };
              let new_size = new_el.size;
              if (el.size == 0) {
                new_size = 2;
              } else {
                new_size = new_size + 1;
              }
              new_el.size = new_size;

              setEl(new_el);
              props.getData(new_el, props.i);
            }}
          >
            <div> ➡️ </div>
          </div>

          <div
            className="box down"
            onClick={(e) => {
              let new_el = { ...el };
              let new_rows = new_el.rows + 1;
              new_el.rows = new_rows;

              setEl(new_el);
              props.getData(new_el, props.i);
            }}
          >
            <div> ⬇️ </div>
          </div>
        </div>
        <div>
          <button onClick={toggleDropdown}>Set Borders</button>
          {dropdownOpen && (
            <div className="border-dropdown">
              <button
                onClick={() => {
                  const updatedEl = {
                    ...borders,
                    top: borders.top === "none" ? "1px solid #98A0A6" : "none",
                  };
                  setBorders(updatedEl);
                  let new_el = { ...el };
                  new_el.borders = updatedEl;
                  setEl(new_el);
                  props.getData(new_el, props.i);
                }}
                className={borders.top !== "none" ? "active" : ""}
              >
                Top Border
              </button>
              <button
                onClick={() => {
                  const updatedEl = {
                    ...borders,
                    right:
                      borders.right === "none" ? "1px solid #98A0A6" : "none",
                  };
                  setBorders(updatedEl);
                  let new_el = { ...el };
                  new_el.borders = updatedEl;
                  setEl(new_el);
                  props.getData(new_el, props.i);
                }}
                className={borders.right !== "none" ? "active" : ""}
              >
                Right Border
              </button>
              <button
                onClick={() => {
                  const updatedEl = {
                    ...borders,
                    bottom:
                      borders.bottom === "none" ? "1px solid #98A0A6" : "none",
                  };
                  setBorders(updatedEl);
                  let new_el = { ...el };
                  new_el.borders = updatedEl;
                  setEl(new_el);
                  props.getData(new_el, props.i);
                }}
                className={borders.bottom !== "none" ? "active" : ""}
              >
                Bottom Border
              </button>
              <button
                onClick={() => {
                  const updatedEl = {
                    ...borders,
                    left:
                      borders.left === "none" ? "1px solid #98A0A6" : "none",
                  };
                  setBorders(updatedEl);
                  let new_el = { ...el };
                  new_el.borders = updatedEl;
                  setEl(new_el);
                  props.getData(new_el, props.i);
                }}
                className={borders.left !== "none" ? "active" : ""}
              >
                Left Border
              </button>
            </div>
          )}
        </div>
      </Settings>
      <DynamicLoadedEditor
        onChange={(e) => updateEl(e.target.value)}
        getEditorText={myCallback}
        value={el.text}
      />
    </Element>
  );
};
