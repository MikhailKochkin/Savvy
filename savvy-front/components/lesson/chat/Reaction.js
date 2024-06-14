import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";

const CREATE_CHATRESULT_MUTATION = gql`
  mutation CREATE_CHATRESULT_MUTATION(
    $text: String!
    $name: String!
    $lessonId: String!
    $chatId: String
  ) {
    createChatResult(
      text: $text
      name: $name
      lessonId: $lessonId
      chatId: $chatId
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  .stage {
    margin-top: 26px;
    margin-left: 10px;
  }
  .dot-flashing {
    position: relative;
    width: 13px;
    height: 13px;
    left: 30px;
    border-radius: 15px;
    background-color: #268bf4;
    color: #9880ff;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0.5s;
  }
  .dot-flashing::before,
  .dot-flashing::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  .dot-flashing::before {
    left: -22px;
    width: 13px;
    height: 13px;
    border-radius: 15px;
    background-color: #268bf4;
    color: #9880ff;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  .dot-flashing::after {
    left: 22px;
    width: 13px;
    height: 13px;
    border-radius: 15px;
    background-color: #268bf4;
    color: #9880ff;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: #0174f0;
    }
    50%,
    100% {
      background-color: #8cbdf1;
    }
  }
  @media (max-width: 800px) {
  }
`;

const Message = styled.div`
  display: flex;
  /* opacity: 0; */
  /* transition-property: sliding-vertically; */
  transition: 0.2s ease-out;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 20px;
  p {
    margin: 5px 0;
  }
  &.student {
    justify-content: flex-start;
    justify-content: stretch;
  }
  .author_text {
    background: #f3f3f3;
    color: black;
    border-radius: 25px;
    padding: 2% 5%;
    min-width: 40%;
    max-width: 70%;
    display: flex;
    font-size: 1.6rem;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .student_text {
    background: #248bf5;
    color: #fff;
    min-width: 20%;
    max-width: 70%;
    outline: 0;
    resize: none;
    border-radius: 25px;
    padding: 3% 4%;
    line-height: 1.8;
    font-family: Montserrat;
    font-size: 1.6rem;
    margin-bottom: 20px;
  }
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 55px;
    width: 55px;
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    object-fit: cover;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 1.2rem;
    text-align: center;
    color: #8f93a3;
    max-width: 80px;
    margin: 0 7px;
    line-height: 1.4;
  }
`;

const ReactionsList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const WaitingButton = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  width: 100%;
`;

const StyledButton = styled.div`
  display: inline-block;
  vertical-align: middle;
  border: 2px solid #c4c4c4;
  background: #fff;
  /* ${(props) => (props.color !== "#c4c4c4" ? "3px solid" : "1px solid")}; */
  /* border-color: ${(props) => props.color}; */
  padding: 10px 15px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: 0.3s;
  &:hover {
    border: 2px solid #122a62;
  }
  &:active {
    border: 2px solid #122a62;
  }
  img {
    display: block;
    margin: 2% 0;
    max-width: 100%;
    max-height: 20em;
    @media (max-width: 750px) {
      width: 100%;
      height: auto;
    }
  }
  p {
    margin: 0;
  }
`;

const Icon = styled.div`
  margin: 5px;
  border-radius: 50%;
  background: #2f80ed; /* fallback for old browsers */

  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  height: 55px;
  width: 55px;
  object-fit: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Reaction = (props) => {
  const [usedReactions, setUsedReactions] = useState([]);
  const [reaction, setReaction] = useState(undefined);
  const [leftReactions, setLeftReactions] = useState(props.reactions);
  const { me, author, m } = props;
  const { t } = useTranslation("lesson");

  const [createChatResult, { data: data2, loading: loading2, error: error2 }] =
    useMutation(CREATE_CHATRESULT_MUTATION);

  return (
    <Styles>
      <>
        {usedReactions.map((lr, i) => (
          <div className="used">
            <Message key={i} time={i} className="student">
              <IconBlock>
                <Icon className="icon2" background={m.author}>
                  {me.image && <img className="icon" src={me.image} />}
                  {!me.image &&
                    (me && me.image ? (
                      <img className="icon" src={me.image} />
                    ) : me.surname ? (
                      `${me.name[0]}${me.surname[0]}`
                    ) : (
                      `${me.name[0]}${me.name[1]}`
                    ))}
                </Icon>
                <div className="name">{me.name}</div>
              </IconBlock>
              <div className="student_text">{parse(lr.reaction)}</div>
            </Message>
            <Message key={i} time={i} className="author">
              <div className="author_text">{parse(lr.comment)}</div>
              <IconBlock>
                {props.author_image && (
                  <img className="icon" src={props.author_image} />
                )}
                {!props.author_image &&
                  (author && author.image != null ? (
                    <img className="icon" src={author.image} />
                  ) : (
                    <img className="icon" src="../../static/hipster.svg" />
                  ))}
                <div className="name">
                  {props.author_name
                    ? props.author_name
                    : author && (author.name ? author.name : "BeSavvy")}
                </div>
              </IconBlock>
            </Message>
          </div>
        ))}
        {leftReactions.length > 0 && (
          <>
            <Message className="student">
              <IconBlock>
                <Icon className="icon2" background={m.author}>
                  {me.image && <img className="icon" src={me.image} />}
                  {!me.image &&
                    (me && me.image ? (
                      <img className="icon" src={me.image} />
                    ) : me.surname ? (
                      `${me.name[0]}${me.surname[0]}`
                    ) : (
                      `${me.name[0]}${me.name[1]}`
                    ))}
                </Icon>
                {/* <img className="icon" src="../../static/flash.svg" /> */}
                <div className="name">{me.name}</div>
              </IconBlock>
              <ReactionsList>
                {leftReactions.map((lr, i) => (
                  <StyledButton
                    onClick={(e) => {
                      createChatResult({
                        variables: {
                          text: lr.reaction,
                          name: me.name,
                          lessonId: props.lessonId,
                          chatId: props.chatId,
                        },
                      });
                      setUsedReactions([
                        ...usedReactions,
                        {
                          comment: lr.comment,
                          reaction: lr.reaction,
                        },
                      ]);
                      createChatResult({
                        variables: {
                          text: lr.comment,
                          name: props.author_name
                            ? props.author_name
                            : author && (author.name ? author.name : "BeSavvy"),
                          lessonId: props.lessonId,
                          chatId: props.chatId,
                        },
                      });
                      setLeftReactions(
                        [...leftReactions].filter(
                          (r) => r.comment !== lr.comment
                        )
                      );
                    }}
                  >
                    {parse(lr.reaction)}
                  </StyledButton>
                ))}
              </ReactionsList>
            </Message>
          </>
        )}
        {leftReactions.length > 0 && (
          <Message className="student">
            <IconBlock>
              <Icon className="icon2" background={m.author}>
                {me.image && <img className="icon" src={me.image} />}
                {!me.image &&
                  (me && me.image ? (
                    <img className="icon" src={me.image} />
                  ) : me.surname ? (
                    `${me.name[0]}${me.surname[0]}`
                  ) : (
                    `${me.name[0]}${me.name[1]}`
                  ))}
              </Icon>
              <div className="name">{me.name}</div>
            </IconBlock>
            <WaitingButton>
              <div class="stage">
                <div class="dot-flashing"></div>
              </div>
            </WaitingButton>
          </Message>
        )}
      </>
    </Styles>
  );
};

export default Reaction;
