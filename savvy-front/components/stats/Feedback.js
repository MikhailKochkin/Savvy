import renderHTML from "react-render-html";
import styled from "styled-components";
import moment from "moment";

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
  moment.locale("ru");
  const { feedback, lesson } = props;
  console.log(feedback);
  return (
    <AllStyles>
      <div className="header">Отправленная обратная связь:</div>
      {feedback.length === 0 ? <div>Нет обратной связи</div> : null}
      {feedback.length > 0
        ? feedback.map((m) => (
            <Styles>
              {renderHTML(m.text)}
              <div className="time">
                {`${m.teacher.name} ${m.teacher.surname}`}
                {moment(m.createdAt).format("LLL")}
              </div>
            </Styles>
          ))
        : null}
    </AllStyles>
  );
};

export default Feedback;
