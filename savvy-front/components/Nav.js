import { useUser } from "./User";

const Nav = (props) => {
  let me = useUser();
  console.log("nav user", me);
  return <div>Привет</div>;
};

// export default withTranslation("common")(Nav);
export default Nav;
