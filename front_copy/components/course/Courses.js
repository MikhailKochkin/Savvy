import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import NewLanding3 from "../landing/NewLanding3";
import Reviews from "../landing/Reviews";
import Programs from "../landing/Programs";
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
      <NewLanding3 />
      <Programs me={me} />
      <Reviews />
      <ContactForm offer={offer} />
    </>
  );
};

export default Courses;
