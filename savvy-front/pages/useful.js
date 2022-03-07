import React from "react";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useUser } from "../components/User";
import Useful from "../components/useful/Useful";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav"])),
  },
});

// export const getServerSideProps = async ({ locale }) => ({
//   props: {
//     locale,
//   },
// });

const useful = (props) => {
  const data = {
    post1: {
      link: "https://disk.yandex.ru/i/X9S9O67A3aPREn",
      description: [
        "Разберем необходимые выражения из договорного, корпоративного и IP права",
        "Поговорим про сложности юр письма: цифры, источники права и так далее",
        "Разберем деловые темы, которые встречаются в работе юриста: нефтегаз, IT и так далее",
      ],
      image_url: "/static/book.webp",
      button_text: "Скачать пособие",
      header_text: "Получите пособие по юр английскому",
      material_type: "english_student_book_main",
    },
  };
  let material;
  if (props.query.id == "post1") {
    material = data.post1;
  } else {
    material = null;
  }
  const me = useUser();
  return (
    <>
      <Useful me={me} id={props.query.id} material={material} />;
    </>
  );
};

export default useful;
