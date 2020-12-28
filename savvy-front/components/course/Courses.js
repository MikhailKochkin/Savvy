// import Search from "../landing/Search";
import Landing from "../landing/Landing";
import Contact from "../landing/Contact";
// import Tech from "../landing/Tech";
import Reviews from "../landing/Reviews";
import Search from "../landing/Search";
import Media from "../landing/Media";
import { useUser } from "../User";

const Courses = () => {
  const me = useUser();
  return (
    <>
      <Landing />
      <Search me={me} />
      <Media />
      <Reviews />
      {/* <Tech /> */}
      <Contact />
    </>
  );
};

export default Courses;
