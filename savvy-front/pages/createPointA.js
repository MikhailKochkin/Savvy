import CreatePointA from '../components/create/CreatePointA';

const CreatePointAPage  = props => (
  <div>
    <CreatePointA id={props.query.id} />
  </div>
);

export default CreatePointAPage;