// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
"use client";
import Legal from "./Legal";

// export const getServerSideProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["nav"])),
//   },
// });

const LegalPage = (props) => (
  <>
    {console.log("params", props)}
    <Legal name={props.searchParams.name} />
  </>
);

export default LegalPage;
