import styled from "styled-components";
import { useTranslation } from "next-i18next";
import moment from "moment";
import parse from "html-react-parser";
const Body = styled.div``;

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const EmailForm = styled.div`
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px;
`;

const EmailInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  border-bottom: 1px solid #a2a2a2;
  padding-bottom: 20px;
  margin-bottom: 20px;
  .image_column {
    width: 10%;
    .circle {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      color: #fff;
      border-radius: 50%;
      background: #485563; /* fallback for old browsers */
      background: -webkit-linear-gradient(
        to right,
        #29323c,
        #485563
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(
        to right,
        #29323c,
        #485563
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
  }
  .names_column {
    width: 40%;
    .sender_name {
      font-size: 2rem;
    }
  }
  .times_column {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    color: #a2a2a2;
  }
  @media (max-width: 800px) {
    .image_column {
      width: 15%;
    }
    .names_column {
      width: 55%;
      .sender_name {
        font-size: 1.8rem;
      }
    }
    .times_column {
      width: 30%;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
      color: #a2a2a2;
    }
  }
`;

const Note = (props) => {
  const { t } = useTranslation("lesson");
  moment.locale("ru");
  function getFormattedToday() {
    return moment().format("D MMMM YYYY [at] HH:mm");
  }

  const todaysDate = getFormattedToday();

  const { me, author, text, id } = props;
  let width;
  if (props.problem) {
    width = "100%";
  } else if (props.story) {
    width = "100%";
  } else {
    width = "90%";
  }

  return (
    <>
      <EmailContainer id={id}>
        <EmailForm>
          <EmailInfo>
            <div className="image_column">
              <div className="circle">
                {author.name[0]}
                {author.surname[0]}
              </div>
            </div>
            <div className="names_column">
              <div className="sender_name">
                {author.name} {author.surname}
              </div>
              <div>Re: Help ASAP</div>
              <div>
                To: {me.name} {me.surname}
              </div>
            </div>
            <div className="times_column">{todaysDate}</div>
          </EmailInfo>
          <Body>{parse(text)}</Body>
        </EmailForm>
      </EmailContainer>
    </>
  );
};

export default Note;
