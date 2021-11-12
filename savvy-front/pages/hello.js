import { useUser } from "../components/User";
import Old_Hello from "../components/hello/Old_Hello";

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
