import { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useQuery, useMutation, gql } from "@apollo/client";
import parse from 'html-react-parser';


import CreateLawrdle from "./CreateLawrdle";
import Lawrdles from "./Lawrdles";
import Modal from "styled-react-modal";
import Loading from "../Loading";

const LAWRDLE_QUERY = gql`
  query LAWRDLE_QUERY($id: String!) {
    lawrdles(where: { id: { equals: $id } }) {
      id
      word
      story
      buttonText
      link
      leadin
      emailCampaignId
      lessonId
      coursePage {
        id
        title
        lessons {
          id
          type
        }
        user {
          id
          name
          surname
        }
      }
      author {
        id
        name
        surname
        image
      }
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center;
  align-items: center; */
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
const Container = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  margin-right: -150px;
  @media (max-width: 800px) {
    flex-direction: column;
    margin-right: 0px;
  }
`;

const Game = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 30px;
  width: 70%;
  p {
    font-size: 1.6rem;
    line-height: 1.4;
    margin: 5px 0;
  }
  #game_page_copy {
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Explainer = styled.div`
  width: 30%;
  height: 100%;
  border-right: 1px solid #d3d6da;
  @media (max-width: 800px) {
    width: 100%;
  }
  .inside {
    padding: 20px 30px;
    p {
      font-size: 1.6rem;
      line-height: 1.4;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-top: 10px;
    }
    .img_row {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;
      .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div {
          text-align: center;
        }
      }
    }
    .close {
      margin-top: 0px;
    }

    .author_words {
      background: #e8e8e8;
      padding: 10px;
      border-radius: 15px;
      display: inline-block;
      cursor: pointer;
      p {
        margin: 5px 10px;
        a {
          border-bottom: 2px solid #26ba8d;
          padding: 0%;
          transition: 0.3s;
          cursor: pointer;
        }
      }
    }
  }
`;

const Header = styled.div`
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
`;

const Keyboard = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin-top: 20px;
`;

const KeyboardRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
  /* align-items: flex-start;
  justify-content: flex-start; */
  flex-basis: auto;
  button {
    font-family: inherit;
    font-weight: bold;
    border: 0;
    padding: 0;
    margin: 0 6px 0 0;
    outline: 0;
    border-radius: 4px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #d3d6da;
    color: #000000;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  }
  .letter {
    height: 48px;
    width: 48px;
  }
  .but {
    height: 48px;
    width: 88px;
  }
  @media (max-width: 800px) {
    .letter {
      height: 44px;
      width: 22px;
    }
    .but {
      height: 44px;
      width: 46px;
    }
  }
`;

const ButtonTwo = styled.button`
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
  transition: 0.3s;
  max-width: 280px;
  a {
    color: #fff;
  }
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const ButtonOne = styled.button`
  background: none;
  padding: 10px 20px;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  margin: 20px 0;
  margin-right: 10px;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const Cell = styled.div`
  border: 2px solid #d3d6da;
  width: 62px;
  height: 62px;
  margin-right: 6px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: 700;
  border-color: ${(props) => (props.active ? "#878A8C" : "#d3d6da")};
  @media (max-width: 800px) {
    width: 44px;
    height: 44px;
  }
`;

const Info = styled.div`
  width: 95%;
  padding: 20px 0px;
  p {
    font-size: 1.6rem;
    /* line-height: 1.4; */
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 10px;
  }
  .img_row {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      div {
        text-align: center;
      }
    }
  }
  .close {
    margin-top: 0px;
  }

  .author_words {
    background: #f3f3f3;
    padding: 10px;
    border-radius: 15px;
    display: inline-block;
    cursor: pointer;
    p {
      margin: 5px 10px;
      a {
        border-bottom: 2px solid #26ba8d;
        padding: 0%;
        transition: 0.3s;
        cursor: pointer;
      }
    }
  }
`;

