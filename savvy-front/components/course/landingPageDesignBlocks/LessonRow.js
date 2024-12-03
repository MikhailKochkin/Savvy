import styled from "styled-components";
import Link from "next/link";

const Box = styled.div`
  border-bottom: 2px solid #e8eff6;
  display: flex;
  flex-direction: row;
  flex: 1; /* This makes the Box component stretch in height */
  background: #e8eff6;
  transition: 0.3s;
  .cell {
    padding: 5px 10px;
    font-size: 1.4rem;
    background: #fff;
    transition: 0.3s;
  }
  &:hover {
    transition: 0.3s;

    .cell {
      background: #fafafa;
    }
  }
  .div1 {
    width: 6%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1.4;
    margin-right: 2px;
  }
  .div2 {
    width: 34%;
    margin-right: 2px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 1.4;
  }
  .div3 {
    width: 60%;
    p {
      margin: 0;
      margin-bottom: 5px;
      line-height: 1.5;
    }
    margin-right: 2px;
  }

  @media (max-width: 850px) {
    display: flex;
    .div1 {
      min-width: 50px;
    }
    .div2 {
      min-width: 250px;
    }
    .div3 {
      min-width: 400px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  a {
    background: none;
  }
  @media (max-width: 800px) {
    justify-content: flex-start;
  }
`;

const A = styled.a`
  width: 100%;
`;

const Button = styled.button`
  font-size: 1.4rem;
  background: #deecdc;
  border: 1px solid #deecdc;
  color: #23372a;
  padding: 2px 9px;
  font-weight: 500;
  box-sizing: border-box;
  border-radius: 15px;
  cursor: pointer;
  font-family: Montserrat;
  outline: 0;
  transition: all 0.6s;
  /* &:hover {
    border: 1px solid #666666;
    background: #666666;
    color: #fff;
  } */
  /* @media (max-width: 800px) {
    font-size: 1.4rem;
  } */
`;

const LessonRow = ({ lesson }) => {
  return (
    <Box>
      <div
        className="cell div1"
        onDoubleClick={(e) => handleDoubleClick("number")}
      >
        {lesson.number}
      </div>
      <div
        className="cell div2"
        onDoubleClick={(e) => handleDoubleClick("name")}
      >
        {lesson.name}
      </div>
      <div
        className="cell div3"
        onDoubleClick={(e) => handleDoubleClick("description")}
      >
        {/* {lesson.description ? parse(lesson.description) : null} */}
      </div>
    </Box>
  );
};

export default LessonRow;
