// import Search from "../landing/Search";
import Landing from "../landing/Landing";
import NewLanding from "../landing/NewLanding";
import Contact from "../landing/Contact";
// import Tech from "../landing/Tech";
import Reviews from "../landing/Reviews";
import Search from "../landing/Search";
import Programs from "../landing/Programs";
import Media from "../landing/Media";
import ContactForm from "../landing/ContactForm";
import { useUser } from "../User";

const Courses = () => {
  const me = useUser();
  return (
    <>
      <NewLanding />
      {/* <Search me={me} /> */}
      <Programs me={me} />
      {/* <Media /> */}
      <Reviews />
      <ContactForm />
      {/* <Tech /> */}
      {/* <Contact /> */}
    </>
  );
};

export default Courses;
