import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import UpdateForm from "./UpdateForm";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(id: $id) {
      id
      title
      description
      image
      banner
      audience
      result
      goals
      header
      discountPrice
      courseAccessControls {
        id
        user {
          id
          name
          surname
          email
        }
        role
        changeScope
        areAllLessonsAccessible
        accessibleLessons
        createdAt
      }
      lessons {
        id
        name
        number
      }
      price
      subheader
      methods
      nextStart
      video
      user {
        id
      }
    }
  }
`;

const Width = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpdateCoursePage = (props) => {
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });
  if (loading) return <p>Loading...</p>;
  return (
    <Width>
      <div id="root"></div>
      {data && <UpdateForm coursePage={data.coursePage} me={props.me} />}
    </Width>
  );
};

export default UpdateCoursePage;
