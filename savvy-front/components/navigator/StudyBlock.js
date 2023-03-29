import { useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

import Post from "../blog/Post";
import { useUser } from "../LoadingUser";
import BotSignUp from "../auth/BotSignUp";

const Material = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const DynamicNewSingleLesson = dynamic(import("../lesson/NewSingleLesson"), {
  ssr: false,
});

const StudyBlock = (props) => {
  const { user, loading } = useUser();

  const [lessonId, setLessonId] = useState(undefined);
  const [leadIn, setLeadIn] = useState(undefined);

  const [open, setOpen] = useState(false);

  const hasReachedHalf = () => {
    props.updatePostResult(null, "has read half of the post");
  };

  const hasReachedBottom = () => {
    props.updatePostResult(null, "has read full post");
  };

  const getLessonId = (val) => {
    // console.log("val", val);
    setLessonId(val);
  };

  const getLeadIn = (val) => {
    // console.log("val", val);
    setLeadIn(val);
  };

  const loadUser = (val, res) => {
    console.log("loading", res);
    if (res) {
      setOpen(true);
    }
  };

  const passStep = (val) => {
    props.getLessonProgress(val);
  };

  const passUser = (val) => {};

  return (
    <div>
      <Material>
        {((props.post && props.post.id) || props.id) && (
          <Post
            id={props.id ? props.id : props.post.id}
            hasReachedHalf={hasReachedHalf}
            hasReachedBottom={hasReachedBottom}
            getLessonId={getLessonId}
            getLeadIn={getLeadIn}
          />
        )}
      </Material>
      {!open && !props.me && leadIn && (
        <BotSignUp text={leadIn} passUser={passUser} loadUser={loadUser} />
      )}
      {open && props.me && lessonId && (
        <DynamicNewSingleLesson
          id={lessonId}
          isBot={true}
          passStep={passStep}
        />
      )}
    </div>
  );
};

export default StudyBlock;

{
  /* <div className="question_box">
              <div className="question_text">
                У меня по этой теме есть еще материалы.
              </div>
              <IconBlock>
                <img className="icon" src="../../static/misha_new.webp" />
                <div className="name">Михаил</div>
              </IconBlock>
            </div>
            <div className="answer">
              {props.type !== "post" && (
                <IconBlock>
                  <img className="icon" src="../../static/flash.svg" />
                  <div className="name">Вы</div>
                </IconBlock>
              )}
              <Options>
                {options.map((o, index) => (
                  <>
                    <AnswerOption
                      key={index}
                      answer={o.answer}
                      hidden={!props.hideElems ? false : hidden[index]}
                      move={o.move}
                      type={o.type}
                      color={o.color}
                      link={o.link}
                      update={o.update}
                      number={index}
                      onAnswerSelected={getTestData}
                      lastBlock={props.lastBlock}
                    />
                  </>
                ))}
              </Options>
            </div> */
}
