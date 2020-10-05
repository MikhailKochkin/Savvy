import User from "../components/User";
import Courses from "../components/course/Courses";
// import { withTranslation } from "../i18n";

const Index = () => {
  return (
    <>
      <User>{({ data: { me } }) => <Courses />}</User>
    </>
  );
};

// Index.getInitialProps = async () => ({
//   namespacesRequired: ["common", "footer"],
// });

export default Index;
