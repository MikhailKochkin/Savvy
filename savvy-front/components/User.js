import { React, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { getCookie } from "cookies-next";

const RECORD_SESSION = gql`
  mutation RECORD_SESSION($id: String!, $traffic_sources: Visits) {
    recordSession(id: $id, traffic_sources: $traffic_sources) {
      id
    }
  }
`;

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      surname
      permissions
      tags
      image
      work
      description
      teams {
        id
        name
        users {
          id
          name
          surname
          image
        }
      }
      myTeams {
        id
        name
        users {
          id
          name
          surname
          image
        }
      }
      certificates {
        id
        createdAt
        coursePage {
          id
        }
      }
      courseVisits {
        id
        reminders
        coursePage {
          id
        }
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
          number
          coursePage {
            id
          }
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
      orders {
        id
        coursePage {
          id
        }
        isPaid
      }
      uni {
        id
        title
        # teachers {
        #   id
        # }
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
      co_coursePages {
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
  // 1. Get user data
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  let visits = [
    {
      date: new Date(),
      utm_source: getCookie("traffic_source"),
      utm_medium: getCookie("traffic_medium"),
      utm_campaign: getCookie("traffic_campaign"),
    },
  ];
  // 2. Update user mutation
  const [recordSession, { record_data }] = useMutation(RECORD_SESSION);
  // 3. run mutation inside useEffect once get me data
  useEffect(() => {
    if (data && data.me) {
      const new_record = recordSession({
        variables: {
          id: data.me.id,
          traffic_sources: { visitsList: visits },
        },
      });
    }
  }, [data]);
  if (error) return console.log(error);
  if (data) {
    return data.me;
  }
}

export { CURRENT_USER_QUERY, useUser };
