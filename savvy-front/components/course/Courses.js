import { useState, useEffect } from "react";
import Landing from "../landing/Landing";
import NewLanding from "../landing/NewLanding";
import Contact from "../landing/Contact";
// import Tech from "../landing/Tech";
import Reviews from "../landing/Reviews";
import Search from "../landing/Search";
import Programs from "../landing/Programs";
import Media from "../landing/Media";
import BlackFriday from "../landing/BlackFriday";

import ContactForm from "../landing/ContactForm";
import { useUser } from "../User";

const Courses = () => {
  const [offer, setOffer] = useState("school");
  const getOffer = (of) => {
    setOffer(of);
  };
  const me = useUser();
  return (
    <>
      <NewLanding />
      <BlackFriday getOffer={getOffer} />

      {/* <Search me={me} /> */}
      <Programs me={me} />
      {/* <Media /> */}
      <Reviews />
      <ContactForm offer={offer} />
      {/* <Tech /> */}
      {/* <Contact /> */}
    </>
  );
};

export default Courses;
