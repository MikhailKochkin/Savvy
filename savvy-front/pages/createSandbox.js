import CreateSandboxForm from '../components/CreateSandboxForm';

const CreateSandboxFormPage  = props => (
  <div>
    <CreateSandboxForm id={props.query.id} />
  </div>
);

export default CreateSandboxFormPage;