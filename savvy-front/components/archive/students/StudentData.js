import { useState } from "react";
import styled from "styled-components";
// import Button from "@material-ui/core/Button";
// import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import CourseData from "./CourseData";

const Name = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 4%;
  .email {
    font-size: 1.3rem;
    color: grey;
  }
`;

const Square = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
  div {
    text-align: center;
    width: 70px;
    height: 30px;
    background: ${(props) => props.inputColor || "palevioletred"};
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const Open = styled.div`
  display: ${(props) => (props.secret ? "none" : "block")};
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  grid-template-rows: 40px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  .div1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .div3 {
    grid-area: 1 / 3 / 2 / 4;
  }
  .div4 {
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Styles = styled.div`
  margin-bottom: 0;
  padding: 0.5% 2%;
  img {
    max-width: 200px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2% 0;
  margin-bottom: 3%;
`;

const RegDate = styled.div`
  background: ${(props) => (props.date ? "#ade8f4" : null)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const Data = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  border-bottom: 1px solid grey;
`;

const SendButton = styled.div`
  font-size: 1.3rem;
  text-align: center;
  background: #ffffff;
  border: 1px solid;
  color: grey;
  border-color: #edefed;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  outline: 0;
  margin-right: 20px;
  width: 130px;
  transition: all 0.4s;
  a {
    color: #edefed;
  }
  &:hover {
    color: #112a62;
    border-color: #112a62;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const StyledCV = styled.div`
  margin-bottom: 2%;
  a {
    color: #112b62;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

// const StyledButton = withStyles({
//   root: {
//     margin: "1% 0",
//     marginRight: "2%",
//     fontSize: "1.6rem",
//     textTransform: "none",
//   },
// })(Button);

const Person = (props) => {
  const [secret, setSecret] = useState(true);
  const [page, setPage] = useState("results");
  const [show, setShow] = useState(false);

  const { student, coursePages, courseVisit, lessonResults } = props;
  moment.locale("ru");
  let mail = `mailto:${student.email}`;

  //check how the student is progressing throught the course
  let color;
  let total = 0;

  // find recent students
  let two_months_ago = new Date();
  two_months_ago.setMonth(two_months_ago.getMonth() - 2);
  return (
    <Styles>
      <Header>
        <Name className="div1">
          <div>
            {student.surname
              ? `${student.name} ${student.surname}`
              : student.name}
          </div>
          <div className="email">{student.email}</div>
        </Name>
        <ButtonBox>
          <button className="div3" onClick={(e) => setSecret(!secret)}>
            {/* {secret ? "Открыть" : "Закрыть"} */}
            {secret ? "Open" : "Close"}
          </button>
        </ButtonBox>
      </Header>
      <Open secret={secret}>
        {[...coursePages]
          .sort((a, b) => (a.numInCareerTrack > b.numInCareerTrack ? 1 : -1))
          .map((c, i) => (
            <CourseData course={c} index={i} lessonResults={lessonResults} />
          ))}
      </Open>
    </Styles>
  );
};

export default Person;
