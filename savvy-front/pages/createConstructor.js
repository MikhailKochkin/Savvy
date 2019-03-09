import CreateConstructor from '../components/create/CreateConstructor';

const CreateConstructorPage  = props => (
  <div>
    <CreateConstructor id={props.query.id} />
  </div>
);

export default CreateConstructorPage;