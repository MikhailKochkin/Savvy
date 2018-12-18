import SandboxPage from '../components/SandboxPage';

const SandboxPagePage = props => (
  <div>
    <SandboxPage id={props.query.id} />
  </div>
);

export default SandboxPagePage;