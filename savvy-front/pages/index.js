import { useEffect } from "react";
import Courses from "../components/landing/LandingLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["landing", "nav", "auth"])),
  },
});

const Index = () => {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "d937200d-ad09-416f-87ba-4d441dcf12fd";
    (function () {
      var d = document;
      var s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, [0]);
  return <Courses />;
};

export default Index;
