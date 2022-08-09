import CRM from "../components/teach/CRM";
import { useUser } from "../components/User";

const CRM_page = () => {
  const me = useUser();

  return (
    <>
      <CRM />
    </>
  );
};

export default CRM_page;
