import CRM from "../components/teach/CRM";
import { useUser } from "../components/User";

const crm = () => {
  const me = useUser();

  return (
    <>
      <CRM />
    </>
  );
};

export default crm;
