import { useState, useEffect } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import { initial } from "lodash";
import { useTranslation } from "next-i18next";

const Styles = styled.div`
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
    min-width: 60%;
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
  }
`;

const ReactionsList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
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
  margin-right: 6%;
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

const Reaction = (props) => {
  const [usedReactions, setUsedReactions] = useState([]);
  const [reaction, setReaction] = useState(undefined);
  const [leftReactions, setLeftReactions] = useState(props.reactions);
  const { me, author, initialQuestion } = props;
  const { t } = useTranslation("lesson");

  return (
    <Styles>
      <>
        {usedReactions.map((lr, i) => (
          <div className="used">
            <Message key={i} time={i} className="student">
              <IconBlock>
                <img className="icon" src="../../static/flash.svg" />
                <div className="name">{me.name}</div>
              </IconBlock>
              <div className="student_text">{renderHTML(lr.reaction)}</div>
            </Message>
            <Message key={i} time={i} className="author">
              <div className="author_text">{renderHTML(lr.comment)}</div>
              <IconBlock>
                {author && author.image != null ? (
                  <img className="icon" src={author.image} />
                ) : (
                  <img className="icon" src="../../static/hipster.svg" />
                )}
                <div className="name">
                  {author && author.name ? author.name : "BeSavvy"}
                </div>
              </IconBlock>
            </Message>
          </div>
        ))}
        {leftReactions.length > 0 && (
          <>
            {usedReactions.length > 0 && (
              <Message className="author">
                <div className="author_text">{t("more_explain")}</div>
                <IconBlock>
                  {author && author.image != null ? (
                    <img className="icon" src={author.image} />
                  ) : (
                    <img className="icon" src="../../static/hipster.svg" />
                  )}
                  <div className="name">
                    {author && author.name ? author.name : "BeSavvy"}
                  </div>
                </IconBlock>
              </Message>
            )}
            <br />
            <Message
              //   id={"message" + i + id}
              //   key={i}
              //   time={i}
              className="student"
            >
              <IconBlock>
                <img className="icon" src="../../static/flash.svg" />
                <div className="name">{me.name}</div>
              </IconBlock>
              <ReactionsList>
                {leftReactions.map((lr, i) => (
                  <StyledButton
                    onClick={(e) => {
                      setUsedReactions([
                        ...usedReactions,
                        {
                          comment: lr.comment,
                          reaction: lr.reaction,
                        },
                      ]);
                      console.log(leftReactions, lr.comment);
                      setLeftReactions(
                        [...leftReactions].filter(
                          (r) => r.comment !== lr.comment
                        )
                      );
                    }}
                  >
                    {renderHTML(lr.reaction)}
                  </StyledButton>
                ))}
              </ReactionsList>
            </Message>
          </>
        )}
      </>
    </Styles>
  );
};

export default Reaction;
