import Search from "./Search";
import Landing from "./Landing";
import Contact from "../Contact";
import Tech from "../Tech";
import Reviews from "./Reviews";
import Media from "./Media";
import { useUser } from "../User";

const Courses = () => {
  const me = useUser();
  return (
    <>
      <Landing />
      <Search me={me} />
      <Media />
      <Reviews />
      <Tech />
      <Contact />
    </>
  );
};

export default Courses;
