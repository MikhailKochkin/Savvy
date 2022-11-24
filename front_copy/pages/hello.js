import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useUser } from "../components/User";
import Old_Hello from "../components/hello/Old_Hello";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "hello"])),
  },
});

const hello = (props) => {
  const me = useUser();
  return (
    <Old_Hello
      name={props.query.name}
      surname={props.query.surname}
      number={props.query.number}
      email={props.query.email}
      me={me}
    />
  );
};

export default hello;
