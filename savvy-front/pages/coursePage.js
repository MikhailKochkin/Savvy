import CoursePage from "../components/course/CoursePage";
import NewCoursePage from "../components/course/NewCoursePage";
import { useUser } from "../components/User";

const CoursePagePage = (props) => {
  const me = useUser();
  let enrolled;
  if (!me) {
    enrolled == false;
  } else {
    enrolled =
      me.new_subjects.filter((s) => s.id === "cjtreu3md00fp0897ga13aktp")
        .length > 0;
  }

  return (props.query.id === "cjtreu3md00fp0897ga13aktp" ||
    props.query.id === "cktrbubdl2237dou9vzn1gb3w") &&
    !enrolled &&
    props.query.type !== "old" ? (
    <NewCoursePage id={props.query.id} />
  ) : (
    <CoursePage id={props.query.id} />
  );
};

// export default withTranslation("common")(CoursePagePage);
export default CoursePagePage;
