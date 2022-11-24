import React from "react";
import Lawrdle from "../components/games/Lawrdle";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useUser } from "../components/User";
import { useQuery, gql } from "@apollo/client";

const LAWRDLE_QUERY = gql`
  query LAWRDLE_QUERY($id: String!) {
    lawrdles(where: { id: { equals: $id } }) {
      id
      word
      story
      buttonText
      link
      author {
        id
        name
        surname
        image
      }
    }
  }
`;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "course"])),
  },
});

const games = (props) => {
  const me = useUser();
  const { loading, error, data } = useQuery(LAWRDLE_QUERY, {
    variables: { id: props.query.id },
  });
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <Lawrdle me={me} id={props.query.id} lawrdle={data.lawrdles[0]} />
    </div>
  );
};

export default games;
