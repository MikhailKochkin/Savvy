import { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import _ from "lodash";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { Message } from "../styles/Button";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

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

const TextBox = styled.div`
  font-size: 1.6rem;
  width: 90%;
  border: 1px solid #c4c4c4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: 0;
  padding: 2%;
  font-size: 1.6rem;
  margin-top: 3%;
  .header {
    border-bottom: 1px solid #c4c4c4;
    width: 100%;
  }
  @media (max-width: 800px) {
    width: 350px;
  }
`;

const Advice = styled.p`
  font-size: 1.5rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0;
  width: 80%;
  div {
    margin-bottom: 1.5%;
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
  /* box-shadow: 0px 0px 3px 0px rgb(199 199 199); */
  /* padding: 10px 5%; */
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
  /* padding: 3% 5%; */
  grid-column: ${(props) => {
    return `1/${props.size}`;
  }};
  .button {
    border: none;
    background: none;
    /* width: 30px; */
    height: 30px;
  font-size: 1.2rem;
    display: flex;
    cursor: pointer;
    flex-direction: row;
    align-items; center;
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

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
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

  const { t } = useTranslation("lesson");
  const router = useRouter();

  const [elements, setElements] = useState([
    {
      place: 0,
      inDoc: true,
      isTest: false,
      size: 0,
      text: "<p></p>",
      type: "",
      value: "",
    },
    {
      place: 1,
      inDoc: true,
      isTest: false,
      size: 0,
      text: "<p></p>",
      type: "",
      value: "",
    },
    {
      place: 2,
      inDoc: true,
      isTest: false,
      size: 0,
      text: "<p></p>",
      type: "",
      value: "",
    },
  ]);

  let mod_el = {
    place: 2,
    inDoc: true,
    isTest: false,
    size: 0,
    text: "<p></p>",
    type: "",
    value: "",
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
      <Title>{t("Construction")}</Title>
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
      <Number>
        <div className="name">Number of blocks: </div>
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
        <div className="name">Number of columns: </div>
        <input
          type="number"
          max="30"
          defaultValue={columnsNum}
          onChange={(e) => setColumns(parseInt(e.target.value))}
        />
      </Number>

      <Block columns={columnsNum}>
        {elements.map((el, i) => {
          return (
            <ConElement
              el={el}
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
      <Message id="Message">Готово!</Message>
    </Center>
  );
};

export default CreateConstructor;

const ConElement = (props) => {
  const [el, setEl] = useState(props.el);

  const myCallback = (dataFromChild, index) => {
    let new_el = { ...el };
    new_el.text = dataFromChild;
    setEl(new_el);
    props.getData(new_el, props.i);
  };

  return (
    <Element size={el.size}>
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

        <div
          className="box"
          onClick={(e) => {
            let new_el = { ...el };
            let new_size = new_el.size;
            if (el.size == 0) {
              new_size = 3;
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
      </Settings>
      <DynamicLoadedEditor
        onChange={(e) => updateEl(e.target.value)}
        getEditorText={myCallback}
        value={el.text}
      />
    </Element>
  );
};
