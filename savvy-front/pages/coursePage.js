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
      me.new_subjects.filter((s) => s.id === props.query.id).length > 0;
  }

  let admin;
  if (!me) {
    admin == false;
  } else {
    admin = me.permissions.includes("ADMIN");
  }
  return (props.query.id === "cjtreu3md00fp0897ga13aktp" ||
    props.query.id === "ckt9rmh4e51981hp97uwp6rft" ||
    props.query.id === "cktrbubdl2237dou9vzn1gb3w" ||
    props.query.id === "ck78sx36r00vi0700zxlzs1a5" ||
    props.query.id === "ckfy1q60a02f307281abcpgae") &&
    !enrolled &&
    !admin &&
    props.query.type !== "old" ? (
    <NewCoursePage id={props.query.id} />
  ) : (
    <CoursePage id={props.query.id} />
  );
};

// export default withTranslation("common")(CoursePagePage);
export default CoursePagePage;
