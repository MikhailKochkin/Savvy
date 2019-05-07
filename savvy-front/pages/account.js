import AccountPage from '../components/AccountPage';
import PleaseSignIn from '../components/auth/PleaseSignIn';

const AccountPagePage = props => (
  <div>
    <PleaseSignIn>
      <AccountPage />
    </PleaseSignIn>
    {/* <AccountPage id={props.query.id} /> */}
  </div>
);

export default AccountPage;