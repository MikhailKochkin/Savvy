import { useState, useEffect } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import dynamic from "next/dynamic";
import UpdateNewConstructor from "./UpdateNewConstructor";
import Box from "./Box";

const Styles = styled.div`
  width: ${(props) => (props.story ? "85vw" : "100%")};
  max-width: 1350px;
  display: flex;
  margin-bottom: 4%;
  font-size: 1.4rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    font-size: 1.4rem;
    width: 100%;
    padding-right: 0%;
    margin-bottom: 30px;
    display: block;
    height: auto;
  }
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  width: 200px;
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

const Block = styled.div`
  width: 800px;
  height: auto;
  display: grid;
  background: #fff;
  column-gap: 10px;
  row-gap: 10px;
  box-shadow: 0px 0px 3px 0px rgb(199 199 199);
  padding: 3% 5%;
  grid-template-columns: ${(props) => {
    return `repeat(${props.columns}, 1fr)`;
  }};
  grid-template-rows: auto;
  margin: 30px 0;
`;

const Element = styled.div`
  font-size: 1.4rem;
  min-height: 100px;
  width: 100%;
  height: 100%;
  border: ${(props) =>
    !props.isTest ? "1px solid #fff" : "1px dashed #c4c4c4"};
  padding: 3% 5%;
  grid-column: ${(props) => {
    return `1/${props.size}`;
  }};
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

const Variants = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  margin-top: 55px;
  overflow: auto;
  max-height: 200vh;
  padding: 1%;
  @media (max-width: 800px) {
    max-height: 100%;
    padding: 3%;
  }
`;

const NewConstructor = (props) => {
  const { construction, me } = props;
  let elements = construction.elements.elements;
  const [check, setCheck] = useState(false);
  const [update, setUpdate] = useState(false);
  const [variants, setVariants] = useState([]);
  const [answersCheck, setAnswersCheck] = useState(
    elements.map((t) => (t.isTest ? false : true))
  );
  const [currentConfig, setCurrentConfig] = useState([]);
  const [shiverList, setShiverList] = useState([]);
  const [used, setUsed] = useState(
    Array(elements.filter((t) => t.isTest == true).length).fill("")
  );
  console.log("used", used);

  const shuffle = (array) => {
    let m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  useEffect(() => {
    const vars = shuffle([...elements.filter((t) => t.isTest)]);
    setVariants(vars);
  }, []);

  const getAnswer = (val, i, answer) => {
    console.log("val", val, i, answer);
    let new_arr = [...used];
    new_arr[i - 1] = answer;
    // if (used.includes(answer)) {
    //   new_arr = new_arr.filter((el) => el == answer);
    // } else {
    //   console.log(1, new_arr);
    //   new_arr = [...new_arr, answer];
    // }
    setUsed(new_arr);
    console.log("new_arr", new_arr);
    let arr = [...answersCheck];
    arr[i] = val;
    setAnswersCheck(arr);
  };

  const getResult = (data) => {
    props.getResult(data);
  };

  const passUpdated = () => {
    props.passUpdated(true);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  const onCheck = (i) => {
    setCurrentConfig([...answersCheck]);
    setShiverList(
      [...answersCheck].map((el) => {
        if (el == false) {
          return (el = true);
        } else {
          return (el = false);
        }
      })
    );
    setCheck(true);
    if (!answersCheck.includes(false)) {
      // alert("correct");
    } else {
      // alert("incorrect");
    }
    setTimeout(() => {
      setShiverList(Array(answersCheck.length).fill(false));
    }, 1000);
  };

  return (
    <>
      {<button onClick={(e) => setUpdate(!update)}>Изменить</button>}
      <Styles>
        {!update && (
          <>
            <Block columns={construction.columnsNum}>
              {elements.map((t, i) => (
                <ConElement
                  text={t.text}
                  size={t.size}
                  isTest={t.isTest}
                  className={"header" + i}
                  id={i + 1}
                  i={i}
                  place={t.place}
                  variants={variants}
                  elems={elements}
                  isShown={check}
                  getAnswer={getAnswer}
                  check={check}
                  status={currentConfig[i]}
                  shiver={shiverList[i]}
                />
              ))}
              <ButtonTwo onClick={(e) => onCheck()}>Check</ButtonTwo>
            </Block>
            <Variants>
              {variants.map((option, index) => {
                return (
                  <Box
                    used={used.includes(index + 1)}
                    index={index}
                    option={option.text}
                    // id={construction.id}
                  />
                );
              })}
            </Variants>
          </>
        )}
        {update && (
          <UpdateNewConstructor
            key={construction.id}
            id={construction.id}
            lessonId={props.lessonID}
            construction={construction}
            complexity={construction.complexity}
            me={me}
            getResult={getResult}
            switchUpdate={switchUpdate}
            passUpdated={passUpdated}
          />
        )}
      </Styles>
    </>
  );
};

const Number_Input = styled.input`
  padding: 2%;
  width: 70px;
  border: 1px dashed;
  border-color: #c4c4c4;
  white-space: nowrap;
  font-family: Montserrat;
  font-size: 1.5rem;
  line-height: 1.8;
  margin-bottom: 10px;
`;

const ConElement = (props) => {
  const [size, setSize] = useState(props.size);
  const [value, setValue] = useState();
  const [correct, setCorrect] = useState(null);

  const {
    elems,
    isTest,
    text,
    i,
    check,
    isShown,
    variants,
    place,
    status,
    shiver,
  } = props;
  const onCheck = (e) => {
    setValue(parseInt(e.target.value));
    if (
      variants[e.target.value - 1] &&
      place == variants[e.target.value - 1].place
    ) {
      setCorrect(true);
      props.getAnswer(true, i, parseInt(e.target.value));
    } else {
      setCorrect(false);
      props.getAnswer(false, i, parseInt(e.target.value));
    }
  };

  // useEffect(() => {
  //   if (status == false) {
  //     setShiver(true);
  //     setTimeout(() => {
  //       setShiver(false);
  //     }, 1000);
  //   }
  // }, []);

  return (
    <Element
      shiver={shiver}
      isTest={isTest}
      correct={correct}
      check={check}
      size={size}
    >
      {isTest && (
        <Number_Input
          type="number"
          value={value}
          onChange={(e) => onCheck(e)}
        />
      )}
      {isTest && (
        <div>
          {variants[value - 1]
            ? renderHTML(variants[value - 1].text)
            : renderHTML("<p></p>")}
        </div>
      )}
      {!isTest && <div>{renderHTML(text)}</div>}
      {status == true && correct == true && isShown && "✅"}
      {/* {status == false && correct == false && isShown && "⛔️"} */}
    </Element>
  );
};

export default NewConstructor;
