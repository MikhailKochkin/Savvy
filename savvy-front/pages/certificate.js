import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useQuery, gql } from "@apollo/client";

import Certificate from "../components/course/Certificate";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "course"])),
  },
});

const CERT_QUERY = gql`
  query CERT_QUERY($id: String!) {
    certificates(where: { id: { equals: $id } }) {
      id
      createdAt
      updatedAt
      studentId
      coursePageId
      coursePage {
        title
      }
      student {
        name
        surname
      }
    }
  }
`;

const certificate = (props) => {
  const { loading, error, data } = useQuery(CERT_QUERY, {
    variables: { id: props.query.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return error;
  let cert = data.certificates[0];
  return <Certificate id={props.query.id} cert={cert} />;
};

export default certificate;
