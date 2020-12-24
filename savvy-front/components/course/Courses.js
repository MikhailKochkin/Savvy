import Landing from "./Landing";
import Media from "./Media";
import Reviews from "./Reviews";
import Search from "./Search";
import Tech from "../Tech";
import Contact from "../Contact";
import User from "../User";

const Courses = () => {
  return (
    // <User>
    //   {({ data: me }) => (
    <>
      <Landing />
      {/* <Search me={me} /> */}
      <Media />
      <Reviews />
      <Tech />
      <Contact />
    </>
    //   )}
    // </User>
  );
};

export default Courses;
