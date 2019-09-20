import Landing from "../components/Landing";
import Courses from "../components/course/Courses";
import { CURRENT_USER_QUERY } from "../components/User";
import { Query } from "react-apollo";

const Index = () => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data }, loading) => {
      if (loading) return <p>Загрузка...</p>;
      const me = data.me;
      return <>{me ? <Courses /> : <Landing me={data.me} />}</>;
    }}
  </Query>
);

export default Index;
