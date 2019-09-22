import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      subjects
      new_subjects {
        id
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
        uniCoursePages {
          id
        }
      }
      uniID
      examAnswers {
        id
        examQuestion {
          id
          question
          coursePage {
            title
            id
          }
        }
        answer
      }
      isFamiliar
      favourites
      visitedLessons
      coursePages {
        id
      }
      lessons {
        id
      }
      careerTrack {
        id
      }
      careerTrackID
    }
  }
`;

const User = props => (
  <Query
    {...props}
    query={CURRENT_USER_QUERY}
    fetchPolicy={"cache-and-network"}
  >
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };
