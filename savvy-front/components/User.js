import { React, useEffect } from "react";
import { gql } from "@apollo/client";
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
      name
      surname
      email
      permissions
      image
      new_subjects {
        id
      }
      isFamiliar
      coursePages {
        id
      }
      co_coursePages {
        id
      }
      lessons {
        id
      }
    }
  }
`;

function useUser() {
  // 1. Get user data
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  // let visits = [
  //   {
  //     date: new Date(),
  //     utm_source: getCookie("traffic_source"),
  //     utm_medium: getCookie("traffic_medium"),
  //     utm_campaign: getCookie("traffic_campaign"),
  //   },
  // ];
  // 2. Update user mutation
  // const [recordSession, { record_data }] = useMutation(RECORD_SESSION);
  // 3. run mutation inside useEffect once get me data

  // useEffect(() => {
  //   if (data && data.me && data.me.id) {
  //     const new_record = recordSession({
  //       variables: {
  //         id: data.me.id,
  //         traffic_sources: { visitsList: visits },
  //       },
  //     });
  //   }
  // }, [data]);
  if (error) return console.log(error);
  if (data) {
    return data.me;
  }
}

export { CURRENT_USER_QUERY, useUser };
