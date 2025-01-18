import styled from "styled-components";
import dayjs from "dayjs";
import parse from "html-react-parser";

const AllStyles = styled.div`
  margin-bottom: 3%;
  width: 70%;
  .header {
    font-size: 1.6rem;
    font-weight: bold;
  }
  .time {
    font-size: 1.3rem;
    color: grey;
  }
`;

const Styles = styled.div`
  border-bottom: 1px solid #edefed;
`;

const Feedback = (props) => {
  const { feedback, lesson } = props;
  return (
    <AllStyles>
      <div className="header">Give feedback to the student:</div>
      {feedback.length === 0 ? <div>No feedback sent yet</div> : null}
      {feedback.length > 0
        ? feedback.map((m) => (
            <Styles>
              {parse(m.text)}
              <div className="time">
                {`${m.teacher.name} ${m.teacher.surname} `}
                {dayjs(m.createdAt).format("LLL")}
              </div>
            </Styles>
          ))
        : null}
    </AllStyles>
  );
};

export default Feedback;
