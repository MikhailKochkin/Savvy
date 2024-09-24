import NewLanding4 from "../landing/NewLanding4";
import Reviews from "../landing/Reviews";
import Programs from "../landing/Programs";
import UseCases from "../landing/UseCases";
import ContactForm from "../landing/ContactForm";
import WallOfLove from "../landing/WallOfLove";

import { useRouter } from "next/router";

const Courses = () => {
  const router = useRouter();

  return (
    <>
      <NewLanding4 />
      <Reviews />
      {router.locale !== "ru" && <UseCases />}
      {router.locale == "ru" && <Programs />}
      <WallOfLove />

      <ContactForm />
    </>
  );
};

export default Courses;
