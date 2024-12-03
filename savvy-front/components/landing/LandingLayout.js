import NewLanding4 from "./NewLanding4";
import Reviews from "./Reviews";
import Programs from "./Programs";
import UseCases from "./UseCases";
import ContactForm from "./ContactForm";
import WallOfLove from "./WallOfLove";

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
