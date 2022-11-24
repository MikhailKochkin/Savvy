import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useQuery, gql } from "@apollo/client";

import GiftCard from "../components/GiftCard";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "course"])),
  },
});

const giftcard = (props) => {
  const users = [
    {
      name: "Андрей",
      surname: "Савин",
      course: "Legal English. Speaking Skills.",
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1653755242/image_1.png",
      num: 46,
    },
    {
      name: "Эмиль",
      surname: "Сафин",
      course: "Legal English. Полный курс",
      img: "https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1654151389/kSdXuV6z8RMyfInEgBZKoycwOBNO8yenIA5OPiPHTGVNKBcxpUysQvTIsOd16J_u2pajaT37y09V5D1de_OyNRe4.jpg",
      num: 47,
    },
  ];

  let data;

  if (props.query.id == "safin") {
    data = users[1];
  } else {
    data = users[0];
  }
  return <GiftCard id={props.query.id} data={data} />;
};

export default giftcard;
