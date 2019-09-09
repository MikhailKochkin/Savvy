import Landing from "../components/Landing";
import User from "../components/User";
import Courses from "../components/course/Courses";

const Index = () => (
  <User>
    {({ data: { me } }) => <>{me ? <Courses /> : <Landing me={me} />}</>}
  </User>
);

export default Index;
