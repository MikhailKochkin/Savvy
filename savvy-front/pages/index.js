import User from "../components/User";
import Courses from "../components/course/Courses";

const Index = () => <User>{({ data: { me } }) => <Courses />}</User>;

export default Index;
