import Landing from "../components/Landing";
import Courses from "../components/course/Courses";
import { CURRENT_USER_QUERY } from "../components/User";
import { Query } from "react-apollo";
import Cookies from "universal-cookie";

const cookies = new Cookies();
console.log(cookies.get("token"));

const Index = () => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data }, loading) => {
      if (loading) return <p>Загрузка...</p>;
      const me = data.me;
      return cookies.get("token") !== undefined ? (
        <Courses />
      ) : (
        <Landing me={data.me} />
      );
    }}
  </Query>
);

export default Index;
