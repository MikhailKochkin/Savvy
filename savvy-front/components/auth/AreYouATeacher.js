import { Query } from "@apollo/client/react/components";
import { CURRENT_USER_QUERY } from "../User";
import Link from "next/link";
import { NavButton, SubmitButton } from "../styles/Button";

const AreYouATeacher = (props) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data }, loading) => {
      if (loading) return <p>Loading...</p>;
      const arr1 = [];
      const arr2 = [];
      if (data.me) {
        data.me.coursePages.map((obj) => arr1.push(Object.values(obj)[0]));
        data.me.lessons.map((obj) => arr2.push(Object.values(obj)[0]));
        if (
          !arr1.includes(props.subject) &&
          !arr2.includes(props.subject) &&
          !data.me.permissions.includes("ADMIN")
        ) {
          return (
            <div>
              <h1>
                Вы не имеете прав на просмотр содержимого данной страницы.
              </h1>
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
    }}
  </Query>
);

export default AreYouATeacher;
