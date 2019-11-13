import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../User";
import Link from "next/link";
import { NavButton, SubmitButton } from "../styles/Button";

const AreYouEnrolled = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data }, loading) => {
      if (loading) return <p>Loading...</p>;
      const arr1 = [];
      const subj_list = [];
      data.me.new_subjects.map(sbj => subj_list.push(sbj.id));
      data.me.coursePages.map(obj => arr1.push(Object.values(obj)[0]));
      if (data.me) {
        if (
          (!data.me.subjects.includes(props.subject) ||
            !subj_list.includes(props.subject)) &&
          !arr1.includes(props.subject) &&
          !data.me.permissions.includes("ADMIN") &&
          !(props.openLesson === props.lesson)
        ) {
          return (
            <div>
              <h2>
                Вы не зарегистрированы на этот курс. Вы можете сделать это на
                главной странице сайта.
              </h2>
              <Link
                href={{
                  pathname: "/courses"
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
    }}
  </Query>
);

export default AreYouEnrolled;
