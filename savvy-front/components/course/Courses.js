import NewLanding4 from "../landing/NewLanding4";
import Reviews from "../landing/Reviews";
import Programs from "../landing/Programs";
import UseCases from "../landing/UseCases";
import ContactForm from "../landing/ContactForm";
import { useRouter } from "next/router";

const Courses = () => {
  const router = useRouter();

  return (
    <>
      <NewLanding4 />
      {router.locale !== "ru" && <UseCases />}
      {router.locale == "ru" && <Programs />}
      <Reviews />
      <ContactForm />
    </>
  );
};

export default Courses;
