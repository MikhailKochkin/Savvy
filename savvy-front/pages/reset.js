import Reset from '../components/auth/Reset';

const ResetPage = props => (
  <div>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default ResetPage;