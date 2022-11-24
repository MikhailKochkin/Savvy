import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
// import { useUser } from "../User";
import UpdateProgramForm from "./UpdateProgramForm";

const SINGLE_PROGRAM_QUERY = gql`
  query SINGLE_PROGRAM_QUERY($id: String!) {
    program(where: { id: $id }) {
      id
      title
      description
      image
      audience
      result
      goals
      header
      price
      subheader
      tariffs
      methods
      nextStart
      video
      news
    }
  }
`;

const Width = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpdateCoursePage = (props) => {
  // const me = useUser();
  const { data, loading, error } = useQuery(SINGLE_PROGRAM_QUERY, {
    variables: { id: props.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <Width>
      <div id="root"></div>
      {data && (
        <UpdateProgramForm
          coursePage={data.program}
          // me={me}
        />
      )}
    </Width>
  );
};

export default UpdateCoursePage;
