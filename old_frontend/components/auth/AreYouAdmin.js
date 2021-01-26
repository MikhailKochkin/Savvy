import { Query } from "@apollo/client/react/components";
import { CURRENT_USER_QUERY } from "../User";

const AreYouAdmin = (props) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data }, loading) => {
      if (loading) return <p>Загрузка...</p>;
      if (!data.me) {
        return (
          <div>
            <p>Вы не имеете прав на просмотр данной страницы!</p>
            <button>Обратно на главную страницу</button>
          </div>
        );
      }
      if (!data.me && !data.me.permissions.includes("ADMIN")) {
        return (
          <div>
            <p>Вы не имеете прав на просмотр данной страницы!</p>
            <button>Обратно к меню</button>
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

export default AreYouAdmin;
