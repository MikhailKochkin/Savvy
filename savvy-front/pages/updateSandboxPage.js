import UpdateSandboxPage from '../components/sandbox/UpdateSandboxPage';

const Update = ( { query } ) => (
  <div>
      <UpdateSandboxPage id={query.id} />
  </div>
);

export default Update;