const MiniCell = styled.div`
  border: 2px solid #d3d6da;
  width: 42px;
  height: 42px;
  margin-right: 6px;
  background: ${(props) => {
    if (props.color == "green") {
      return "#6AAA63";
    } else if (props.color == "yellow") {
      return "#CAB458";
    } else if (props.color == "grey") {
      return "#787C7E";
    } else {
      return "#fff";
    }
  }};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 2.6rem;
  color: ${(props) => {
    if (props.color == "green") {
      return "#fff";
    } else if (props.color == "yellow") {
      return "#fff";
    } else if (props.color == "grey") {
      return "#fff";
    } else {
      return "#000000";
    }
  }};
  font-weight: 700;
  border-color: ${(props) => {
    if (props.color == "green") {
      return "#6AAA63";
    } else if (props.color == "yellow") {
      return "#CAB458";
    } else if (props.color == "grey") {
      return "#787C7E";
    } else {
      return "#d3d6da";
    }
  }};
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 400px;
  padding: 2%;
  .top_message {
    padding-bottom: 2%;
    border-bottom: 1px solid grey;
    font-size: 2rem;
    width: 100%;
    text-align: center;
  }
  .bottom_message {
    margin-top: 2%;
  }
  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    padding: 40px 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

const dictionary = {
  KeyQ: "й",
  KeyW: "ц",
  KeyE: "у",
  KeyR: "к",
  KeyT: "е",
  KeyY: "н",
  KeyU: "г",
  KeyI: "ш",
  KeyP: "з",
  BracketLeft: "х",
  BracketRight: "ъ",
  KeyA: "ф",
  KeyS: "ы",
  KeyD: "в",
  KeyF: "а",
  KeyG: "п",
  KeyH: "р",
  KeyJ: "о",
  KeyK: "л",
  KeyL: "д",
  Semicolon: "ж",
  Quote: "э",
  Backslash: "ё",
  KeyZ: "я",
  KeyX: "ч",
  KeyC: "с",
  KeyV: "м",
  KeyB: "и",
  KeyN: "т",
  KeyM: "ь",
  Comma: "б",
  Period: "ю",
  Backspace: "backspace",
  Enter: "enter",
};

const Lawrdle = (props) => {
  const { loading, error, data } = useQuery(LAWRDLE_QUERY, {
    variables: { id: props.id },
  });
  useEffect(() => {
    if (data) {
      console.log("props.getLeadIn", props.getLeadIn);

      if (props.getLessonInfo)
        props.getLessonInfo(
          data.lawrdles[0].lessonId,
          data.lawrdles[0].coursePage
            ? data.lawrdles[0].coursePage.lessons
            : [],
          data.lawrdles[0].coursePage ? data.lawrdles[0].coursePage.id : null
        );
      if (props.getTags) props.getTags(data.lawrdles[0].tags);
      if (props.getLeadIn) props.getLeadIn(data.lawrdles[0].leadin);
      if (props.getCampaignId)
        props.getCampaignId(data.lawrdles[0].emailCampaignId);
    }
  }, [data && data.lawrdles]);
  if (loading) return <Loading />;

  const lawrdle = data.lawrdles[0];
  console.log("lawrdle", lawrdle);
  return <Wordle lawrdle={lawrdle} />;
};

const Wordle = (props) => {
  const lawrdle = props.lawrdle;
  let the_word = props.lawrdle.word;
  const [word, setWord] = useState(the_word.split(""));
  const [level, setLevel] = useState("start");
  const [activeRowNum, setActiveRowNum] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeColumnNum, setActiveColumnNum] = useState(0);
  const [result, setResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e) => setIsOpen(!isOpen);

  const [table, setTable] = useState([
    Array(word.length).fill(""),
    Array(word.length).fill(""),
    Array(word.length).fill(""),
    Array(word.length).fill(""),
    Array(word.length).fill(""),
    Array(word.length).fill(""),
  ]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!dictionary[e.code]) {
        return;
      } else {
        if (dictionary[e.code] == "backspace") {
          return removeLetter();
        } else if (dictionary[e.code] == "enter") {
          return onCheck();
        } else {
          return addLetter(dictionary[e.code]);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const addLetter = (letter) => {
    let newTable = [...table];
    newTable[activeRowNum][activeColumnNum] = letter;
    setTable(newTable);
    if (activeColumnNum >= the_word.split("").length) {
      return;
    } else {
      setActiveColumnNum(activeColumnNum + 1);
    }
  };

  // const slide = () => {
  //   var my_element = document.getElementById("author_speaks");
  //   my_element.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //     inline: "nearest",
  //   });
  // };

  const onCheck = async (e) => {
    if (
      table[activeRowNum]
        .slice(0, the_word.split("").length)
        .filter((el) => el !== "").length < the_word.split("").length
    ) {
      alert("Недостаточно букв");
      return;
    }
    // 1. Check if the word exists

    let word = table[activeRowNum].slice(0, the_word.split("").length).join("");
    const r = await fetch(
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20220720T101956Z.35d11bef538fc25d.3e9a0a98efdfcd25351a602adef4ef8b11a3e6ee&lang=ru-ru&text=${word}`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());
    // 2. if ot does not, alert the user
    if (
      r.def.length == 0 &&
      JSON.stringify(the_word) !==
        JSON.stringify(
          table[activeRowNum].slice(0, the_word.split("").length).join("")
        )
    ) {
      alert("Такого слова не существует!");
      return;
    }

    // 2.5 create the dictionary with indexes of correct letters
    let arr = [];
    let correct_word_dict = {};

    the_word.split("").map((char, i) => {
      if (!correct_word_dict[char]) {
        correct_word_dict[char] = [i];
      } else {
        correct_word_dict[char] = [...correct_word_dict[char], i];
      }
    });

    // table[activeRowNum].slice(0, the_word.split("").length).map((letter, i) => {
    //   console.log("letter dict", letter, i, correct_word_dict[letter]);
    // });

    // 3. Show if the user if they have found correct letters
    table[activeRowNum].slice(0, the_word.split("").length).map((letter, i) => {
      if (correct_word_dict[letter] && correct_word_dict[letter].includes(i)) {
        let green_but = document.getElementById(letter);
        green_but.style.background = "#6aaa64";
        green_but.style.color = "#fff";
        let cell = document.getElementById(`${activeRowNum}${i}`);
        cell.style.background = "#6AAA63";
        cell.style.borderColor = "#6AAA63";
        cell.style.color = "#fff";
        arr.push("🟩");
      } else if (
        correct_word_dict[letter] &&
        !correct_word_dict[letter].includes(i)
      ) {
        let yellow_but = document.getElementById(letter);
        yellow_but.style.background = "#c9b458";
        yellow_but.style.color = "#fff";
        let cell = document.getElementById(`${activeRowNum}${i}`);
        cell.style.background = "#CAB458";
        cell.style.borderColor = "#CAB458";
        cell.style.color = "#fff";
        arr.push("🟨");
      } else {
        let cell = document.getElementById(`${activeRowNum}${i}`);
        let grey_but = document.getElementById(letter);
        grey_but.style.background = "#787C7E";
        grey_but.style.color = "#fff";
        cell.style.background = "#787C7E";
        cell.style.color = "#fff";
        arr.push("⬜️");
      }
    });
    setResult([...result, arr.join("")]);

    // 4. If the word is corrrect, tell the user about that!
    if (
      JSON.stringify(the_word) ==
      JSON.stringify(
        table[activeRowNum].slice(0, the_word.split("").length).join("")
      )
    ) {
      setLevel("finish");
      slide();
      toggleModal();
    } else {
      if (activeRowNum == 5) {
        setLevel("finish");
        toggleModal();
        slide();
        return;
      }
      setActiveRowNum(activeRowNum + 1);
      setActiveColumnNum(0);
    }
  };

  const removeLetter = () => {
    let newTable = [...table];
    newTable[activeRowNum][activeColumnNum - 1] = "";
    setTable(newTable);
    if (activeColumnNum > 0) {
      setActiveColumnNum(activeColumnNum - 1);
    } else {
      setActiveColumnNum(0);
    }
  };

  const share = () => {
    return navigator.clipboard.writeText(
      [
        `⚖️ #Lawrdle Попытки: ${activeRowNum + 1}/6 \r\n`,
        ...result,
        `\r\n besavvy.app/games?id=${props.id}`,
      ].join(`\r\n`)
    );
  };

  const slide = () => {
    var my_element = document.getElementById("move_to_lesson");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <div>
      <Styles>
        <Container>
          <Game>
            {level == "finish" && (
              <>
                <p>Поделитесь результатом сегодняшней игры!</p>
                <ButtonOne
                  id="copy_lawrdle_result"
                  onClick={(e) => {
                    setCopied(true);
                    return share();
                  }}
                >
                  {copied ? "Готово!" : "Копировать результат"}
                </ButtonOne>
              </>
            )}
            {_.times(6, (row) => {
              return (
                <Row word={word} active={row == 0}>
                  {_.times(word.length, (column) => {
                    return (
                      <Cell
                        id={`${row}${column}`}
                        active={table[row][column] !== ""}
                      >
                        {table[row][column].toUpperCase()}
                      </Cell>
                    );
                  })}
                </Row>
              );
            })}
            <Keyboard>
              <KeyboardRow>
                <button
                  id="й"
                  onClick={(e) => addLetter("й")}
                  className="letter"
                >
                  Й
                </button>
                <button
                  id="ц"
                  onClick={(e) => addLetter("ц")}
                  className="letter"
                >
                  Ц
                </button>
                <button
                  id="у"
                  onClick={(e) => addLetter("у")}
                  className="letter"
                >
                  У
                </button>
                <button
                  id="к"
                  onClick={(e) => addLetter("к")}
                  className="letter"
                >
                  К
                </button>
                <button
                  id="е"
                  onClick={(e) => addLetter("е")}
                  className="letter"
                >
                  Е
                </button>
                <button
                  id="н"
                  onClick={(e) => addLetter("н")}
                  className="letter"
                >
                  Н
                </button>
                <button
                  id="г"
                  onClick={(e) => addLetter("г")}
                  className="letter"
                >
                  Г
                </button>
                <button
                  id="ш"
                  onClick={(e) => addLetter("ш")}
                  className="letter"
                >
                  Ш
                </button>
                <button
                  id="щ"
                  onClick={(e) => addLetter("щ")}
                  className="letter"
                >
                  Щ
                </button>
                <button
                  id="з"
                  onClick={(e) => addLetter("з")}
                  className="letter"
                >
                  З
                </button>
                <button
                  id="х"
                  onClick={(e) => addLetter("х")}
                  className="letter"
                >
                  Х
                </button>
                <button
                  id="ъ"
                  onClick={(e) => addletter("ъ")}
                  className="letter"
                >
                  Ъ
                </button>
              </KeyboardRow>
              <KeyboardRow>
                <button
                  id="ф"
                  onClick={(e) => addLetter("ф")}
                  className="letter"
                >
                  Ф
                </button>
                <button
                  id="ы"
                  onClick={(e) => addLetter("ы")}
                  className="letter"
                >
                  Ы
                </button>
                <button
                  id="в"
                  onClick={(e) => addLetter("в")}
                  className="letter"
                >
                  В
                </button>
                <button
                  id="а"
                  onClick={(e) => addLetter("а")}
                  className="letter"
                >
                  А
                </button>
                <button
                  id="п"
                  onClick={(e) => addLetter("п")}
                  className="letter"
                >
                  П
                </button>
                <button
                  id="р"
                  onClick={(e) => addLetter("р")}
                  className="letter"
                >
                  Р
                </button>
                <button
                  id="о"
                  onClick={(e) => addLetter("о")}
                  className="letter"
                >
                  О
                </button>
                <button
                  id="л"
                  onClick={(e) => addLetter("л")}
                  className="letter"
                >
                  Л
                </button>
                <button
                  id="д"
                  onClick={(e) => addLetter("д")}
                  className="letter"
                >
                  Д
                </button>
                <button
                  id="ж"
                  onClick={(e) => addLetter("ж")}
                  className="letter"
                >
                  Ж
                </button>
                <button
                  id="э"
                  onClick={(e) => addLetter("э")}
                  className="letter"
                >
                  Э
                </button>
                <button
                  id="ё"
                  onClick={(e) => addLetter("ё")}
                  className="letter"
                >
                  Ё
                </button>
              </KeyboardRow>
              <KeyboardRow>
                <button onClick={(e) => onCheck()} className="but">
                  Enter
                </button>
                <button
                  id="я"
                  onClick={(e) => addLetter("я")}
                  className="letter"
                >
                  Я
                </button>
                <button
                  id="ч"
                  onClick={(e) => addLetter("ч")}
                  className="letter"
                >
                  Ч
                </button>
                <button
                  id="с"
                  onClick={(e) => addLetter("с")}
                  className="letter"
                >
                  С
                </button>
                <button
                  id="м"
                  onClick={(e) => addLetter("м")}
                  className="letter"
                >
                  М
                </button>
                <button
                  id="и"
                  onClick={(e) => addLetter("и")}
                  className="letter"
                >
                  И
                </button>
                <button
                  id="т"
                  onClick={(e) => addLetter("т")}
                  className="letter"
                >
                  Т
                </button>
                <button
                  id="ь"
                  onClick={(e) => addLetter("ь")}
                  className="letter"
                >
                  Ь
                </button>
                <button
                  id="б"
                  onClick={(e) => addLetter("б")}
                  className="letter"
                >
                  Б
                </button>
                <button
                  id="ю"
                  onClick={(e) => addLetter("ю")}
                  className="letter"
                >
                  Ю
                </button>
                <button onClick={(e) => removeLetter()} className="but">
                  Back
                </button>
              </KeyboardRow>
            </Keyboard>
          </Game>
        </Container>
      </Styles>
      {/* {props.me && props.me.permissions.includes("ADMIN") && (
        <>
          <CreateLawrdle />
          <Lawrdles />
        </>
      )} */}
      {/* <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      > */}
      {isOpen && (
        <Info>
          <p>
            🔥 Наше сегодняшнее слово:
            <b> {the_word}</b>. И вот, что наш автор {lawrdle.author.name}{" "}
            {lawrdle.author.surname} рассказывает по этому поводу:
          </p>
          <div className="author_words">{parse(lawrdle.story)}</div>
          <br />
          {/* <div className="img_row">
            <div className="box">
              <img src={lawrdle.author.image} />
              <div>{lawrdle.author.name}</div>
            </div>
          </div> */}
          {/* <div>
            <ButtonTwo>
              <a id="lawrdle_to_course" href={lawrdle.link} target="_blank">
                {lawrdle.buttonText}
              </a>
            </ButtonTwo>
          </div> */}
        </Info>
      )}
      {/* </StyledModal> */}
    </div>
  );
};

export default Lawrdle;
