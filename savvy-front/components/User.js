import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      surname
      permissions
      interests
      courseVisits {
        id
        reminders
      }
      teacherFeedback {
        id
        text
        lesson {
          id
          name
        }
      }
      level {
        id
        level
      }
      studentFeedback {
        id
        text
        lesson {
          id
          name
        }
      }
      new_subjects {
        id
      }
      company {
        id
        name
      }
      status
      lessonResults {
        id
      }
      uni {
        id
        title
        teachers {
          id
        }
        capacity
        paidMonths
        # uniCoursePages {
        #   id
        # }
      }
      # isFamiliar
      # favourites
      # coverLetter
      # resume
      # visitedLessons
      coursePages {
        id
      }
      lessons {
        id
      }
      # careerTrack {
      #   id
      # }
      # careerTrackID
    }
  }
`;

function useUser() {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  if (data) {
    return data.me;
  }
}

export { CURRENT_USER_QUERY, useUser };
