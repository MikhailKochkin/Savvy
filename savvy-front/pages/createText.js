import CreateTextForm from '../components/CreateTextForm';

const CreateTextPage  = props => (
  <div>
    <CreateTextForm id={props.query.id} />
  </div>
);

export default CreateTextPage;