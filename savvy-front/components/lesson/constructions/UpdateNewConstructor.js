import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import _ from "lodash";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../../lesson/SingleLesson";

const UPDATE_CONSTRUCTION_MUTATION = gql`
  mutation UPDATE_CONSTRUCTION_MUTATION(
    $id: String!
    $hint: String
    $columnsNum: Int
    $elements: ElementsList
    $goal: String
    $type: String
    $name: String
  ) {
    updateConstruction(
      id: $id
      hint: $hint
      columnsNum: $columnsNum
      elements: $elements
      goal: $goal
      type: $type
      name: $name
    ) {
      id
      name
      goal
      lessonID
      variants
      answer
      hint
      columnsNum
      elements
      type
    }
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2%;
  textarea {
    padding: 10px;
    font-size: 1.6rem;
    font-family: Montserrat;
    line-height: 1.4;
    width: 600px;
    margin-bottom: 40px;
  }
  select {
    width: 50%;
    font-size: 1.4rem;
    outline: none;
    line-height: 1.3;
    padding: 1.5% 2%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    margin-bottom: 1.5%;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  width: 160px;
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
  margin-top: 50px;
  img {
    width: 100px;
    height: 100px;
  }
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
    `1px ${
      props.borders && props.borders.top !== "none" ? "solid" : "dashed"
    } ${
      props.borders && props.borders.top !== "none" ? "#98A0A6" : "#c4c4c4"
    }`};
  border-right: ${(props) =>
    `1px ${
      props.borders && props.borders.right !== "none" ? "solid" : "dashed"
    } ${
      props.borders && props.borders.right !== "none" ? "#98A0A6" : "#c4c4c4"
    }`};
  border-bottom: ${(props) =>
    `1px ${
      props.borders && props.borders.bottom !== "none" ? "solid" : "dashed"
    } ${
      props.borders && props.borders.bottom !== "none" ? "#98A0A6" : "#c4c4c4"
    }`};
  border-left: ${(props) =>
    `1px ${
      props.borders && props.borders.left !== "none" ? "solid" : "dashed"
    } ${
      props.borders && props.borders.left !== "none" ? "#98A0A6" : "#c4c4c4"
    }`};
  grid-column-start: ${(props) => props.startColumn};
  grid-column-end: span ${(props) => props.size};
  grid-row-end: span ${(props) => props.rows};
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
  img {
    width: 100%;
    height: auto;
  }
  .box-container {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 0px;
    width: 44px;
    height: 44px;
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
  .comment {
    border-top: 1px dashed #c4c4c4;
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

const NameInput = styled.input`
  width: 100%;
  height: 40px;
  font-weight: 500;
  font-size: 2rem;
  font-family: Montserrat;
  margin-bottom: 20px;
  border: none;
  outline: none;
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateNewConstructor = (props) => {
  const { construction, lesson } = props;
  const [hint, setHint] = useState(construction.hint);
  const [goal, setGoal] = useState(construction.goal);
  const [name, setName] = useState(construction.name);
  const [columnsNum, setColumns] = useState(construction.columnsNum);
  const [elements, setElements] = useState(construction.elements.elements);
  const [type, setType] = useState(
    construction.type ? construction.type : "DOCUMENT"
  );

  const router = useRouter();

  const { t } = useTranslation("lesson");

  const myCallback2 = (dataFromChild, name) => {
    if (name == "hint") {
      setHint(dataFromChild);
    }
  };

  let mod_el = {
    place: 2,
    inDoc: true,
    isTest: false,
    edit: false,
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

  const getData = (val, i) => {
    const new_elements = [...elements];
    new_elements[i] = val;

    setElements(new_elements);
  };

  const [updateConstruction, { data, loading, error }] = useMutation(
    UPDATE_CONSTRUCTION_MUTATION,
    {
      refetchQueries: [
        { query: SINGLE_LESSON_QUERY, variables: { id: props.lessonId } }, // DocumentNode object parsed with gql
        "SINGLE_LESSON_QUERY", // Query name
      ],
    }
  );

  const { lessonId } = props;
  return (
    <Center>
      <Title>{t("Construction")}</Title>
      <NameInput
        defaultValue={name}
        placeholder="Undefined"
        onChange={(e) => setName(e.target.value)}
      />
      <Explainer>
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
      </Explainer>
      <h3>Goal</h3>
      <textarea onChange={(e) => setGoal(e.target.value)}>{goal}</textarea>
      <Number>
        <div className="name"># of blocks: </div>
        <Buttons>
          <MoreButton
            onClick={(e) => {
              let arr = [...elements];
              arr.pop();
              setElements([...arr]);
            }}
          >
            -
          </MoreButton>
          <MoreButton
            onClick={(e) => {
              let index = elements.length;
              let new_el = { ...mod_el };
              new_el.place = index;
              setElements([...elements, new_el]);
            }}
          >
            +
          </MoreButton>
        </Buttons>
      </Number>
      <Number>
        <div className="name"># of columns: </div>
        <input
          type="number"
          max="30"
          defaultValue={columnsNum}
          onChange={(e) => setColumns(parseInt(e.target.value))}
        />
      </Number>
      <select
        name="types"
        id="types"
        defaultValue={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="DOCUMENT">Document</option>
        <option value="SUMMARY">Summary</option>
      </select>

      <Block columns={columnsNum}>
        {elements.map((el, i) => {
          return (
            <ConElement
              el={el}
              className={"header" + i}
              id={i + 1}
              i={i}
              type={type}
              getData={getData}
            />
          );
        })}
      </Block>
      <ButtonTwo
        onClick={async (e) => {
          e.preventDefault();
          const res = await updateConstruction({
            variables: {
              id: props.id,
              hint,
              columnsNum,
              goal,
              type,
              name,
              elements: { elements },
            },
          });
          props.getResult(res);
          props.switchUpdate();
          props.passUpdated();
        }}
      >
        {loading ? t("saving") : t("save")}
      </ButtonTwo>
    </Center>
  );
};

export default UpdateNewConstructor;

const ConElement = (props) => {
  const { type } = props;
  const [el, setEl] = useState(props.el);
  const [borders, setBorders] = useState(props.el.borders);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const myCallback = (dataFromChild, index) => {
    let new_el = { ...el };
    new_el.text = dataFromChild;
    setEl(new_el);
    props.getData(new_el, props.i);
  };

  const myCallback2 = (dataFromChild, index) => {
    let new_el = { ...el };
    new_el.comment = dataFromChild;
    setEl(new_el);
    props.getData(new_el, props.i);
  };

  const includesTextNodes = (htmlValue) => {
    // Create a temporary element to parse the HTML
    let tempElement = document.createElement("div");
    tempElement.innerHTML = htmlValue;

    // Recursive function to check for text nodes
    const hasTextNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
        return true;
      }
      for (let childNode of node.childNodes) {
        if (hasTextNodes(childNode)) {
          return true;
        }
      }
      return false;
    };

    // Check if any child nodes contain text nodes
    return Array.from(tempElement.childNodes).some((node) =>
      hasTextNodes(node)
    );
  };

  return (
    <Element size={el.size} rows={el.rows} borders={el.borders}>
      <Settings>
        {type && type !== "SUMMARY" && (
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
        )}

        {type && type !== "SUMMARY" && (
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
        )}
        {type && type == "SUMMARY" && (
          <div className="box">
            <input
              type="checkbox"
              checked={el.edit}
              onClick={(e) => {
                let new_el = { ...el };
                new_el.edit = e.target.checked;
                setEl(new_el);
                props.getData(new_el, props.i);
              }}
            />
            <label for="vehicle3">📝</label>
          </div>
        )}
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
          <button onClick={toggleDropdown}>Borders</button>
          {dropdownOpen && (
            <div className="border-dropdown">
              <button
                onClick={() => {
                  let updatedEl = { ...el.borders };
                  updatedEl.top =
                    updatedEl.top === "none" ? "1px solid #98A0A6" : "none";
                  setBorders(updatedEl);
                  let new_el = { ...el };
                  new_el.borders = updatedEl;
                  setEl(new_el);
                  props.getData(new_el, props.i);
                }}
                className={borders && borders.top !== "none" ? "active" : ""}
              >
                Top Border
              </button>
              <button
                onClick={() => {
                  const updatedEl = {
                    ...borders,
                    bottom:
                      borders && borders.bottom === "none"
                        ? "1px solid #98A0A6"
                        : "none",
                  };
                  setBorders(updatedEl);
                  let new_el = { ...el };
                  new_el.borders = updatedEl;
                  setEl(new_el);
                  props.getData(new_el, props.i);
                }}
                className={borders && borders.bottom !== "none" ? "active" : ""}
              >
                Bottom Border
              </button>
              <button
                onClick={() => {
                  const updatedEl = {
                    ...borders,
                    right:
                      borders && borders.right === "none"
                        ? "1px solid #98A0A6"
                        : "none",
                  };
                  setBorders(updatedEl);
                  let new_el = { ...el };
                  new_el.borders = updatedEl;
                  setEl(new_el);
                  props.getData(new_el, props.i);
                }}
                className={borders && borders.right !== "none" ? "active" : ""}
              >
                Right Border
              </button>
              <button
                onClick={() => {
                  const updatedEl = {
                    ...borders,
                    left:
                      borders && borders.left === "none"
                        ? "1px solid #98A0A6"
                        : "none",
                  };
                  setBorders(updatedEl);
                  let new_el = { ...el };
                  new_el.borders = updatedEl;
                  setEl(new_el);
                  props.getData(new_el, props.i);
                }}
                className={borders && borders.left !== "none" ? "active" : ""}
              >
                Left Border
              </button>
            </div>
          )}
        </div>
      </Settings>
      {console.log("includesTextNodes", el.text, includesTextNodes(el.text))}
      <DynamicLoadedEditor
        onChange={(e) => updateEl(e.target.value)}
        getEditorText={myCallback}
        value={includesTextNodes(el.text) ? el.text : ""}
        type="DocBuilder"
      />
      {type && type !== "SUMMARY" && (
        <div className="comment">
          <DynamicLoadedEditor
            getEditorText={myCallback2}
            value={el.comment}
            type="DocBuilder"
          />
        </div>
      )}
    </Element>
  );
};
