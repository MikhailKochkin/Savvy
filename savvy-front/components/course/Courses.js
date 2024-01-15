import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import NewLanding4 from "../landing/NewLanding4";
import Reviews from "../landing/Reviews";
import Programs from "../landing/Programs";
import UseCases from "../landing/UseCases";
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
      <NewLanding4 />
      <UseCases />
      <Programs me={me} />
      <Reviews />
      <ContactForm offer={offer} />
    </>
  );
};

export default Courses;
