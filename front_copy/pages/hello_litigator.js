import { useUser } from "../components/User";
import Hello_Litigator from "../components/hello/Hello_Litigator";

const hello = (props) => {
  const me = useUser();
  return (
    <Hello_Litigator
      name={props.query.name}
      surname={props.query.surname}
      email={props.query.email}
      me={me}
    />
  );
};

export default hello;
