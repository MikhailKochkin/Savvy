import { useQuery, gql } from "@apollo/client";

const LESSON_RESULTS_QUERY = gql`
  query LESSON_RESULTS_QUERY($lessonId: String!, $userId: String!) {
    lessonResults(lessonId: $lessonId, studentId: $userId) {
      id
      progress
      lesson {
        id
        structure {
          lessonItems {
            id
          }
        }
      }
    }
  }
`;

const CompletionRate = (props) => {
  const { lesson, me } = props;
  const { loading, error, data } = useQuery(LESSON_RESULTS_QUERY, {
    variables: { lessonId: lesson?.id, userId: me?.id },
  });
  if (loading) return <div></div>;
  if (error) return <div></div>;
  const getLessonWithHighestProgress = (lessonResults) => {
    return lessonResults.reduce((highest, current) => {
      return current.progress > highest.progress ? current : highest;
    });
  };

  let maxResult = null;
  let completionRate = 0;
  if (data?.lessonResults?.length > 0 && lesson?.structure?.lessonItems) {
    maxResult = getLessonWithHighestProgress(data.lessonResults);
    completionRate = (
      (maxResult.progress / lesson.structure.lessonItems.length) *
      100
    ).toFixed(0);
  }
  return <div>{completionRate <= 100 ? completionRate : 100}%</div>;
};

export default CompletionRate;
