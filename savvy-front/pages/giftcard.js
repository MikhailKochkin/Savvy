import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useQuery, gql } from "@apollo/client";

import GiftCard from "../components/GiftCard";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "course"])),
  },
});

// const CERT_QUERY = gql`
//   query CERT_QUERY($id: String!) {
//     certificates(where: { id: { equals: $id } }) {
//       id
//       createdAt
//       updatedAt
//       studentId
//       coursePageId
//       coursePage {
//         title
//       }
//       student {
//         name
//         surname
//       }
//     }
//   }
// `;

const giftcard = (props) => {
  //   const { loading, error, data } = useQuery(CERT_QUERY, {
  //     variables: { id: props.query.id },
  //   });

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return error;
  //   let cert = data.certificates[0];
  //   console.log("cert", cert);
  return <GiftCard id={props.query.id} />;
};

export default giftcard;
