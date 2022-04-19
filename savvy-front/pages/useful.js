import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useUser } from "../components/User";
import Useful from "../components/useful/Useful";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "auth"])),
  },
});
const useful = (props) => {
  const data = {
    post1: {
      link: "https://besavvy.app/ru/lesson?id=cl1xos6xr46971izxzt5tgxcp&type=story",
      description: [
        "⭐️   Разберем необходимые выражения из договорного, корпоративного и IP права",
        "⭐️   Поговорим про сложности юр письма: цифры, источники права и так далее",
        "⭐️   Разберем деловые темы, которые встречаются в работе юриста: нефтегаз, IT и так далее",
      ],
      image_url: "/static/eng_book.webp",
      button_text: "Скачать пособие",
      header_text: "Получите пособие по юр английскому",
      material_type: "english_student_book_main",
    },
    contracts: {
      link: "https://besavvy.app/ru/lesson?id=cl25ytyrm1966oiu9g4la3m03&type=story",
      description: [
        "⭐️   Идеально, чтобы повторить материал перед собеседованием или экзаменом",
        "⭐️   Система графиков помогает быстро запомнить разные договорные конструкции",
        "⭐️   Хорошо дополняет курс по особенной части Гражданского права",
      ],
      image_url: "/static/contracts.webp",
      button_text: "Скачать сборник",
      header_text: "Получите сборник схем договорных конструкций",
      material_type: "contracts_book_main",
    },
  };
  let material;
  if (props.query.id == "post1") {
    material = data.post1;
  } else if (props.query.id == "contracts") {
    material = data.contracts;
  } else {
    material = data.post1;
  }
  const me = useUser();
  return (
    <>
      <Useful me={me} id={props.query.id} material={material} />
    </>
  );
};

export default useful;
