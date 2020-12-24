import Courses from "../components/course/Courses";
import { withTranslation } from "../i18n";

const Index = ({ t }) => {
  return (
    <>
      <Courses />
    </>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ["common", "footer"],
});

export default withTranslation("common")(Index);
