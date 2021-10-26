import { useUser } from "../components/User";
import Hello from "../components/hello/Hello";

const hello = (props) => {
  const me = useUser();
  return (
    <Hello
      name={props.query.name}
      surname={props.query.surname}
      email={props.query.email}
      me={me}
    />
  );
};

export default hello;
