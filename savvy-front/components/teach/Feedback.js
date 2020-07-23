import React, { Component } from "react";
import renderHTML from "react-render-html";
import styled from "styled-components";
import moment from "moment";

const AllStyles = styled.div`
  margin-bottom: 3%;
  .header {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

const Styles = styled.div`
  border-bottom: 1px solid #edefed;
`;

class Feedback extends Component {
  render() {
    moment.locale("ru");
    const { feedback, lesson } = this.props;
    const final_feedback = feedback.filter((f) => f.lesson.id === lesson);
    return (
      <AllStyles>
        <div className="header">
          Отправленная обратная связь по этому уроку:
        </div>
        {final_feedback.length === 0 ? <div>Нет обратной связи</div> : null}
        {final_feedback.length > 0
          ? final_feedback.map((m) => (
              <Styles>
                {renderHTML(m.text)}
                {moment(m.createdAt).format("LLL")}
              </Styles>
            ))
          : null}
      </AllStyles>
    );
  }
}

export default Feedback;
