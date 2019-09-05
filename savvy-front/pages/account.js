import AccountPage from "../components/AccountPage";

const AccountPagePage = props => (
  <div>
    <AccountPage id={props.query.id} />
  </div>
);

export default AccountPagePage;
