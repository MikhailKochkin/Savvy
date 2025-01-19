import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["lesson", "nav", "auth"])),
  },
});

const DynamicNewSingleLesson = dynamic(
  import("../components/lesson/NewSingleLesson"),
  {
    ssr: false,
  }
);

const embedPage = () => {
  const router = useRouter();
  const { id, url, add } = router.query;

  return (
    <DynamicNewSingleLesson
      id={id}
      embedded={true}
      authSource={url}
      add={add}
    />
  );
};

export default embedPage;
