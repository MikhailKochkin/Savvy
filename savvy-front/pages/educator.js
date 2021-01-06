import Educator from "../components/teach/Educator";
import { useUser } from "../components/User";

const EducatorPage = () => {
  const me = useUser();
  return <Educator me={me} />;
};

export default EducatorPage;
