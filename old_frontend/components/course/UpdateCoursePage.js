import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import { useUser } from "../User";
import UpdateForm from "./UpdateForm";

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: String!) {
    coursePage(where: { id: $id }) {
      id
      title
      description
      image
      banner
      audience
      result
      tariffs
      methods
      video
      news
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
  const me = useUser();
  const { loading, error, data } = useQuery(SINGLE_COURSEPAGE_QUERY, {
    variables: { id: props.id },
  });
  if (loading) return <p>Загрузка...</p>;
  return (
    <Width>
      <div id="root"></div>
      {me &&
      (me.id === data.coursePage.user.id ||
        me.permissions.includes("ADMIN")) ? (
        <UpdateForm coursePage={data.coursePage} me={me} />
      ) : (
        "У вас нет полномочий для работы с этой страницей."
      )}
    </Width>
  );
};

export default UpdateCoursePage;
