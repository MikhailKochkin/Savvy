import { Query } from "@apollo/client/react/components";
import { useUser } from "../User";
import Link from "next/link";
import { NavButton } from "../styles/Button";

const AreYouATeacher = (props) => {
  const me = useUser();
  if (me && me.coursePages) {
    let isCourseAuthor = me.coursePages.some((c) => c.id === props.subject);
    let isLessonAuthor = me.lessons.some((c) => c.id === props.subject);
    if (
      !isCourseAuthor &&
      !isLessonAuthor &&
      !me.permissions.includes("ADMIN")
    ) {
      return (
        <div>
          <h1>Вы не имеете прав на просмотр содержимого данной страницы.</h1>
          <Link
            href={{
              pathname: "/courses",
            }}
          >
            <a>
              <NavButton>Главная страница</NavButton>
            </a>
          </Link>
        </div>
      );
    }
  }
  return props.children;
};

export default AreYouATeacher;
