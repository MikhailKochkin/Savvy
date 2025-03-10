import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import _ from "lodash";
import { gql } from "@apollo/client";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

// import { Message } from "../styles/Button";
import { SINGLE_LESSON_QUERY } from "../../SingleLesson";

const UPDATE_CONSTRUCTION_MUTATION = gql`
  mutation UPDATE_CONSTRUCTION_MUTATION(
    $id: String!
    $variants: [String!]
    $answer: [String!]
    $complexity: Int
    $name: String
    $hint: String
    $type: String
  ) {
    updateConstruction(
      id: $id
      variants: $variants
      answer: $answer
      type: $type
      complexity: $complexity
      name: $name
      hint: $hint
    ) {
      id
    }
  }
`;

const CustomSelect = styled.div``;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2%;
`;

const Textarea = styled.textarea`
  font-size: 1.6rem;
  height: 100px;
  width: 90%;
  border: 1px solid #c4c4c4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: 0;
  padding: 2%;
  font-size: 1.6rem;
  margin-top: 3%;

  @media (max-width: 800px) {
    width: 350px;
  }
`;

const Button = styled.button`
  padding: 1.5% 3%;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 3%;
  width: 20%;
  color: #fffdf7;
  background: ${(props) => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${(props) => props.theme.darkGreen};
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 15%;
  margin-top: 2%;
`;

const MoreButton = styled.button`
  font-size: 2.2rem;
  background: #ffffff;
  border: 1px solid #112a62;
  color: #112a62;
  box-sizing: border-box;
  border-radius: 5px;
  height: 30px;
  width: 45%;
  margin-top: 10px;
  cursor: pointer;
  outline: 0;
  &:active {
    border: 2px solid #112a62;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const ChooseTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  select {
    font-size: 1.4rem;
    outline: none;
    line-height: 1.3;
    padding: 0.5% 1%;
    max-width: 100%;
    box-sizing: border-box;
    margin-top: 2%;
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
  select.number {
    width: 20%;
    margin-top: 5%;
    margin: 3%;
  }
  select.type {
    width: 80%;
    margin-top: 5%;
    margin: 3%;
  }

  ${CustomSelect} {
    width: 70%;
    border-radius: 3px;
  }
  ${CustomSelect} select {
    width: 100%;
    border: none;
    box-shadow: none;
    background: #0878c6;
    color: white;
  }
  ${CustomSelect} select:focus {
    outline: none;
  }
  @media (max-width: 800px) {
    select {
      width: 100%;
    }
    ${CustomSelect} {
      width: 70%;
      border-radius: 3px;
    }
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

const Box = styled.div``;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background: #eff8ff;
  width: 90%;
  padding: 2%;
`;

const Variants = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2%;
`;

const Complexity = styled.div`
  select,
  option {
    width: 90%;
    border-radius: 5px;
    margin: 3% 0;
    border: 1px solid #c4c4c4;
    font-family: Montserrat;
    font-size: 1.4rem;
    outline: 0;
    padding: 1.5%;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateConstruction = (props) => {
  const [name, setName] = useState(props.name);
  const [variants, setVariants] = useState(props.variants);
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState(props.hint);
  const [answersNumber, setAnswersNumber] = useState();
  const [type, setType] = useState(props.type);
  const [partsNumber, setPartsNumber] = useState("");
  const { t } = useTranslation("lesson");

  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );
  useEffect(() => {
    let arr = [];
    props.answer.map((n) => {
      let index = props.variants.indexOf(n);
      if (index != -1) {
        arr.push(index + 1);
      }
      setAnswersNumber(arr);
    });
  }, [0]);

  const myCallback = (dataFromChild, index) => {
    let arr = [...variants];

    arr[index] = dataFromChild;
    setVariants(arr);
  };

  const myCallback2 = (dataFromChild, name) => {
    if (name == "hint") {
      setHint(dataFromChild);
    }
  };

  const generate = () => {
    let correct = [];
    let nums = answersNumber
      .split(",")
      .map((el) => (el = parseInt(el)))
      .filter((el) => !Object.is(el, NaN));
    nums.map((num) => {
      correct.push(variants[num - 1]);
    });
    setAnswer(correct);
  };

  const { lessonID } = props;
  return (
    <Center>
      <Advice>
        <div>
          Обращаем внимание. В конструкторе надо указать, важен ли порядок его
          частей при ответе. Например, если вы просите составить договор,
          очевидно, что порядок частей будет важен. Если же вы просите выбрать
          характеристики какого-то понятия, то там порядок не будет важен.
        </div>{" "}
        <div>Количество частей конструктора не ограничено.</div>
      </Advice>
      <Title>Изменить конструктор</Title>
      <Header>
        <ChooseTag>
          <p> Метод проверки </p>
          <select
            className="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="equal">Важна последовательность ответов</option>
            <option value="include">
              Не важна последовательность ответов
            </option>{" "}
          </select>
        </ChooseTag>
      </Header>
      <Box>
        <Textarea
          type="text"
          placeholder="Название конструктора"
          spellCheck={true}
          name="name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>

      <Complexity>
        <select
          value={complexity}
          onChange={(e) => setComplexity(parseInt(e.target.value))}
        >
          <option value={0}>Выберите сложность</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </Complexity>
      {variants.map((option, index) => (
        <>
          <TextBox>
            <div className="header">{index + 1}.</div>
            <DynamicLoadedEditor
              index={index + 1}
              name={index}
              getEditorText={myCallback}
              value={option}
            />
            <textarea
              index={index + 1}
              name={index}
              onChange={(e) => myCallback(e.target.value, index)}
            >
              {option}
            </textarea>
          </TextBox>
        </>
      ))}
      <Buttons>
        <MoreButton
          onClick={(e) => {
            let arr = variants;
            arr.pop();
            setVariants([...arr]);
          }}
        >
          -
        </MoreButton>
        <MoreButton onClick={(e) => setVariants([...variants, ""])}>
          +
        </MoreButton>
      </Buttons>
      <Box>
        <Textarea
          type="text"
          cols={60}
          rows={1}
          spellCheck={true}
          value={answersNumber}
          name="answersNumber"
          placeholder="Запишите номера верных частей конструктора. Используйте только цифры и запишите
                их через запятые, без пробелов: 1,2,3,4"
          onChange={(e) => {
            let val = e.target.value;
            setAnswersNumber(val);
          }}
        />
      </Box>
      <TextBox>
        <DynamicLoadedEditor
          name="hint"
          getEditorText={myCallback2}
          value={hint}
        />
      </TextBox>
      <Mutation
        mutation={UPDATE_CONSTRUCTION_MUTATION}
        variables={{
          id: props.id,
          answer: answer,
          variants: variants,
          name: name,
          hint: hint,
          type: type,
          complexity,
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID },
          },
        ]}
        awaitRefetchQueries={true}
      >
        {(updateConstruction, { loading, error }) => (
          <Button
            onClick={async (e) => {
              e.preventDefault();
              const res0 = await generate();
              const res = await updateConstruction();
              alert("Сохранили!");
            }}
          >
            {loading ? t("saving") : t("save")}
          </Button>
        )}
      </Mutation>
    </Center>
  );
};

export default UpdateConstruction;
