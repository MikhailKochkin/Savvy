import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

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

const User = (props) => (
  <Query
    {...props}
    query={CURRENT_USER_QUERY}
    fetchPolicy={"cache-and-network"}
  >
    {(payload) => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
