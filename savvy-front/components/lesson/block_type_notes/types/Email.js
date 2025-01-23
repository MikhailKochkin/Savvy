import { useMemo } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import parse from "html-react-parser";

const Body = styled.div`
  img {
    display: block;
    max-width: 600px;
    box-shadow: "0 0 0 2px blue;";
    object-fit: contain;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
`;

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
  width: 100%;
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
      background: #614385; /* fallback for old browsers */
      background: -webkit-linear-gradient(
        to left,
        #516395,
        #614385
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(
        to left,
        #516395,
        #614385
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
  }
  .names_column {
    width: 40%;
    .sender_name {
      font-size: 2rem;
      height: 42px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  .emailSubject {
    width: 400px;
    line-height: 1.4;
    margin: 10px 0;
    @media (max-width: 800px) {
      width: 100%;
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

const Email = (props) => {
  function getFormattedToday() {
    return dayjs().format("D MMMM YYYY [at] HH:mm");
  }

  const todaysDate = useMemo(() => getFormattedToday(), []);

  const { me, author, text, id, instructorName } = props;

  const getInitials = (name) => {
    if (!name) return null;
    const words = name.trim().split(/\s+/); // Trim and split by whitespace
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  };

  const initials =
    instructorName && getInitials(instructorName)
      ? getInitials(instructorName)
      : `${author.name[0]}${author.surname[0]}`;

  return (
    <EmailContainer id={"note_email-" + id}>
      <EmailForm>
        <EmailInfo>
          <div className="image_column">
            <div className="circle">{initials}</div>
          </div>
          <div className="names_column">
            <div className="sender_name">
              {instructorName
                ? instructorName
                : `${author.name} ${author.surname}`}
            </div>
            <div className="emailSubject">
              <b>Subject:</b> {props.name ? props.name : "Re: Help ASAP"}
            </div>
            <div>
              <b>To:</b> {me.name} {me.surname}
            </div>
          </div>
          <div className="times_column">{todaysDate}</div>
        </EmailInfo>
        <Body>{parse(text)}</Body>
      </EmailForm>
    </EmailContainer>
  );
};

export default Email;
