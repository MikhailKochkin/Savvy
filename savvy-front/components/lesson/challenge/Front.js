import React from "react";
import styled from "styled-components";
// import Button from "@material-ui/core/Button";
import Result from "./Result";
// import { makeStyles } from "@material-ui/core/styles";
import parse from "html-react-parser";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 550px;
  @media (max-width: 800px) {
    width: 90%;
  }
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

const Header = styled.h1`
  font-size: 3rem;
`;

const LessonPart = styled.div`
  display: flex;
  /* border: 1px solid #edefed; */
  padding: 0.5% 0;
  flex-direction: column;
  border-radius: 2px;
  margin: 0 0 20px 0;
  .intro {
    border-bottom: 1px solid #f4f2f2;
    margin-bottom: 2%;
  }
  a {
    padding-top: 2%;
    padding-left: 2%;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 25em;
    margin-top: 2%;
    box-shadow: "0 0 0 2px blue;";
  }
  @media (max-width: 800px) {
    width: 100%;
  }
  .example-enter {
    opacity: 0.01;
  }

  .example-enter.example-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .example-leave {
    opacity: 1;
  }

  .example-leave.example-leave-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`;

// const useStyles = makeStyles({
//   button: {
//     width: "35%",
//     margin: "2% 0",
//     fontSize: "1.4rem",
//     textTransform: "none",
//   },
//   root: {
//     marginBottom: "4%",
//   },
//   labelRoot: {
//     fontSize: "1.5rem",
//   },
// });

const Front = (props) => {
  // const classes = useStyles();
  let results = props.results.sort((r, n) => {
    let r1 = n.correct - r.correct;
    if (r1 != 0) {
      return r1;
    }
    return r.time - n.time;
  });
  return (
    <Styles>
      <Container>
        <Header>
          <div>Испытание</div>
        </Header>
        <LessonPart>
          <div className="intro">{parse(props.text)}</div>
          {!props.completed.length > 0 ||
          props.me.permissions.includes("ADMIN") ? (
            <BlueButton
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => {
                if (props.passStep) props.passStep(0);
                props.getStart(true);
              }}
            >
              Начать
            </BlueButton>
          ) : (
            <Result
              results={results}
              completed={props.completed}
              text="Вы уже прошли это испытание. Ваш результат:"
            />
          )}
          {/* {props.me.permissions.includes("ADMIN") && (
          <Result
            results={results}
            // completed={[]}
            text="Вы уже прошли это испытание. Ваш результат:"
          />
        )} */}
        </LessonPart>
      </Container>
    </Styles>
  );
};

export default Front;
