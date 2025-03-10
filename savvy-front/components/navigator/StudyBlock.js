import { useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";

import Post from "../blog/Post";
import BotSignUp from "../auth/BotSignUp";
import Challenge from "../lesson/lesson_type_challenge/Challenge";
// import Lawrdle from "../games/Lawrdle";

const Material = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
`;

const MiniCell = styled.div`
  border: 2px solid #d3d6da;
  width: 42px;
  height: 42px;
  margin-right: 6px;
  background: ${(props) => {
    if (props.color == "green") {
      return "#6AAA63";
    } else if (props.color == "yellow") {
      return "#CAB458";
    } else if (props.color == "grey") {
      return "#787C7E";
    } else {
      return "#fff";
    }
  }};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 2.6rem;
  color: ${(props) => {
    if (props.color == "green") {
      return "#fff";
    } else if (props.color == "yellow") {
      return "#fff";
    } else if (props.color == "grey") {
      return "#fff";
    } else {
      return "#000000";
    }
  }};
  font-weight: 700;
  border-color: ${(props) => {
    if (props.color == "green") {
      return "#6AAA63";
    } else if (props.color == "yellow") {
      return "#CAB458";
    } else if (props.color == "grey") {
      return "#787C7E";
    } else {
      return "#d3d6da";
    }
  }};
`;

const UPDATE_USER_LEVEL_MUTATION = gql`
  mutation UPDATE_USER_LEVEL_MUTATION(
    $id: String!
    $consumedContent: ConsumedContentList
    $learningStreak: [DateTime]
  ) {
    updateUserLevel(
      id: $id
      consumedContent: $consumedContent
      learningStreak: $learningStreak
    ) {
      id
      consumedContent
      learningStreak
    }
  }
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
  // const { user, loading } = useUser();

  const [lessonId, setLessonId] = useState(undefined);
  const [leadIn, setLeadIn] = useState(undefined);
  const [type, setType] = useState(undefined);
  const [coursePageId, setCoursePageId] = useState();
  const [campaignId, setCampaignId] = useState();
  const [tags, setTags] = useState();
  const [streakUpdated, setStreakUpdated] = useState(false);

  const [open, setOpen] = useState(false);
  const { t } = useTranslation("navigator");

  const hasReachedHalf = () => {
    props.updatePostResult(null, "has read half of the post");
  };

  const [createEmailReminder, { error: error4, loading: loading4 }] =
    useMutation(CREATE_REMINDER_MUTATION);

  const [
    updateUserLevel,
    { error: updateUserLevelError, loading: updateUserLevelLoading },
  ] = useMutation(UPDATE_USER_LEVEL_MUTATION);

  const getLessonInfo = (id, lessons, coursePageId) => {
    setLessonId(id);
    setCoursePageId(coursePageId);
    let new_type = lessons.find((l) => l.id == id);
    setType(new_type ? new_type.type : "STORY");
  };

  const hasTodayInStreak = (learningStreak) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return learningStreak.some((date) => {
      const streakDate = new Date(date);
      streakDate.setHours(0, 0, 0, 0);
      return streakDate.getTime() === today.getTime();
    });
  };

  const getTags = (tags) => {
    setTags(tags);
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
    if (props.me && !streakUpdated) {
      // ...

      const learningStreak = props.me.level?.learningStreak || [];
      const hasToday = hasTodayInStreak(learningStreak);

      if (!hasToday) {
        const updatedLearningStreak = [
          ...learningStreak,
          new Date().toISOString(),
        ];

        updateUserLevel({
          variables: {
            id: props.me.level.id,
            learningStreak: updatedLearningStreak,
          },
        });

        // Set the flag to true, so the streak is not updated more than once
        setStreakUpdated(true);
      }
    }

    if (props.me) {
      const consumedContentList =
        props.me.level?.consumedContent?.consumedContentList || [];

      const alreadyRead = consumedContentList.some(
        (c) => c.id === (props.id || props.post.id)
      );

      if (!alreadyRead) {
        const newId = props.id ? props.id : props.post.id;
        const updatedConsumedContentList = [
          ...consumedContentList,
          { id: newId, type: "post", tags: tags },
        ];

        updateUserLevel({
          variables: {
            id: props.me.level.id,
            consumedContent: {
              consumedContentList: updatedConsumedContentList,
            },
          },
        });
      }
    }

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
        {props.type !== "lawrdle" &&
          ((props.post && props.post.id) || props.id) && (
            <Post
              id={props.id ? props.id : props.post.id}
              hasReachedHalf={hasReachedHalf}
              hasReachedBottom={hasReachedBottom}
              getLessonInfo={getLessonInfo}
              getLeadIn={getLeadIn}
              getCampaignId={getCampaignId}
              getTags={getTags}
            />
          )}

        {/* {props.type == "lawrdle" && props.id && (
          <Lawrdle
            me={props.me}
            id={props.id}
            getLessonInfo={getLessonInfo}
            getLeadIn={getLeadIn}
            getCampaignId={getCampaignId}
          />
        )} */}
      </Material>
      <div id="move_to_lesson"></div>
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
