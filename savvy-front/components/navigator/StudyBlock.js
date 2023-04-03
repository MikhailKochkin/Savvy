import { useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";

import Post from "../blog/Post";
import { useUser } from "../LoadingUser";
import BotSignUp from "../auth/BotSignUp";
import Challenge from "../lesson/challenge/Challenge";

const Material = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const CREATE_REMINDER_MUTATION = gql`
  mutation CREATE_REMINDER_MUTATION(
    $userId: String!
    $coursePageId: String!
    $link: String
    $emailCampaignId: String
  ) {
    createEmailReminder(
      userId: $userId
      coursePageId: $coursePageId
      link: $link
      emailCampaignId: $emailCampaignId
    ) {
      id
    }
  }
`;

const DynamicNewSingleLesson = dynamic(import("../lesson/NewSingleLesson"), {
  ssr: false,
});

const StudyBlock = (props) => {
  const { user, loading } = useUser();

  const [lessonId, setLessonId] = useState(undefined);
  const [leadIn, setLeadIn] = useState(undefined);
  const [type, setType] = useState(undefined);
  const [coursePageId, setCoursePageId] = useState();
  const [campaignId, setCampaignId] = useState();

  const [open, setOpen] = useState(false);

  const hasReachedHalf = () => {
    props.updatePostResult(null, "has read half of the post");
  };

  const [createEmailReminder, { error: error4, loading: loading4 }] =
    useMutation(CREATE_REMINDER_MUTATION);

  const getLessonInfo = (id, lessons, coursePageId) => {
    setLessonId(id);
    setCoursePageId(coursePageId);
    let new_type = lessons.find((l) => l.id == id);
    setType(new_type ? new_type.type : "STORY");
  };

  const getCampaignId = (id) => {
    setCampaignId(id);
  };

  const getLeadIn = (val) => {
    setLeadIn(val);
  };

  const loadUser = (val, res) => {
    if (res) {
      setOpen(true);
    }
  };

  const passStep = (val) => {
    props.getLessonProgress(val.toString());
  };

  const hasReachedBottom = () => {
    if (props.me && campaignId) {
      createEmailReminder({
        variables: {
          userId: props.me.id,
          coursePageId: coursePageId,
          link: "https://besavvy.app",
          emailCampaignId: campaignId,
        },
      });
    }
    props.updatePostResult(null, "has read full post");
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
            getLessonInfo={getLessonInfo}
            getLeadIn={getLeadIn}
            getCampaignId={getCampaignId}
          />
        )}
      </Material>
      {!open && !props.me && leadIn && (
        <BotSignUp
          text={leadIn}
          passUser={passUser}
          loadUser={loadUser}
          coursePageId={coursePageId}
          campaignId={campaignId}
        />
      )}
      {(open || props.me) &&
        lessonId &&
        (type == "CHALLENGE" ? (
          <Challenge id={lessonId} isBot={true} passStep={passStep} />
        ) : (
          <DynamicNewSingleLesson
            id={lessonId}
            isBot={true}
            passStep={passStep}
          />
        ))}
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
